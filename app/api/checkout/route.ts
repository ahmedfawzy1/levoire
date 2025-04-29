import { db } from '@/app/lib/db';
import { CartStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cartItems = body.cartItems || [];
    const userId = parseInt(body.userId, 10);

    if (cartItems.length === 0 || isNaN(userId)) {
      return NextResponse.json(
        { error: 'Empty cart or invalid user ID provided' },
        { status: 400 },
      );
    }

    const userCart = await db.cart.create({
      data: { userId, status: CartStatus.COMPLETED },
    });

    console.log(
      `Cart created successfully for user ID: ${userId}, Cart ID: ${userCart.id}`,
    );

    const cartId = userCart.id;

    // Add cart items to the database
    try {
      await Promise.all(
        cartItems.map(async (item: CartItem) => {
          const { productId, quantity, size, color, price } = item;
          await db.cartItem.upsert({
            where: {
              cart_item_unique_index: { cartId, productId, size, color },
            },
            update: {
              quantity: { increment: quantity },
            },
            create: {
              cartId,
              productId,
              quantity,
              size,
              color,
              price,
            },
          });
        }),
      );
      console.log(`Cart items added successfully for cart ID: ${cartId}`);
    } catch (error: any) {
      console.error(`Failed to save cart items: ${error.message}`);
      return NextResponse.json(
        { error: 'Failed to save cart items' },
        { status: 500 },
      );
    }

    // Prepare line items for Stripe
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cartItems.map((item: CartItem) => ({
        quantity: item.quantity,
        price_data: {
          currency: 'USD',
          product_data: {
            name: `Product ${item.productId} (${item.size}, ${item.color})`,
          },
          unit_amount: Math.round(item.price * 100),
        },
      }));

    // Create Stripe checkout session
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        billing_address_collection: 'auto',
        success_url: `${process.env.NEXTAUTH_URL}/orders?success=1`,
        cancel_url: `${process.env.NEXTAUTH_URL}/orders?cancel=1`,
        metadata: {
          userId: String(userId),
          cartId: String(cartId),
          productIds: cartItems
            .map((item: CartItem) => item.productId)
            .join(','),
        },
      });
      console.log(
        `Stripe checkout session created successfully for user ID: ${userId}, Cart ID: ${cartId}`,
      );
      return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (error: any) {
      console.error(
        `Stripe API error: Failed to create checkout session for user ID ${userId}: ${error.message}`,
      );
      return NextResponse.json(
        { error: 'Unable to initiate payment process at the moment' },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error(`Failed to process cart checkout ${error.message}`);
    return NextResponse.json(
      { error: `Failed to process cart checkout ${error.message}` },
      { status: 500 },
    );
  }
}
