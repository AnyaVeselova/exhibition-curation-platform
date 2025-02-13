'use client';

import { use, useEffect, useState } from 'react';
import { fetchArtworkByMuseum, parseHTML } from '@/app/_utils/apiCalls';
import CollectionCard from '@/app/collectionCard';
import { Bookmark } from 'lucide-react';
import type { Artwork } from '@/app/_utils/apiCalls';


const Artwork = ({ params }: { params: Promise<{ artwork: number, collections: string}> }) => {
  const { artwork, collections: museumId } = use(params);
  const [artworkData, setArtworkData] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
 
  const userId = 'user123';

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        const data = await fetchArtworkByMuseum(museumId, artwork);
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

      const collectionName = artworkData.department  || artworkData.department_title

      
      if (!saved) {
    
       
        savedArtworks.push({
          id: artworkData.id,
          image: artworkData.images?.web?.url || artworkData.imageUrl || '/default-image-url', 
          title: artworkData.title,
          description: parseHTML(artworkData.description ||''),
          didYouKnow: parseHTML(artworkData.did_you_know || artworkData.exhibition_history || ""),
          culture: parseHTML(artworkData.culture || artworkData.artist_display
|| ''),
          date: artworkData.creation_date || artworkData.date_display,
          museumId,
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
        image={artworkData.images?.web?.url || artworkData.imageUrl || '/default-image.jpg'}
        title={parseHTML(artworkData.title || '')}
        description={parseHTML(artworkData.description || '')}
        culture = {parseHTML(artworkData.culture || artworkData.artist_display
          || '')}
        date={artworkData.creation_date || artworkData.date_display}
        didYouKnow={parseHTML(artworkData.did_you_know || artworkData.exhibition_history || "")}
    
      />
    </div>
  );
};

export default Artwork;
