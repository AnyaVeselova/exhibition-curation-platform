'use client';

import {use, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CollectionCard from '@/app/collectionCard'; 
import { Trash2 } from 'lucide-react';

const userId = 'user123';

const CollectionDetail = ({ params }: { params: Promise<{ user_collection: string }> }) => {
  const { user_collection } = use(params) 
  const decodedUserCollection = decodeURIComponent(user_collection);
  const [artworks, setArtworks] = useState<any[]>([]);

 
  useEffect(() => {
    const savedArtworksStr = localStorage.getItem(`savedArtworks_${userId}`);
    if (savedArtworksStr) {
      const artworks = JSON.parse(savedArtworksStr);
     
      setArtworks(artworks);
    }
  }, [decodedUserCollection]); 


  const handleDelete = (artworkId: string) => {
    const savedArtworksStr = localStorage.getItem(`savedArtworks_${userId}`);
    if (savedArtworksStr) {
      let artworks = JSON.parse(savedArtworksStr);

     
      artworks = artworks.filter((artwork: any) => artwork.id !== artworkId);

      localStorage.setItem(`savedArtworks_${userId}`, JSON.stringify(artworks));

     
      setArtworks(artworks.filter((artwork: any) => artwork.collectionName === decodedUserCollection));
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{decodedUserCollection} Collection</h1>
      {artworks.length === 0 ? (
        <p>No artworks found in this collection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {artworks.map((artwork) => (
             <div key={artwork.id} className="relative">
             <button
                onClick={() => handleDelete(artwork.id)}
                className="absolute top-20 right-3 p-2 bg-transparent text-red-500 hover:text-red-700 transition"
                style={{ zIndex: 10 }}
              >
                <Trash2 size={24} />
              </button>
            <CollectionCard
              key={artwork.id}
              image={artwork.image}
              title={artwork.title}
              description={artwork.description}
              culture={artwork.culture}
              date={artwork.creation_date}
              didYouKnow={artwork.did_you_know}
            />
          
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
