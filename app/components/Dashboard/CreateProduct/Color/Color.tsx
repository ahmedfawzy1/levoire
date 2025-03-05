import { useState, useEffect } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import ColorPicker from 'react-pick-color';
import { Plus } from 'lucide-react';

interface FormData {
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
  image: string[];
  userId: number | undefined;
  slug: string;
}

interface colorProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  Color: string;
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

export default function Color({
  setFormData,
  Color,
  setValue,
  trigger,
}: colorProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState('#fff');

  const colorArr: string[] = Color.split(',');
  const [selectedColors, setSelectedColors] = useState<string[]>(colorArr);

  useEffect(() => {
    if (colorArr.length === 0) {
      setSelectedColors([]);
    }
  }, [colorArr]);

  const handleAddColor = () => {
    setSelectedColors(prevSelectedColors => [...prevSelectedColors, color]);
    setOpen(false);
  };

  useEffect(() => {
    const handleSelectedColors = () => {
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        color: selectedColors.join(','),
      }));
      setValue('color', selectedColors.join(','));
      trigger('color');
    };
    handleSelectedColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColors]);

  const handleDeleteColor = (indexToDelete: number) => {
    setSelectedColors(prevSelectedColors => {
      const updateColors = [...prevSelectedColors];
      updateColors.splice(indexToDelete, 1);
      return updateColors;
    });
    setValue('color', selectedColors.join(','));
    trigger('color');
  };

  return (
    <div className='mt-1.5 relative'>
      <div className='flex justify-between items-center'>
        <button
          type='button'
          className='bg-[#efefef] rounded-lg text-center text-[14px] px-3 py-1 cursor-pointer'
          onClick={() => setOpen(!open)}
        >
          Choose Color
        </button>

        <button type='button' onClick={handleAddColor} aria-label='Add Color'>
          <Plus size={18} />
        </button>
      </div>
      <div className='absolute'>
        {open && (
          <ColorPicker color={color} onChange={color => setColor(color.hex)} />
        )}
      </div>
      <div className='mt-3 flex gap-2'>
        {selectedColors.map((selectedColors, index) => (
          <div
            key={index}
            style={{ backgroundColor: selectedColors }}
            className={`w-10 h-10 rounded-full flex justify-center items-center`}
          >
            <button
              type='button'
              onClick={() => handleDeleteColor(index)}
              className='p-1 text-white'
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
