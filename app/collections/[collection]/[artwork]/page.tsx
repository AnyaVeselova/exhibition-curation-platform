'use client';

import { useEffect, useState } from 'react';
import { fetchArtworkDetails } from '@/app/utils/apiCalls';

const Artwork = ({ params }: { params: { artwork: number; collection: string } }) => {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        const artworkData = await fetchArtworkDetails(decodedArtworkId);
        setArtwork(artworkData);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.artwork) {
      fetchArtwork();
    }
  }, [params.artwork]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!artwork) {
    return <h1>Artwork not found</h1>;
  }

  return (
    <div>
      <h1>{artwork.title}</h1>
      <p>{artwork.description}</p>
      {/* Render more artwork details */}
    </div>
  );
};

export default Artwork;
