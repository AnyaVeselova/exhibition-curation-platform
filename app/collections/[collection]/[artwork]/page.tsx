'use client';

import { use, useEffect, useState } from 'react';
import { fetchArtworkDetails } from '@/app/_utils/apiCalls';
import CollectionCard from '@/app/collectionCard';
import { Bookmark } from 'lucide-react';
import type { Artwork } from '@/app/_utils/apiCalls';


const Artwork = ({ params }: { params: Promise<{ artwork: string }> }) => {
  const { artwork } = use(params);
  const [artworkData, setArtworkData] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
 
  const userId = 'user123';

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        const data = await fetchArtworkDetails(artwork);
        setArtworkData(data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      } finally {
        setLoading(false);
      }
    };

    if (artwork) {
      fetchArtwork();
    }
  }, [artwork]);

 
  
  useEffect(() => {
    if (artworkData) {
      const savedArtworksStr = localStorage.getItem(`savedArtworks_${userId}`);
      const savedArtworks = savedArtworksStr ? JSON.parse(savedArtworksStr) : [];
      const isSaved = savedArtworks.some((item: Artwork) => item.id === artworkData.id);
      setSaved(!!isSaved);
    }
  }, [artworkData, userId]);

  const handleSave = () => {
    if (!artworkData) return;

    try {

      const savedArtworksStr = localStorage.getItem(`savedArtworks_${userId}`);
      let savedArtworks = savedArtworksStr ? JSON.parse(savedArtworksStr) : [];

      const collectionName = artworkData.collection || 'default'; 

      if (!saved) {
       
        savedArtworks.push({
          id: artworkData.id,
          image: artworkData.images?.web?.url || 'default-image-url', 
          title: artworkData.title,
          description: artworkData.description,
          collectionName,
        });

        localStorage.setItem(`savedArtworks_${userId}`, JSON.stringify(savedArtworks));
        setSaved(true); 
      } else {
       
        savedArtworks = savedArtworks.filter((item: Artwork) => item.id !== artworkData.id);
        localStorage.setItem(`savedArtworks_${userId}`, JSON.stringify(savedArtworks));
        setSaved(false); 
      }
    } catch (error) {
      console.error('Error saving artwork:', error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (!artworkData) return <h1>Artwork not found</h1>;

  return (
    <div className="relative">
      <button
        className={`absolute top-3 right-3 p-2 rounded-full ${
          saved ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        style={{ zIndex: 10 }}
        onClick={() => {
          
          handleSave();
        }}
      >
        <Bookmark className="w-6 h-6" fill={saved ? 'currentColor' : 'none'} />
      </button>

      <CollectionCard
        image={artworkData.images?.web?.url || '/default-image.jpg'}
        title={artworkData.title}
        description={artworkData.description}
        culture={artworkData.culture}
        date={artworkData.creation_date}
        didYouKnow={artworkData.did_you_know}
      />
    </div>
  );
};

export default Artwork;
