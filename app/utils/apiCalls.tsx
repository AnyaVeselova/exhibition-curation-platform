const apiKey = process.env.NEXT_PUBLIC_HARVARD_API_KEY;
const harvardBaseUrl = 'https://api.harvardartmuseums.org/object';
const metBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';

interface Artwork {
  id: number;
  primaryimageurl: string;
  title: string;
  [key: string]: any;
}

export const fetchData = async (url: string): Promise<Artwork[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.records.filter(
      (record: any) => record.imagecount > 0 && record.primaryimageurl
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchImagesFromHarvard = async (): Promise<Artwork[]> => {
  const url = `${harvardBaseUrl}?apikey=${apiKey}&size=150&classification=Paintings`;
  return fetchData(url);
};

export const fetchImagesFromHarvardByDepartment = async (params: {
  classification?: string;
  culture?: string;
  century?: string;
  technique?: string;
  medium?: string;
}): Promise<Artwork[]> => {
  const urlParams = new URLSearchParams({ apikey: apiKey, ...params });
  const url = `${harvardBaseUrl}?${urlParams.toString()}`;
  return fetchData(url);
};

export const searchImagesFromHarvard = async (query: string): Promise<Artwork[]> => {
  const url = `${harvardBaseUrl}?apikey=${apiKey}&q=${encodeURIComponent(query)}`;
  return fetchData(url);
};

const fetchMetIds = async (): Promise<number[] | undefined> => {
  const url = `${metBaseUrl}/search?hasImages=true&q=Almond%20Blossoms%20Van%20Gogh`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch Met IDs: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.objectIDs.slice(0, 100);
  } catch (error) {
    console.error('Unable to fetch object IDs from Met:', error);
    return undefined;
  }
};

const fetchPromises = async (ids: number[], baseUrl: string): Promise<Artwork[]> => {
  try {
    const promiseArray = ids.map((id) => fetch(`${baseUrl}/${id}`));
    const promiseResults = await Promise.all(promiseArray);
    const results = await Promise.all(promiseResults.map((response) => response.json()));
    return results.filter((record) => record.primaryImage);
  } catch (error) {
    console.error('Error fetching batch of images:', error);
    throw error;
  }
};

export const fetchImagesFromMet = async (): Promise<Artwork[]> => {
  try {
    const ids = await fetchMetIds();
    if (!ids) return [];
    return fetchPromises(ids, `${metBaseUrl}/objects`);
  } catch (error) {
    console.error('Unable to get images from Met:', error);
    return [];
  }
};

const fetchCollectionsFromHarvard = async (ids, api) => {
  const promiseArray = ids.map(id => fetch(${harvardBaseUrl}/${id}?apikey=${api}));
  const promiseResults = await Promise.all(promiseArray);
  const result = await Promise.all(promiseResults.map(response => response.json()));
  return result
  .filter(record => record.primaryimageurl && record.primaryimageurl)
  .map(record => ({id: record.id, image: record.primaryimageurl, department: record.department}))
}

const fetchCollectionsFromMet = async (ids, url) => {
  const promiseArray = ids.map(id => fetch(${url}/${id}));
  const promiseResults = await Promise.all(promiseArray);
  const result = await Promise.all(promiseResults.map(response => response.json()));
  return result
  .filter(record => record.primaryImageSmall && record.primaryImageSmall)
  .map(record => ({id: record.objectID, image: record.primaryImage || record.primaryImageSmall, department: record.department}))
}

export const getCollections = async () => {
  const harvardIds = [202279, 311236, 6877, 230326];
  const metIds = [467828, 459618, 35928, 449005, 471988]; 
  
  try {
      const [harvardCollection, metCollection] = await Promise.all([
          fetchCollectionsFromHarvard(harvardIds, apiKey),
          fetchCollectionsFromMet(metIds, metBaseUrl),
      ]);         
      return [...harvardCollection, ...metCollection]
  } catch(error) {
      console.log(error);
      
  }
}