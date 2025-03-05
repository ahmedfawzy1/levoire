import { useState } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';

interface FormData {
  title: string;
  description: string;
  category: string;
  style: string;
  store: string;
  size: string;
  inventory: string;
  color: string;
  price: number;
  image: string[];
  userId: number | undefined;
}

interface sizeProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setValue: UseFormSetValue<{
    title: string;
    description: string;
    category: string;
    style: string;
    store: string;
    size: string;
    inventory: number;
    color: string;
    maxPrice: number;
    minPrice: number;
    slug: string;
  }>;
  trigger: UseFormTrigger<{
    title: string;
    description: string;
    category: string;
    style: string;
    store: string;
    size: string;
    inventory: number;
    color: string;
    maxPrice: number;
    minPrice: number;
    slug: string;
  }>;
}

export default function Size({ setFormData, setValue, trigger }: sizeProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const sizes = ['sm', 'md', 'xl', '2xl', '3xl', '4xl'];

  const handleSizeButtonClick = (size: string) => {
    let updatedSizes;
    if (selectedSizes.includes(size)) {
      updatedSizes = selectedSizes.filter(s => s !== size);
    } else {
      updatedSizes = [...selectedSizes, size];
    }
    setSelectedSizes(updatedSizes);
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      size: updatedSizes.join(','),
    }));
    setValue('size', updatedSizes.join(','));
    trigger('size');
  };

  return (
    <div className='flex gap-1'>
      {sizes.map(size => (
        <button
          type='button'
          key={size}
          className={`rounded-lg text-center text-[14px] px-3 py-1 cursor-pointer ${
            selectedSizes.includes(size) ? 'bg-[#e2e2e2]' : 'bg-[#efefef]'
          }`}
          onClick={() => handleSizeButtonClick(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
