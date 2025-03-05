import { useState } from 'react';

interface DescriptionProps {
  setDescription: (value: string) => void;
  description: string;
}

const Description: React.FC<DescriptionProps> = ({
  setDescription,
  description,
}) => {
  const [formattedDescription, setFormattedDescription] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormattedDescription(value);

    const formatted = value
      .split('\n')
      .map(line => `<p>${line}</p>`)
      .join('');
    setDescription(formatted);
  };

  return (
    <div>
      <textarea
        className='bg-[#efefef] block w-full px-2.5 py-2.5 rounded-lg resize-none focus:outline-none'
        value={
          formattedDescription || description.replace(/<\/?[^>]+(>|$)/g, '')
        }
        onChange={handleChange}
        placeholder='Describe your product'
        rows={5}
      />
    </div>
  );
};

export default Description;
