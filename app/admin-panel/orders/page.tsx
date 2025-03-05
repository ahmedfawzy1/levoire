import Image from 'next/image';
import { getOrders } from '@/app/lib/orders';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string[];
  maxPrice: number;
  slug: string;
  category: string;
  store: string;
}

interface OrderItem {
  id: number;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  status: string;
  createdAt: string;
}

export default async function Orders() {
  const orders = await getOrders();

  return (
    <div className='px-5 py-14 max-w-[1280px] mx-auto'>
      <h1 className='text-3xl font-extrabold mb-5'>All Orders</h1>

      {orders.map((order: Order) => (
        <div
          key={order.id}
          className='border border-slate-800 rounded-xl p-4 mb-4'
        >
          <h2 className='text-xl font-semibold mb-2'>Order #{order.id}</h2>
          <p>
            Status: <span className='font-bold'>{order.status}</span>
          </p>
          <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

          <div className='mt-4 space-y-4'>
            {order.items.map(item => (
              <div
                key={item.id}
                className={`flex items-center gap-5 border-b pb-4 last:border-b-0 last:pb-0`}
              >
                <div>
                  <Image
                    src={item.product.image[0]}
                    alt={item.product.title}
                    className='rounded-full'
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <h3>{item.product.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.product.description,
                    }}
                  />
                  <p>
                    Store:{' '}
                    <span className='font-bold'>{item.product.store}</span>
                  </p>
                  <p className='font-bold'>Category: {item.product.category}</p>
                  <p className='font-bold'>Size: {item.size}</p>
                  <p className='font-bold' style={{ color: item.color }}>
                    Color: {item.color}
                  </p>
                  <p className='text-gray-600'>Quantity: {item.quantity}</p>
                  <p className='text-gray-600'>
                    Price: ${item.product.maxPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
