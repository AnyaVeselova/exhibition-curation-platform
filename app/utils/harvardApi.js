const apiKey = process.env.NEXT_PUBLIC_HARVARD_API_KEY

export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Bad request');
        }
        const data = await response.json();
        return data.records.filter(record => record.imagecount > 0 && record.primaryimageurl);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export const fetchImagesFromHarvard = async () => {
    const url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=150&classification=Paintings`;
    return await fetchData(url);
};

export const fetchImagesFromHarvardByDepartment = async (params) => {
    const { classification, culture, century, technique, medium } = params;
    let url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}`;

    if (classification) url += `&classification=${encodeURIComponent(classification)}`;
    if (culture) url += `&culture=${encodeURIComponent(culture)}`;
    if (century) url += `&century=${encodeURIComponent(century)}`;
    if (technique) url += `&technique=${encodeURIComponent(technique)}`;
    if (medium) url += `&medium=${encodeURIComponent(medium)}`;

    return await fetchData(url);
};

export const searchImagesFromHarvard = async (query) => {
    const url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&q=${encodeURIComponent(query)}`;
    return await fetchData(url);
};