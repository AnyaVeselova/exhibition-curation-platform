'use client';

import React, {use, useState, useEffect } from 'react';

import { fetchCollectionsByMuseum, Collection } from '@/app/_utils/apiCalls'; 
import CollectionCard from '@/app/collectionCard';
import Link from 'next/link';
import { useCollection } from '../collectionContext';


const CollectionArtworks = ({ params }: { params: Promise<{ collections: string }> }) => {
  const { collections: paramCollection } = use(params); 
  const [collections, setCollections] = useState<Collection[]>([]);
  const {setMuseum} = useCollection()

  useEffect(() => {
    setMuseum(paramCollection)
    const loadCollections = async () => {


try {
  const collectionsData = await fetchCollectionsByMuseum(paramCollection);
  setCollections(collectionsData);
} catch (error) {
  console.error('Error fetching collections:', error);
}
};

loadCollections();
}, [paramCollection]);



return (
<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{collections.map((collection) => (
  
  <Link  href={`/${paramCollection}/${encodeURIComponent(collection.name)}`} key={collection.id}>
    <CollectionCard image={collection.imageUrl} title={collection.name} />
  </Link>
))}
</div>
);
};

export default CollectionArtworks;

