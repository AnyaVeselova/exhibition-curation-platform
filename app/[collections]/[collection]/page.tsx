'use client';
import React, { use, useState, useEffect } from 'react';
import { fetchArtworksByMuseum, Artwork } from '@/app/_utils/apiCalls';
import CollectionCard from '@/app/collectionCard';
import Link from 'next/link';
import Pagination from './pagination';
import {useCollection} from '../../collectionContext'
import { useSearchParams, useParams } from 'next/navigation';


const perPage = 10
const Collection = ({ params }: { params: Promise<{ collection: string, collections: string}> }) => {
  const { collection, collections: museumId} = use(params);
  const {setCollection} = useCollection()
  const decodedCollection = decodeURIComponent(collection);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '';
  const artist = searchParams.get('artists') || '';
  


  useEffect(()=> {

      setCollection(collection as string)
    
  }, [collection, setCollection])


  useEffect(() => {
    
    const fetchArtworks = async () => {
      try {
        const collectionArtworks = await fetchArtworksByMuseum(museumId, decodedCollection, page, perPage, type, artist);
        setArtworks(collectionArtworks);
        if(page === 1 && collectionArtworks.length === perPage) {
          setTotalPages(Math.ceil(1000/perPage))
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };
    fetchArtworks();
  }, [decodedCollection, page, type, artist, museumId]);

  
  return (
    <div >
       <h2 className="text-center text-3xl font-semibold text-gray-800 mt-4 mb-6">Collection: {decodedCollection}</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {artworks.map((artwork) => (
        <Link href={`/collections/${encodeURIComponent(collection)}/${artwork.id}`} key={artwork.id}>
          <CollectionCard image={artwork.imageUrl} title={artwork.title} creator={artwork.creator}/>
        </Link>
      ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
    </div>
  );
};

export default Collection;
