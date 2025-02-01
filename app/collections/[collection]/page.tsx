'use client';
import React, { use, useState, useEffect } from 'react';
import SearchBar from './searchBar';
import { fetchArtworksByDepartment, Artwork } from '@/app/_utils/apiCalls';
import CollectionCard from '@/app/collectionCard';
import Link from 'next/link';
import Pagination from './pagination';
import {useCollection} from '../../context/collectionContext'
import { useSearchParams } from 'next/navigation';


const perPage = 10
const Collection = ({ params }: { params: Promise<{ collection: string }> }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { collection } = use(params);
  const {setCollection} = useCollection()
  const decodedCollection = decodeURIComponent(collection);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '';
  const artist = searchParams.get('artist') || '';

  useEffect(()=> {

      setCollection(collection as string)
    
  }, [collection, setCollection])


  useEffect(() => {
    
    const fetchArtworks = async () => {
      try {
        const collectionArtworks = await fetchArtworksByDepartment(decodedCollection, page, perPage, type, artist);
        setArtworks(collectionArtworks);
        if(page === 1 && collectionArtworks.length === perPage) {
          setTotalPages(Math.ceil(1000/perPage))
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };
    fetchArtworks();
  }, [decodedCollection, page, type, artist]);
  

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      {artworks.map((artwork) => (
        <Link href={`/collections/${encodeURIComponent(collection)}/${artwork.id}`} key={artwork.id}>
          <CollectionCard image={artwork.imageUrl} title={artwork.title} />
        </Link>
      ))}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
    </div>
  );
};

export default Collection;
