import React from 'react';
import Image from 'next/image';
import { useCollection } from './collectionContext';
import { usePathname } from 'next/navigation';

interface CollectionCardProps {
  image: string;
  title: string;
  description?: string;
  culture?: string;
  date?: string;
  didYouKnow?: string;
  creator?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ image, title, description, culture, date, didYouKnow, creator }) => {
    const { collection } = useCollection();
    const pathname = usePathname();
  
  
  return (
    <div className="bg-white shadow-md rounded-lg mb-15 mt-20 overflow-hidden border border-gray-200">
      <div className='relative h-60 w-full'>      
        <Image 
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority 
          style={{ objectFit: 'contain' }}/>
      </div>
      <div className="p-4">
      <h3 className={`text-lg font-semibold text-gray-800 ${(
        pathname === `/collections` ||
        pathname === `/clevelend` || 
        pathname === `/chiicago`|| 
        pathname === `/collections/${collection}` || 
        pathname === `/user/saved_artworks/${collection}` || 
        pathname === `/user/saved_artworks`
        ) && "text-center"}`}>{title}</h3>

      
        {creator && <p className={`text-sm ${pathname === `/collections/${collection}`  && "text-center"} text-gray-500`}>{creator}</p>}
        {date && <p className="text-sm text-gray-500">{date}</p>}
        {culture && <p className="text-sm text-gray-600">{culture}</p>}
        {description && <p className="text-sm mt-2">{description}</p>}
        {didYouKnow && <p className="text-xs italic text-gray-500 mt-2">💡 {didYouKnow}</p>}
      </div>
    </div>
  );
};

export default CollectionCard;
