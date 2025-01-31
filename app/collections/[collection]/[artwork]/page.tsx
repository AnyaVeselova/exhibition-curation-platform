'use client';

import { use,  useEffect, useState } from 'react';
import { fetchArtworkDetails } from '@/app/utils/apiCalls';
import CollectionCard from '@/app/collectionCard';
import { Bookmark } from 'lucide-react';

const Artwork = ({ params }: { params: Promise<{ artwork: string }> }) => {
  const { artwork } = use(params);
  const [artworkData, setArtworkData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    setSaved(!saved);
   
  };

  if (loading) return <h1>Loading...</h1>;
  if (!artworkData) return <h1>Artwork not found</h1>;

  return (
    <div className="relative">
      <button
        className={`absolute top-3 right-3 p-2 rounded-full ${saved ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={handleSave}
      >
        <Bookmark className="w-6 h-6" fill={saved ? 'currentColor' : 'none'} />
      </button>

      <CollectionCard
        image={artworkData.images.web.url}
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
