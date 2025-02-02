'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CollectionCard from '@/app/collectionCard';
import type { Artwork } from '@/app/_utils/apiCalls';

const userId = 'user123'; 

const SavedArtworks = () => {
  const [savedArtworks, setSavedArtworks] = useState<Artwork[]>([]);
  const [groupedCollections, setGroupedCollections] = useState<Record<string, Artwork[]>>({});
  const router = useRouter();

  useEffect(() => {
    const savedArtworksStr = localStorage.getItem(`savedArtworks_${userId}`);
    if (savedArtworksStr) {
      const artworks = JSON.parse(savedArtworksStr);

      const collections: Record<string, Artwork[]> = {}
      artworks.forEach((artwork: Artwork) => {
        const { collectionName } = artwork;
        if (!collections[collectionName]) collections[collectionName] = [];
        collections[collectionName].push(artwork);
      });

      setGroupedCollections(collections);
      setSavedArtworks(artworks);
    }
  }, [userId]);

 

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
              className=" overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCollectionClick(collectionName)}
            >
            <CollectionCard
            image={artworks[0].image || '/sorry-image-not-available.jpg'}  
            title={collectionName}     
            description={artworks[0].description}  
            culture={artworks[0].culture}   
            date={artworks[0].creation_date}  
            didYouKnow={artworks[0].did_you_know} 
            />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArtworks;
