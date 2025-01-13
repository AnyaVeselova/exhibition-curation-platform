'use client';

import React, { useEffect, useState } from 'react';
import CollectionCard from '../collectionCard';
import { fetchImagesFromHarvard, fetchImagesFromMet, getCollections } from '../utils/apiCalls';
import Link from 'next/link';

interface Collection {
  objectId?: number;
   id?: number; 
   image: string; 
   primaryImage: string;
   division:string;
   department:string;
}

const CollectionArtworks: React.FC = () => {

  const [collections, setCollections] = useState<Collection[]>([]);
 

  useEffect(()=> {
    const fetchCollections = async () => {
    try {
      const collections = await getCollections();
      if (collections) {  
          setCollections(collections);
      }
  } catch(error) {
      console.log(error);
}}
fetchCollections();}, [])



  console.log(collections)
  return (
    <>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <Link 
          href={`collections/
           ${collection.division || collection.department}`
          }
          key={collection.id}>
          <CollectionCard
            key={collection.id}
            image={collection.image || "/sorry-image-not-available.jpg"}
            title={collection.division || collection.department}
          
          />
          </Link>
        ))}
      </div>
    </>
  );
};

export default CollectionArtworks;