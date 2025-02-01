'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CollectionCard from '@/app/collectionCard';

const userId = 'user123'; 

const SavedArtworks = () => {
  const [savedArtworks, setSavedArtworks] = useState<any[]>([]);
  const [groupedCollections, setGroupedCollections] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const savedArtworksStr = localStorage.getItem(`savedArtworks_${userId}`);
    if (savedArtworksStr) {
      const artworks = JSON.parse(savedArtworksStr);

      const collections: any = {};
      artworks.forEach((artwork: any) => {
        const { collectionName } = artwork;
        if (!collections[collectionName]) collections[collectionName] = [];
        collections[collectionName].push(artwork);
      });

      setGroupedCollections(collections);
      setSavedArtworks(artworks);
    }
  }, [userId]);

  console.log(groupedCollections)

  const handleCollectionClick = (collectionName: string) => {
    router.push(`/user/saved_artworks/${collectionName}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Saved Collections</h1>
      {Object.keys(groupedCollections).length === 0 ? (
        <p>No saved artworks.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(groupedCollections).map(([collectionName, artworks]) => (
            <div
              key={collectionName}
              className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCollectionClick(collectionName)}
            >
              <img
                src={artworks[0].image}
                alt={collectionName}
                className="w-full h-48 object-cover bg-gray-100"
              />
              <div className="p-2 text-center">
                <p className="font-semibold">{collectionName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArtworks;
