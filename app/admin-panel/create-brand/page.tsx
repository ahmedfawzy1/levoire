'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, LoaderCircle, PackagePlus } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageGallery from '@/app/components/Dashboard/CreateProduct/ImageGallery/ImageGallery';

export default function CreateBrand() {
  const { user } = useAuth();
  const id = user?.id;
  const userIdNumber = id ? parseInt(id) : 0;
  const router = useRouter();
  const submitButton = useRef<HTMLButtonElement | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const defaultImage =
    'https://res.cloudinary.com/dr0gslecu/image/upload/v1730150154/lvfef1ettpmxxvvk6gtz.png';
  const [formData, setFormData] = useState({
    name: '',
    image: [] as string[],
    userId: userIdNumber,
  });

  const FormSchema = z.object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(100, 'Name cannot exceed 100 characters'),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'name') {
      register(name).onChange(e);
    }
  };

  useEffect(() => {
    if (id) {
      setFormData(prevFormData => ({
        ...prevFormData,
        userId: parseInt(id, 10),
      }));
    }
  }, [id]);

  const handleImageChange = (imageUrls: string[]) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      image: imageUrls.length > 0 ? imageUrls : [defaultImage],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = async () => {
    if (!id) {
      toast.error('You must be logged in to create a brand');
      return;
    }
    try {
      if (imageUrls.length === 0) {
        setFormData(prevFormData => ({
          ...prevFormData,
          image: [defaultImage],
        }));
      }

      await axios.post('/api/brands', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Brand created successfully');
      reset();
      router.push('/admin-panel/brands');
    } catch (error) {
      toast.error(`Failed to create brand ${error}`);
      console.log(error);
    }
  };

  return (
    <div className='px-2 md:px-5 mb-10'>
      <div className='flex justify-between items-center'>
        <h1 className='text-sm md:text-2xl font-semibold py-6 flex justify-center items-center gap-2'>
          <PackagePlus />
          Add your Brand
        </h1>
        <button
          onClick={() => submitButton.current?.click()}
          className='px-3 pe-3.5 py-2 md:px-4 md:py-3 bg-black text-white text-sm md:text-base rounded-3xl flex justify-center items-center gap-2'
        >
          {isSubmitting ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <>
              <Check size={18} />
              Add Brand
            </>
          )}
        </button>
      </div>
      <div className='text-black mt-2'>
        <form
          id='brand-form'
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col md:flex-row gap-6'
        >
          <div className='flex flex-col gap-y-5 basis-3/5'>
            <div className='bg-[#f9f9f9] p-5 space-y-5 rounded-2xl'>
              <h2 className='text-xl font-bold mb-4'>Brand Information</h2>
              <div>
                <label
                  htmlFor='name'
                  className='text-[15px] font-medium text-gray-900 block mb-2'
                >
                  Brand Name
                </label>
                <input
                  id='name'
                  type='text'
                  {...register('name')}
                  value={formData.name}
                  onChange={handleChange}
                  className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                />
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name?.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className='bg-[#f9f9f9] h-fit p-5 space-y-5 rounded-2xl basis-2/5'>
            <h4 className='text-xl font-bold mb-4'>Upload Image</h4>
            <div>
              <ImageGallery
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
                handleImageChange={handleImageChange}
              />
            </div>
            <button
              ref={submitButton}
              type='submit'
              className='sr-only'
              aria-label='submit'
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
