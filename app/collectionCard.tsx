import React from 'react';

interface CollectionCardProps {
  image: string;
  title: string;
  description?: string;
  culture?: string[];
  date?: string;
  didYouKnow?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ image, title, description, culture, date, didYouKnow }) => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-15 mt-20 overflow-hidden border border-gray-200">

      <img src={image} alt={title} className="w-full h-64 object-contain" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {date && <p className="text-sm text-gray-500">{date}</p>}
        {culture && <p className="text-sm text-gray-600">{culture.join(', ')}</p>}
        {description && <p className="text-sm mt-2">{description}</p>}
        {didYouKnow && <p className="text-xs italic text-gray-500 mt-2">💡 {didYouKnow}</p>}
      </div>
    </div>
  );
};

export default CollectionCard;
