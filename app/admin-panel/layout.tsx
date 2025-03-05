import { ReactNode } from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

export default function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className='h-full min-h-screen flex'>
      <Sidebar />
      <div className='w-full'>{children}</div>
    </section>
  );
}
