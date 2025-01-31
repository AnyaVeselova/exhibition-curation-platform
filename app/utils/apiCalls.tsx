export interface Artwork {
  id: number;
  title: string;
  creator: string;
  imageUrl: string;
}

export interface Collection {
  id: number;
  name: string;
  imageUrl: string;
}

const DEPARTMENTS = [
  "African Art",
  "American Painting and Sculpture",
  "Art of the Americas",
  "Chinese Art",
  "Contemporary Art",
  "Decorative Art and Design",
  "Drawings",
  "Egyptian and Ancient Near Eastern Art",
  "European Painting and Sculpture",
  "Greek and Roman Art",
  "Indian and South East Asian Art",
  "Islamic Art",
  "Japanese Art",
  "Korean Art",
  "Medieval Art",
  "Modern European Painting and Sculpture",
  "Oceania",
  "Performing Arts, Music, & Film",
  "Photography",
  "Prints",
  "Textiles"
];

export const fetchArtworksByDepartment = async (department: string): Promise<Artwork[]> => {
  const response = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks/?department=${encodeURIComponent(department)}&has_image=1`
  );
  const data = await response.json();

  return data.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    creator: item.creators?.map((creator: any) => creator.description).join(', ') || 'Unknown',
    imageUrl: item.images?.web?.url || '/sorry-image-not-available.jpg',
  }));
};

export const fetchFirstArtworkWithImage = async (department: string): Promise<string | null> => {
  const response = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks/?department=${encodeURIComponent(department)}&has_image=1&limit=1`
  );
  const data = await response.json();

  if (data.data.length > 0 && data.data[0].images?.web?.url) {
    return data.data[0].images.web.url; 
  }

  return null;
};
export const fetchCollections = async (): Promise<Collection[]> => {
  const collections = DEPARTMENTS.map((name, index) => ({
    id: index + 1,
    name,
    imageUrl: '', 
  }));

  const collectionsWithImages = await Promise.all(
    collections.map(async (collection) => {
     
      const imageUrl = await fetchFirstArtworkWithImage(collection.name);

      if (imageUrl) {
        collection.imageUrl = imageUrl; 
        return collection; 
      }

      return null; 
    })
  );

  return collectionsWithImages.filter((collection) => collection !== null) as Collection[];
};