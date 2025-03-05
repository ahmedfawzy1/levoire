'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FilePenLine,
  LayoutGrid,
  Package,
  PackagePlus,
  Tag,
  Tags,
  UserRoundCog,
} from 'lucide-react';

export const adminMenu = [
  {
    url: '/admin-panel/orders',
    label: 'Orders',
    icon: <Package />,
  },
  {
    url: '/admin-panel/category',
    label: 'Category',
    icon: <LayoutGrid />,
  },
  {
    url: '/admin-panel/create-brand',
    label: 'Create Brand',
    icon: <Tags />,
  },
  {
    url: '/admin-panel/brands',
    label: 'Brands',
    icon: <Tag />,
  },
  {
    url: '/admin-panel/create-product',
    label: 'Create Product',
    icon: <PackagePlus />,
  },
  {
    url: '/admin-panel/update-product',
    label: 'Product',
    icon: <FilePenLine />,
  },
  {
    url: '/admin-panel/admins',
    label: 'Admins',
    icon: <UserRoundCog />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className='px-2 md:px-5 pt-5 bg-[#f9f9f9] border-r-1 border-slate-700 flex flex-col gap-5'>
      {adminMenu.map(item => (
        <Link
          key={item.label}
          href={item.url}
          className={`p-3 text-left rounded-lg flex items-center gap-2 hover:bg-gray-200 transition ${
            pathname === item.url ? 'bg-[#e2e2e2]' : ''
          }`}
          aria-label={item.label}
        >
          {item.icon}
          <span className='text-nowrap hidden md:block'>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
