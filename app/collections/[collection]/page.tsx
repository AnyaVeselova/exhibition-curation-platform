'use client';
import React, { use, useState, useEffect } from 'react';
import SearchBar from './searchBar';
import { fetchArtworksByDepartment, Artwork } from '@/app/_utils/apiCalls';
import CollectionCard from '@/app/collectionCard';
import Link from 'next/link';

const Collection = ({ params }: { params: Promise<{ collection: string }> }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { collection } = use(params);
  const decodedCollection = decodeURIComponent(collection);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const collectionArtworks = await fetchArtworksByDepartment(decodedCollection);
        setArtworks(collectionArtworks);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };
    fetchArtworks();
  }, [decodedCollection]);

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      {artworks.map((artwork) => (
        <Link href={`/collections/${encodeURIComponent(collection)}/${artwork.id}`} key={artwork.id}>
          <CollectionCard image={artwork.imageUrl} title={artwork.title} />
        </Link>
      ))}
    </div>
  );
};

export default Collection;
