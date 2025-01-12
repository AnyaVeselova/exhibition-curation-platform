'use client'
import React, { useEffect, useState } from 'react'
import CollectionCard from '../collectionCard';
import SearchBar from './searchBar';
import {fetchImagesFromHarvard} from '../utils/harvardApi'


interface Artwork {
  id: number;
  primaryimageurl: string;
  title: string;
  [key: string]: any;
}

interface CollectionArtworksProps {
  params: { collection: string };
}

const CollectionArtworks: React.FC<CollectionArtworksProps> = ({ params }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [collection, setCollection] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("Harry Potter");

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setCollection(resolvedParams.collection);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (collection === 'harvard') {
      const getAllArtworks = async () => {
        try {
          const response = await fetchImagesFromHarvard();
          if (Array.isArray(response)) {
            const filteredData = response.filter(
              (resp: Artwork) => resp.primaryimageurl && resp.primaryimageurl !== ""
            );
            setArtworks(filteredData);
          }
        } catch (error) {
          console.log('Cannot get all artworks from Harvard museum', error);
        }
      };
      getAllArtworks();
    }
  }, [collection, searchTerm]);

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artworks.map((artwork) => (
          <CollectionCard
            key={artwork.id}
            image={artwork.primaryimageurl}
            title={artwork.title}
          />
        ))}
      </div>
    </>
  );
};

export default CollectionArtworks;