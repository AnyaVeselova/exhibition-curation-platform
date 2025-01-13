'use client'
import React, { useState, useEffect } from 'react'
import SearchBar from '../[collection]/searchBar';
import { fetchImagesFromHarvardByDepartment } from '@/app/utils/apiCalls';
import CollectionCard from '@/app/collectionCard';
import Link from 'next/link';


interface Artwork {
  objectid?: number; // For Met API
  primaryimageurl?: string;
  primaryImage?: string; // For Met API
  creditline: string;
  [key: string]: any;
}

const Collection = ({params}:{params:{collection:string}}) => {
   const [searchTerm, setSearchTerm] = useState<string>('');
   const division = decodeURIComponent(params.collection).replace(/-/g, ' ');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
    
  useEffect(() => {
     const fetchArtworks = async () => {
       try {
         const collectionArtworks = await fetchImagesFromHarvardByDepartment({division})
         setArtworks(collectionArtworks);
       } catch (error) {
         console.error('Error fetching artworks:', error);
       }
     };

     fetchArtworks();
   }, [division]);

   console.log(artworks)

  return (
    <div><SearchBar setSearchTerm={setSearchTerm} />
   {artworks.map((artwork) => (
          <Link 
          
          href={`artwork/`
          }
          key={artwork.objectid}>
          <CollectionCard
            key={artwork.objectid}
            image={artwork.primaryimageurl || "/sorry-image-not-available.jpg"}
            title={artwork.creditline}
          
          />
          </Link>
     ))}
    </div>
  )
}

export default Collection