export interface Artwork {
  id: number;
  title: string;
  imageUrl: string;
  image_id: string;
  collection?: string;
  images?: {
    web?: {
      url: string;
    };
  };
  image?: string;
  description?: string;
  culture?: string;
  creation_date?: string;
  did_you_know?: string;
  collectionName: string;
  department?: string;
  creators: {id:number; description: string}[]
  creator: string,
  artist_title?: string; 
 
}

export interface Collection {
  id: number;
  name : string;
  title: string;
  imageUrl: string;
}

export interface Museum {
  id: string;
  name: string;
  imageSrc: string;
  about: string;
  apiBaseUrl: string;
}

export const MUSEUMS: Museum[] = [
  {
    id: "cleveland",
    name: "The Cleveland Museum of Art",
    imageSrc: "/cleveland-museum-of-art.webp",
    about: "The Cleveland Museum of Art is renowned for the quality...",
    apiBaseUrl: "https://openaccess-api.clevelandart.org/api",
  },
  {
    id: "chicago",
    name: "The Art Institute of Chicago",
    imageSrc: "/art-institute-of-chicago.webp",
    about: "One of the oldest and largest art museums in the United States...",
    apiBaseUrl: "https://api.artic.edu/api/v1",
  },
];

export const DEPARTMENTS = [
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
  "Textiles",
];

/** ----------------- Cleveland Museum API Calls (Unchanged) ----------------- */

export const fetchArtworksByDepartment = async (
  department: string,
  page: number,
  perPage: number,
  type?: string,
  artist?: string
): Promise<Artwork[]> => {
  const skip = (page - 1) * perPage;
  const baseUrl = `https://openaccess-api.clevelandart.org/api/artworks/?`;
  const params = new URLSearchParams();

  
  if (artist) {
    params.append("artists", artist);
  
  }

  params.append("has_image", "1");
  params.append("limit", perPage.toString());
  params.append("skip", skip.toString());

  if (!artist && department) {

    params.append("department", department);
  }

  if (type) {
    params.append("type", type);
  }

  const query = baseUrl + params.toString();

  console.log("Fetching artworks with query:", query);

  const response = await fetch(query);
  const data = await response.json();
console.log(data)

  return data.data.map((item: Artwork) => ({
    id: item.id,
    title: item.title,
    creator: item.creators?.length > 0 ? item.creators[0].description : "Unknown",
    imageUrl: item.images?.web?.url || "/sorry-image-not-available.jpg",
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
    imageUrl: "",
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

export const fetchArtworkDetails = async (id: string): Promise<Artwork> => {
  try {
    const response = await fetch(`https://openaccess-api.clevelandart.org/api/artworks/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch artwork with ID ${id}`);
    }
    const data = await response.json();
    return data.data as Artwork;
  } catch (error) {
    console.error("Error fetching artwork details:", error);
    throw error;
  }
};

/** ----------------- Art Institute of Chicago API Calls (New) ----------------- */

export const fetchDepartmentsWithArtworkImage = async (): Promise<Collection[]> => {
  try {
    
    const departmentsResponse = await fetch("https://api.artic.edu/api/v1/departments");
    const departmentsData = await departmentsResponse.json();

    
    const departmentsWithArtworks = await Promise.all(
      departmentsData.data.map(async (department: Collection) => {
       
        const artworksResponse = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(department.title)}&limit=10&fields=id,title,image_id`
        );
        const artworksData = await artworksResponse.json();
    
        const artworkWithImage = artworksData.data.find((artwork: Artwork) => artwork.image_id);

        return {
          id: department.id,
          name: department.title,
          imageUrl: artworkWithImage
            ? `https://www.artic.edu/iiif/2/${artworkWithImage.image_id}/full/843,/0/default.jpg`
            : "/placeholder.jpg", 
        };
      })
    );

    return departmentsWithArtworks;
  } catch (error) {
    console.error("Error fetching departments or artworks:", error);
    return [];
  }
};



export const fetchArtworksFromChicago = async (collection: string, page: number, perPage: number): Promise<Artwork[]> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(collection)}limit=${perPage}&page=${page}&fields=id,title,artist_title,image_id`
    );
    const data = await response.json();

    console.log(data.data[0])
    return data.data.map((item: Artwork) => ({
      id: item.id,
      title: item.title,
      creator: item.artist_title || "Unknown",
      imageUrl: item
        ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
        : "/placeholder.jpg",
    }));
  } catch (error) {
    console.error("Error fetching artworks from Chicago:", error);
    return [];
  }
};

/** ----------------- Multi-Museum API Handling ----------------- */

export const fetchCollectionsByMuseum = async (museumId: string): Promise<Collection[]> => {
  if (museumId === "cleveland") {
    return fetchCollections(); 
  } else if (museumId === "chicago") {
    return fetchDepartmentsWithArtworkImage(); 
  }
  return [];
};

export const fetchArtworksByMuseum = async (
  museumId: string,
  collection: string,
  page: number,
  perPage: number,
  type?: string,
  artist?: string
): Promise<Artwork[]> => {
  if (museumId === "cleveland") {
    return fetchArtworksByDepartment(collection, page, perPage);
  } else if (museumId === "chicago") {
    return fetchArtworksFromChicago(collection, page, perPage); 
  }
  return [];
};
