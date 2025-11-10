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
    <div className='w-full h-full min-h-screen bg-white px-4 md:px-6 py-8'>
      <h1 className='text-3xl font-extrabold mb-6'>All Orders</h1>

      <div className='space-y-4'>
        {orders.map((order: Order) => (
          <div
            key={order.id}
            className='border border-slate-200 rounded-xl p-5 mb-4 bg-white shadow-sm'
          >
            <div className='mb-4 pb-3 border-b border-slate-200'>
              <h2 className='text-xl font-semibold mb-2'>Order #{order.id}</h2>
              <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm'>
                <p>
                  Status:{' '}
                  <span className='font-bold uppercase'>{order.status}</span>
                </p>
                <p className='text-gray-600'>
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className='mt-4 space-y-4'>
              {order.items.map(item => (
                <div
                  key={item.id}
                  className='flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0'
                >
                  <div className='flex-shrink-0'>
                    <Image
                      src={item.product.image[0]}
                      alt={item.product.title}
                      className='rounded-lg object-cover'
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-lg mb-2'>
                      {item.product.title}
                    </h3>
                    <div
                      className='text-sm text-gray-600 mb-3 line-clamp-2'
                      dangerouslySetInnerHTML={{
                        __html: item.product.description,
                      }}
                    />
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm'>
                      <p>
                        <span className='font-bold'>Store: </span>
                        {item.product.store}
                      </p>
                      <p>
                        <span className='font-bold'>Category:</span>{' '}
                        {item.product.category}
                      </p>
                      <p>
                        <span className='font-bold'>Size:</span> {item.size}
                      </p>
                      <p>
                        <span className='font-bold'>Color:</span>{' '}
                        <span
                          className='inline-block w-4 h-4 rounded-full border border-gray-300 align-middle mr-1'
                          style={{ backgroundColor: item.color }}
                        />
                        {item.color}
                      </p>
                      <p>
                        <span className='font-bold'>Quantity:</span>{' '}
                        {item.quantity}
                      </p>
                      <p>
                        <span className='font-bold'>Price:</span> $
                        {item.product.maxPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
