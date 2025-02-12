'use client';

import React, {use, useState, useEffect } from 'react';

import { fetchCollectionsByMuseum, Collection } from '@/app/_utils/apiCalls'; // your updated API call
import CollectionCard from '@/app/collectionCard';
import Link from 'next/link';

const CollectionArtworks = ({ params }: { params: Promise<{ collections: string }> }) => {
  const { collections: collection } = use(params); // This is the dynamic museumId from the URL
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const loadCollections = async () => {


try {
  const collectionsData = await fetchCollectionsByMuseum(collection);
  setCollections(collectionsData);
} catch (error) {
  console.error('Error fetching collections:', error);
}
};

loadCollections();
}, [collection]);



return (
<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{collections.map((collection) => (
  <Link  href={`/collections/${encodeURIComponent(collection.name)}`} key={collection.id}>
    <CollectionCard image={collection.imageUrl} title={collection.name} />
  </Link>
))}
</div>
);
};

export default CollectionArtworks;

