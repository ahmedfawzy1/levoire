'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, FilePenLine, LoaderCircle } from 'lucide-react';
import { getProductBySlug } from '@/app/lib/product';
import Size from '@/app/components/Dashboard/CreateProduct/Size/Size';
import Color from '@/app/components/Dashboard/CreateProduct/Color/Color';
import Description from '@/app/components/Dashboard/CreateProduct/Description/Description';
import ImageGallery from '@/app/components/Dashboard/CreateProduct/ImageGallery/ImageGallery';

const FormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title cannot exceed 100 characters'),
  category: z
    .string()
    .min(2, 'Category must be at least 2 characters long')
    .max(50, 'Category cannot exceed 50 characters'),
  style: z
    .string()
    .min(2, 'Style must be at least 2 characters long')
    .max(50, 'Style cannot exceed 50 characters'),
  store: z
    .string()
    .min(2, 'Store name must be at least 2 characters long')
    .max(50, 'Store name cannot exceed 50 characters'),
  maxPrice: z
    .number()
    .positive('Price must be a positive number')
    .min(1, 'Price must be at least 1')
    .max(10000, 'Price cannot exceed 10,000'),
  minPrice: z
    .number()
    .positive('Price must be a positive number')
    .min(1, 'Price must be at least 1')
    .max(10000, 'Price cannot exceed 10,000'),
  inventory: z
    .number()
    .int('Inventory must be an integer')
    .min(1, 'Inventory must be at least 1')
    .max(100, 'Inventory cannot exceed 100 units'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(1000, 'Description cannot exceed 1000 characters'),
  color: z.string(),
  size: z.string().min(1, 'At least one size must be selected'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters long')
    .max(100, 'Slug cannot exceed 100 characters'),
});

