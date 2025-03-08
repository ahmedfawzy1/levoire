'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import GoogleSignInButton from '@/app/components/GoogleSignInButton';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast.error(signInData?.error || 'Registration failed');
    } else {
      router.refresh();
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <section className='bg-gray-50'>
      <div className='px-6 mx-auto h-[calc(100vh-160px)] flex flex-col items-center justify-center'>
        <div className='mb-10'>
          <h1 className='text-xl md:text-3xl font-extrabold leading-tight tracking-tight'>
            Sign In to your account
          </h1>
        </div>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 md:space-y-6'
            >
              <div>
                <label
                  htmlFor='email'
                  className='text-[15px] font-bold text-gray-900 block mb-2'
                >
                  Email address
                </label>
                <input
                  type='email'
                  id='email'
                  {...register('email')}
                  className='bg-gray-50 block w-full px-2.5 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600'
                  placeholder='name@company.com'
                />
                {errors.email && (
                  <p className='text-red-500'>{errors.email?.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='text-[15px] font-bold text-gray-900 block mb-2'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  {...register('password')}
                  placeholder='••••••••'
                  className='bg-gray-50 block w-full px-2.5 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600'
                />
                {errors.password && (
                  <p className='text-red-500'>{errors.password?.message}</p>
                )}
              </div>
              <button
                disabled={loading}
                type='submit'
                className='w-full text-white bg-black transition hover:bg-[#314158] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center items-center'
              >
                {loading ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  'Sign in to account'
                )}
              </button>
              <p className='text-sm font-light text-gray-500 mt-[15px]'>
                Don&apos;t have an account yet?{' '}
                <Link
                  href='/sign-up'
                  className='font-medium text-primary-600 hover:underline'
                >
                  Sign up
                </Link>
              </p>
              <div className='flex items-center gap-3'>
                <hr className='w-full border-gray-300' />
                <p className='w-full text-sm text-gray-800 font-medium text-center text-nowrap'>
                  or continue with
                </p>
                <hr className='w-full border-gray-300' />
              </div>
              <GoogleSignInButton />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
