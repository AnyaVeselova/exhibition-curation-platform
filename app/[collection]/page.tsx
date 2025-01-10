'use client'
import React, { useEffect, useState } from 'react'
import CollectionCard from '../collectionCard';
import SearchBar from './searchBar';

const museumApiMap = {
  met: 'https://collectionapi.metmuseum.org/public/collection/v1/objects/1',
  europeana: 'https://api.europeana.eu/record/v2/search.json?query='
}


type MuseumKeys = keyof typeof museumApiMap;
const CollectionArtworks = ({ params }: { params: { collection: MuseumKeys } }) => {
  const [artworks, setArtworks] = useState([]);
  const [collection, setCollection] = useState<MuseumKeys | null>(null);
  const [searchTerm, setSearchTerm] = useState("Harry Potter");

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setCollection(resolvedParams.collection);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (collection && searchTerm) {
      
      const apiUrl = `${museumApiMap[collection]}${searchTerm}&wskey=haflabaltis`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setArtworks(data)})
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [collection, searchTerm]);



  return (
    <>
    <SearchBar setSearchTerm={setSearchTerm}/>
    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       if(artf=)
        {artworks.map((artwork, index) => (
          <CollectionCard key={index} artwork={artwork} />
        ))}
      </div> */}
    
    </>
   
  )
}

export default CollectionArtworks