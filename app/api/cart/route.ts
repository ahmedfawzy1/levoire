import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(reqest: Request) {
  const method = reqest.method;
  const body = await reqest.json();

  switch (method) {
    case 'POST':
      await addToCart(body);
      break;
    case 'PUT':
      await updateCart(body);
      break;
    case 'DELETE':
      await removeFromCart(body);
      break;
    default:
      return NextResponse.json(
        { error: `Method ${method} not Allowed` },
        { status: 405 }
      );
  }
  return NextResponse.json({ message: 'Cart updated successfully' });
}

interface CartItemRequest {
  productId: number;
  userId: number;
  quantity: number;
  size: string;
  color: string;
  maxPrice: number;
  minPrice: number;
}

interface AddToCartBody {
  cartItems: CartItemRequest[];
  userId: number;
}

async function addToCart(body: AddToCartBody) {
  const { cartItems } = body;
  const { userId } = cartItems[0];

  let userCart = await db.cart.findFirst({
    where: { userId },
  });

  if (!userCart) {
    userCart = await db.cart.create({
      data: { userId },
    });
  }

  const cartId = userCart.id;

  try {
    const response = await Promise.all(
      cartItems.map(async item => {
        const { productId, quantity, size, color } = item;
        return await db.cartItem.upsert({
          where: {
            cart_item_unique_index: { cartId, productId, size, color },
          },
          update: {
            quantity: {
              increment: quantity,
            },
          },
          create: {
            cartId,
            productId,
            quantity,
            size,
            color,
            price: item.maxPrice,
          },
        });
      })
    );

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Error adding product(s) to cart: ${error.message}`);
    return NextResponse.json(
      { error: `Failed to add product(s) to cart: ${error.message}` },
      { status: 500 }
    );
  }
}

interface UpdateCartBody {
  cartItemId: number;
  newQuantity: number;
}

async function updateCart(body: UpdateCartBody) {
  const { cartItemId, newQuantity } = body;

  if (newQuantity < 1) {
    return NextResponse.json(
      { error: 'Quantity cannot be less than 1' },
      { status: 400 }
    );
  }
  try {
    const updatedCartItem = await db.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error: any) {
    console.error(`Failed to update cart ${error.message}`);
    return NextResponse.json(
      { error: `Failed to update cart ${error.message}` },
      { status: 500 }
    );
  }
}

interface RemoveCartBody {
  cartItemId: number;
}

async function removeFromCart(body: RemoveCartBody) {
  const { cartItemId } = body;

  try {
    await db.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({
      message: 'Item removed from cart',
    });
  } catch (error: any) {
    console.error(`Failed removed from cart ${error.message}`);
    return NextResponse.json(
      { error: `Failed to remove item from cart ${error.message}` },
      { status: 500 }
    );
  }
}
