'use client';
import React, { use, useState, useEffect } from 'react';
import SearchBar from '../[collection]/searchBar';
import { fetchArtworksByDepartment } from '@/app/utils/apiCalls';
import CollectionCard from '@/app/collectionCard';
import Link from 'next/link';

const Collection = ({ params }: { params: Promise<{ collection: string } >}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {collection} = use(params)
  const department = collection ? decodeURIComponent(collection).replace(/-/g, ' ') : '';  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const collectionArtworks = await fetchArtworksByDepartment(department);
        setArtworks(collectionArtworks);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };
    fetchArtworks();
  }, [department]);

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      {artworks.map((artwork) => (
        <Link href={`/[artwork]`} key={artwork.id} >
          <CollectionCard image={artwork.imageUrl} title={artwork.title} />
        </Link>
      ))}
    </div>
  );
};

export default Collection;