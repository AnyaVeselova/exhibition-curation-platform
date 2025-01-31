'use client';
import React, { useEffect, useState } from 'react';
import { fetchCollections, Collection} from '@/app/utils/apiCalls';
import CollectionCard from '@/app/collectionCard';
import Link from 'next/link';

const CollectionArtworks: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const collectionsData = await fetchCollections();
        setCollections(collectionsData);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };
    loadCollections();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {collections.map((collection) => (
        <Link href={`/collections/${encodeURIComponent(collection.name)}`} key={collection.id}>
          <CollectionCard image={collection.imageUrl} title={collection.name} />
        </Link>
      ))}
    </div>
  );
};

export default CollectionArtworks;
