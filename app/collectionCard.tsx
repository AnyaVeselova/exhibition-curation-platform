
import React from 'react';

interface CollectionCardProps {
  image: string;
  title: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ image, title }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

export default CollectionCard;