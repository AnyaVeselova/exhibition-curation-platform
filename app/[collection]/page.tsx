'use client'
import React, { useEffect, useState } from 'react'

const museumApiMap = {
  met: 'https://collectionapi.metmuseum.org/public/collection/v1/objects/1',
  harvard: 'https://api.harvardartmuseums.org/object?apikey=7d848129-3a3c-4008-b3bf-0ecce51cfd7a'
}


type MuseumKeys = keyof typeof museumApiMap;
const CollectionArtworks = ({ params }: { params: { collection: MuseumKeys } }) => {
  const [artworks, setArtworks] = useState([]);
  const [collection, setCollection] = useState<MuseumKeys | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setCollection(resolvedParams.collection);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (collection) {
      const apiUrl = museumApiMap[collection];
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setArtworks(data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [collection]);

  console.log(artworks)

  return (
    <div>Harward artworks</div>
  )
}

export default CollectionArtworks