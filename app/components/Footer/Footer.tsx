import Link from 'next/link';
import { footerLinks, socialHandles } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className='px-5 py-11 bg-[#F0F0F0]'>
      <div className='flex justify-between flex-wrap gap-5'>
        <div className='max-w-full md:max-w-60'>
          <h3 className='text-3xl font-extrabold'>Levoire</h3>
          <p className='py-6 text-sm text-black/60'>
            We have clothes that suits your style and which you&apos;re proud to
            wear. From women to men.
          </p>
          <div className='flex gap-2'>
            {socialHandles.map(({ icon: Icon, url }, index) => (
              <Link
                key={index + 1}
                href={url}
                className='w-7 h-7 bg-white border border-black/20 rounded-full flex justify-center items-center transition hover:bg-black hover:text-white'
                rel='no-follow'
                aria-label='social links'
                prefetch={false}
              >
                <Icon size={14} />
              </Link>
            ))}
          </div>
        </div>
        {footerLinks.map(section => (
          <div key={section.title} className='mb-6'>
            <h3 className='font-medium tracking-[3px] mb-3'>{section.title}</h3>
            <ul>
              {section.links.map(({ label, href }, linkIndex) => (
                <li
                  key={linkIndex}
                  className='text-black/60 leading-9 transition hover:text-black hover:translate-x-1'
                >
                  <Link href={href} prefetch={false}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
