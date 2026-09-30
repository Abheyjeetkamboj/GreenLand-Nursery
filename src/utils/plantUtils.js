export const getCategories = (plants) => {
  return [...new Set(plants.map(plant => plant.category))].filter(Boolean);
};

export const getSubcategories = (plants, category) => {
  const filtered = category ? getPlantsByCategory(plants, category) : plants;
  return [...new Set(filtered.map(plant => plant.subcategory))].filter(Boolean);
};

export const getSeasons = (plants) => {
  return [...new Set(plants.map(plant => plant.season))].filter(Boolean);
};

export const getFeaturedPlants = (plants) => {
  return plants.filter(plant => plant.featured);
};

export const getPlantsByCategory = (plants, category) => {
  if (!category || category.toLowerCase() === 'all') return plants;
  return plants.filter(plant => plant.category === category);
};

export const getPlantsBySeason = (plants, season) => {
  if (!season || season.toLowerCase() === 'all') return plants;
  return plants.filter(plant => plant.season === season);
};

export const searchPlants = (plants, query) => {
  if (!query) return plants;
  const lowerQuery = query.toLowerCase();
  
  return plants.filter(plant => {
    return (
      (plant.name && plant.name.toLowerCase().includes(lowerQuery)) ||
      (plant.category && plant.category.toLowerCase().includes(lowerQuery)) ||
      (plant.subcategory && plant.subcategory.toLowerCase().includes(lowerQuery)) ||
      (plant.shortDescription && plant.shortDescription.toLowerCase().includes(lowerQuery)) ||
      (plant.tags && plant.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  });
};

export const filterPlants = (plants, { category, season, search, subcategory }) => {
  let result = plants;

  if (category && category.toLowerCase() !== 'all') {
    result = result.filter(plant => plant.category === category);
  }

  if (subcategory && subcategory.toLowerCase() !== 'all') {
    result = result.filter(plant => plant.subcategory === subcategory);
  }

  if (season && season.toLowerCase() !== 'all') {
    result = result.filter(plant => plant.season === season);
  }

  if (search) {
    result = searchPlants(result, search);
  }

  return result;
};

export const getPlantById = (plants, id) => {
  return plants.find(plant => plant.id === id);
};
