'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';

export default function Page() {
  const FormSchema = z
    .object({
      username: z.string().min(1, 'Username is required').max(100),
      email: z.string().min(1, 'Email is required').email('Invalid email'),
      password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
      confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Password do not match',
    });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const response = await fetch('/api/user', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(result.message || 'Registration success');
      router.push('/sign-in');
    } else {
      toast.error(result.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <section className='bg-gray-50'>
      <div className='px-6 mx-auto h-[calc(100vh-65px)] flex flex-col items-center justify-center'>
        <div className='mb-10'>
          <h1 className='text-xl md:text-3xl font-extrabold leading-tight tracking-tight'>
            Create an account
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
                  htmlFor='username'
                  className='text-[15px] font-bold text-gray-900 block mb-2'
                >
                  UserName
                </label>
                <input
                  type='text'
                  id='username'
                  {...register('username')}
                  className='bg-gray-50 block w-full px-2.5 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600'
                  placeholder='name'
                />
                {errors.username && (
                  <p className='text-red-500'>{errors.username?.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='text-[15px] font-bold text-gray-900 block mb-2'
                >
                  Your email
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
              <div>
                <label
                  htmlFor='confirmPassword'
                  className='text-[15px] font-bold text-gray-900 block mb-2'
                >
                  Confirm password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  {...register('confirmPassword')}
                  placeholder='••••••••'
                  className='bg-gray-50 block w-full px-2.5 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600'
                />
                {errors.confirmPassword && (
                  <p className='text-red-500'>
                    {errors.confirmPassword?.message}
                  </p>
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
                  'Create an account'
                )}
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
                <Link
                  href='/sign-in'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
