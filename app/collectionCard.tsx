import React from 'react';
import Image from 'next/image';
import { useCollection } from './collectionContext';
import { usePathname } from 'next/navigation';

interface CollectionCardProps {
  image: string;
  title: string;
  description?: string;
  culture?: string;
  date?: string | number;
  didYouKnow?: string;
  creator?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ image, title, description, culture, date, didYouKnow, creator }) => {
    const { collection, museum } = useCollection();
    const pathname = usePathname();
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 max-w-[350px] min-w-[280px] mx-auto">
      <div className="relative h-60 w-full">      
        <Image 
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority 
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>

        {creator && <p className="text-sm text-gray-500 text-center">{creator}</p>}
        {date && <p className="text-sm text-gray-500 text-center">{date}</p>}
        {culture && <p className="text-sm text-gray-600 text-center">{culture}</p>}
        {description && <p className="text-sm mt-2 text-center">{description}</p>}
        {didYouKnow && <p className="text-xs italic text-gray-500 mt-2 text-center">💡 {didYouKnow}</p>}
      </div>
    </div>
  );
};

export default CollectionCard;
