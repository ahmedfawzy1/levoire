import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      signIn('google', { callbackUrl: '/' });
    } catch (error) {
      setIsLoading(false);
      console.error('An error occurred while signing in', error);
      toast.error('An error occurred while signing in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={loginWithGoogle}
      type='button'
      className='w-full px-6 py-3 mt-5 flex items-center justify-center rounded-md text-gray-800 text-sm tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200'
    >
      {isLoading ? (
        <LoaderCircle className='animate-spin' />
      ) : (
        <Image
          src={'/images/icons/google.svg'}
          alt='badgecheck'
          width={24}
          height={24}
          className='mr-2'
        />
      )}
      Continue with Google
    </button>
  );
}