export default function UpdateProductForm() {
  const { id } = useParams();
  const { user } = useAuth();
  const userId = user?.id;
  const userIdNumber = userId ? parseInt(userId) : 0;
  const router = useRouter();
  const submitButton = useRef<HTMLButtonElement | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    style: '',
    store: '',
    size: '',
    inventory: 0,
    color: '#fe345e',
    maxPrice: 0,
    minPrice: 0,
    image: [] as string[],
    userId: userIdNumber,
    slug: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (
      name === 'title' ||
      name === 'category' ||
      name === 'style' ||
      name === 'store' ||
      name === 'slug'
    ) {
      register(name).onChange(e);
    }
  };

  useEffect(() => {
    if (userId) {
      setFormData(prevFormData => ({
        ...prevFormData,
        userId: parseInt(userId, 10),
      }));
    }
  }, [userId]);

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const price = e.target.value !== '' ? parseFloat(value) : 0;
    setFormData(prevFormData => ({
      ...prevFormData,
      maxPrice: price,
    }));
    register('maxPrice').onChange(e);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const price = e.target.value !== '' ? parseFloat(value) : 0;
    setFormData(prevFormData => ({
      ...prevFormData,
      minPrice: price,
    }));
    register('minPrice').onChange(e);
  };

  const handleInventoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inventory = value !== '' ? parseInt(value, 10) : 0;
    if (/^\d*$/.test(value)) {
      setFormData(prevFormData => ({
        ...prevFormData,
        inventory: inventory,
      }));
    }
    register('inventory').onChange(e);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      color: color,
    }));
  };

  const handleDescriptionChange = (description: string) => {
    setFormData({
      ...formData,
      description: description,
    });
    setValue('description', description);
    trigger('description');
  };

  const handleImageChange = (imageUrls: string[]) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      image: imageUrls,
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    trigger,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (id) {
      const productId = Array.isArray(id) ? id[0] : id;
      getProductBySlug(productId).then(product => {
        console.log('Fetched product:', product);
        setFormData({
          ...product,
        });

        if (product?.image && Array.isArray(product.image)) {
          setImageUrls(product.image);
        }

        reset({
          ...product,
          userId: userIdNumber,
        });
      });
    }
  }, [id, reset, userIdNumber]);

  const onSubmit = async () => {
    try {
      const response = await axios.put(`/api/update_product/${id}`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      router.push('/admin-panel/update-product');
      toast.success('Product updated successfully');
      console.log(response);
    } catch (error) {
      toast.error(`Failed to updated form data ${error}`);
      console.log(error);
    }
  };

  return (
    <div className='px-2 md:px-5 mb-10'>
      <div className='flex justify-between items-center'>
        <h1 className='text-sm md:text-2xl font-semibold py-6 flex justify-center items-center gap-2'>
          <FilePenLine />
          Update your Product
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
              Update Product
            </>
          )}
        </button>
      </div>
      <div className='text-black mt-2'>
        <form
          id='product-form'
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col md:flex-row gap-6'
        >
          <div className='flex flex-col gap-y-5 basis-3/5'>
            <div className='bg-[#f9f9f9] p-5 space-y-5 rounded-2xl'>
              <h2 className='text-xl font-bold mb-4'>General Information</h2>
              <div>
                <label
                  htmlFor='title'
                  className='text-[15px] font-medium text-gray-900 block mb-2'
                >
                  Name Product
                </label>
                <input
                  id='title'
                  type='text'
                  {...register('title')}
                  value={formData.title}
                  onChange={handleChange}
                  className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                />
                {errors.title && (
                  <p className='text-red-500 text-sm'>
                    {errors.title?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='text-[15px] font-medium text-gray-900 block mb-2'
                >
                  Description Product
                </label>
                <Description
                  setDescription={handleDescriptionChange}
                  description={formData.description}
                />
                {errors.description && (
                  <p className='text-red-500 text-sm'>
                    {errors.description?.message}
                  </p>
                )}
              </div>
              <div className='flex gap-3'>
                <div className='w-full'>
                  <label
                    htmlFor='category'
                    className='text-[15px] font-medium text-gray-900 block mb-2'
                  >
                    Category
                  </label>
                  <input
                    id='category'
                    type='text'
                    {...register('category')}
                    value={formData.category}
                    onChange={handleChange}
                    className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                  />
                  {errors.category && (
                    <p className='text-red-500 text-sm'>
                      {errors.category?.message}
                    </p>
                  )}
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='style'
                    className='text-[15px] font-medium text-gray-900 block mb-2'
                  >
                    Style
                  </label>
                  <input
                    id='style'
                    type='text'
                    {...register('style')}
                    value={formData.style}
                    onChange={handleChange}
                    className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                  />
                  {errors.style && (
                    <p className='text-red-500 text-sm'>
                      {errors.style?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='w-full'>
                  <label
                    htmlFor='store'
                    className='text-[15px] font-medium text-gray-900 block mb-2'
                  >
                    Store
                  </label>
                  <input
                    id='store'
                    type='text'
                    {...register('store')}
                    value={formData.store}
                    onChange={handleChange}
                    className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                  />
                  {errors.store && (
                    <p className='text-red-500 text-sm'>
                      {errors.store?.message}
                    </p>
                  )}
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='slug'
                    className='text-[15px] font-medium text-gray-900 block mb-2'
                  >
                    Slug
                  </label>
                  <input
                    id='slug'
                    type='text'
                    {...register('slug')}
                    value={formData.slug}
                    onChange={handleChange}
                    className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                  />
                  {errors.slug && (
                    <p className='text-red-500 text-sm'>
                      {errors.slug?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='flex flex-col md:flex-row gap-5 md:gap-3'>
                <div className='w-full'>
                  <label
                    htmlFor='size'
                    className='text-[15px] font-medium text-gray-900 block mb-2'
                  >
                    Size
                  </label>
                  <input
                    id='size'
                    type='text'
                    value={formData.size}
                    onChange={handleChange}
                    disabled
                    className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none mb-2.5'
                  />
                  <Size
                    setFormData={setFormData}
                    setValue={setValue}
                    trigger={trigger}
                  />
                  {errors.size && (
                    <p className='text-red-500 text-sm'>
                      {errors.size?.message}
                    </p>
                  )}
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='color'
                    className='text-[15px] font-medium text-gray-900 block mb-2'
                  >
                    Color
                  </label>
                  <input
                    id='color'
                    type='text'
                    value={formData.color}
                    onChange={handleColorChange}
                    disabled
                    className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                  />
                  <Color
                    setFormData={setFormData}
                    Color={formData.color}
                    setValue={setValue}
                    trigger={trigger}
                  />
                  {errors.color && (
                    <p className='text-red-500 text-sm'>
                      {errors.color?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='bg-[#f9f9f9] p-5 space-y-5 rounded-2xl'>
              <h3 className='text-xl font-bold mb-4'>Pricing And Stock</h3>
              <div className='flex gap-3'>
                <div className='w-full'>
                  <label
                    htmlFor='maxPrice'
                    className='text-[15px] font-medium text-gray-900 block mb-2'
                  >
                    Price
                  </label>
                  <input
                    id='maxPrice'
                    type='number'
                    {...register('maxPrice', { valueAsNumber: true })}
                    value={formData.maxPrice === 0 ? '' : formData.maxPrice}
                    onChange={handleMaxPriceChange}
                    min={1}
                    className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                  />
                  {errors.maxPrice && (
                    <p className='text-red-500 text-sm'>
                      {errors.maxPrice?.message}
                    </p>
                  )}
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='minPrice'
                    className='text-[15px] font-medium text-gray-900 block mb-2'
                  >
                    minPrice
                  </label>
                  <input
                    id='minPrice'
                    type='number'
                    {...register('minPrice', { valueAsNumber: true })}
                    value={formData.minPrice === 0 ? '' : formData.minPrice}
                    onChange={handleMinPriceChange}
                    min={1}
                    className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                  />
                  {errors.minPrice && (
                    <p className='text-red-500 text-sm'>
                      {errors.minPrice?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor='inventory'
                  className='text-[15px] font-medium text-gray-900 block mb-2'
                >
                  Inventory
                </label>
                <input
                  id='inventory'
                  type='number'
                  {...register('inventory', { valueAsNumber: true })}
                  value={formData.inventory === 0 ? '' : formData.inventory}
                  onChange={handleInventoryChange}
                  min={1}
                  className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg focus:outline-none'
                />
                {errors.inventory && (
                  <p className='text-red-500 text-sm'>
                    {errors.inventory?.message}
                  </p>
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
