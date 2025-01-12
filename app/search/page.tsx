'use client';

import React, { useEffect, useState } from 'react';
import CollectionCard from '../collectionCard';
import SearchBar from './searchBar';
import { fetchImagesFromHarvard, fetchImagesFromMet } from '../utils/apiCalls';

interface Artwork {
  id?: number;
  objectID?: number; // For Met API
  primaryimageurl?: string;
  primaryImage?: string; // For Met API
  title: string;
  [key: string]: any;
}

const CollectionArtworks: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const [harvardArtworks, metArtworks] = await Promise.all([
          fetchImagesFromHarvard(),
          fetchImagesFromMet()
        ]);

        const combinedArtworks = [...harvardArtworks, ...metArtworks];
        setArtworks(combinedArtworks);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);


  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artworks.map((artwork) => (
          <CollectionCard
            key={artwork.id || artwork.objectID}
            image={artwork.primaryimageurl || artwork.primaryImage || "/sorry-image-not-available.jpg"}
            title={artwork.title}
          />
        ))}
      </div>
    </>
  );
};

export default CollectionArtworks;