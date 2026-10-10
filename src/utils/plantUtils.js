import { plants as defaultPlants } from '../data/plants.js';

/**
 * Normalizes any plant data structure into a flat array of plants.
 * Handles:
 * - standard array of plants: [ { id: '...' }, ... ]
 * - categorized object: { indoor: [...], outdoor: [...], fruits: [...] }
 * - null / undefined / invalid inputs
 */
export const getAllPlants = (customPlants = defaultPlants) => {
  if (Array.isArray(customPlants)) {
    return customPlants;
  }
  if (customPlants && typeof customPlants === 'object') {
    const values = Object.values(customPlants);
    return values.flat().filter(item => item && typeof item === 'object' && item.id);
  }
  return Array.isArray(defaultPlants) ? defaultPlants : [];
};

/**
 * Returns unique category names.
 * Accepts either:
 * - getCategories(plants)
 * - getCategories()
 */
export const getCategories = (plants = defaultPlants) => {
  const list = getAllPlants(plants);
  return [...new Set(list.map(plant => plant?.category))].filter(Boolean);
};

/**
 * Returns unique subcategories for a category.
 * Accepts either:
 * - getSubcategories(plants, category)
 * - getSubcategories(category)
 * - getSubcategories()
 */
export const getSubcategories = (param1, param2) => {
  let category;
  let plantList;

  if (param2 !== undefined) {
    plantList = getAllPlants(param1);
    category = param2;
  } else if (typeof param1 === 'string') {
    plantList = getAllPlants(defaultPlants);
    category = param1;
  } else {
    plantList = getAllPlants(param1 || defaultPlants);
    category = null;
  }

  const filtered = category ? getPlantsByCategory(plantList, category) : plantList;
  return [...new Set(filtered.map(plant => plant?.subcategory))].filter(Boolean);
};

/**
 * Returns unique seasons.
 * Accepts either:
 * - getSeasons(plants)
 * - getSeasons()
 */
export const getSeasons = (plants = defaultPlants) => {
  const list = getAllPlants(plants);
  return [...new Set(list.map(plant => plant?.season))].filter(Boolean);
};

/**
 * Returns featured plants.
 * Accepts either:
 * - getFeaturedPlants(plants)
 * - getFeaturedPlants()
 */
export const getFeaturedPlants = (plants = defaultPlants) => {
  const list = getAllPlants(plants);
  return list.filter(plant => plant && Boolean(plant.featured));
};

/**
 * Filters plants by category or subcategory.
 * Accepts both signatures:
 * - getPlantsByCategory(plants, category)
 * - getPlantsByCategory(category)
 */
export const getPlantsByCategory = (param1, param2) => {
  let category;
  let plantList;

  if (param2 !== undefined) {
    plantList = getAllPlants(param1);
    category = param2;
  } else {
    plantList = getAllPlants(defaultPlants);
    category = param1;
  }

  if (!category || String(category).trim().toLowerCase() === 'all') {
    return plantList;
  }

  const clean = (s) => String(s || '').trim().toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
  const target = clean(category);

  return plantList.filter(plant => {
    if (!plant) return false;
    const cat = clean(plant.category);
    const sub = clean(plant.subcategory);
    const tags = Array.isArray(plant.tags) ? plant.tags.map(clean) : [];

    // Exact or space/hyphen-normalized match
    if (cat === target || sub === target || tags.includes(target)) {
      return true;
    }
    // Keyword/stem match (e.g., 'indoor' matches 'indoor plants')
    if (target === 'indoor' && cat.includes('indoor')) return true;
    if (target === 'outdoor' && cat.includes('outdoor')) return true;
    if (target === 'flowering' && (cat.includes('flowering') || cat.includes('flower'))) return true;
    if (target === 'fruit' && (cat.includes('fruit') || cat.includes('fruits'))) return true;

    return false;
  });
};

/**
 * Normalizes season string safely for comparison.
 * Normalizes 'summer' -> 'summer', 'winter' -> 'winter', 'monsoon' -> 'monsoon',
 * and 'all-season', 'all season', 'allseason', 'all', 'evergreen', 'year-round' -> 'all-season'.
 */
export const normalizeSeasonKey = (seasonStr) => {
  if (!seasonStr) return '';
  const cleaned = String(seasonStr).trim().toLowerCase().replace(/[-_\s]+/g, '');
  if (cleaned === 'allseason' || cleaned === 'all' || cleaned === 'evergreen' || cleaned === 'yearround') {
    return 'all-season';
  }
  if (cleaned === 'summer') return 'summer';
  if (cleaned === 'winter') return 'winter';
  if (cleaned === 'monsoon' || cleaned === 'rainy' || cleaned === 'rain') return 'monsoon';
  return cleaned;
};

/**
 * Checks whether a plant is suitable for a specified season.
 * Supports:
 * - primary plant.season
 * - plant.seasons array
 * - plant.tags array
 */
export const isPlantInSeason = (plant, season) => {
  if (!plant || !season) return false;

  const target = normalizeSeasonKey(season);
  if (!target) return true;

  // 1. Check primary plant.season
  if (plant.season && normalizeSeasonKey(plant.season) === target) {
    return true;
  }

  // 2. Check plant.seasons array if present
  if (Array.isArray(plant.seasons)) {
    if (plant.seasons.some(s => normalizeSeasonKey(s) === target)) {
      return true;
    }
  }

  // 3. Check plant.tags if present
  if (Array.isArray(plant.tags)) {
    if (plant.tags.some(t => normalizeSeasonKey(t) === target)) {
      return true;
    }
  }

  return false;
};

/**
 * Filters plants by season.
 * Accepts both signatures:
 * - getPlantsBySeason(plants, season)
 * - getPlantsBySeason(season)
 */
export const getPlantsBySeason = (param1, param2) => {
  let season;
  let plantList;

  if (param2 !== undefined) {
    plantList = getAllPlants(param1);
    season = param2;
  } else {
    plantList = getAllPlants(defaultPlants);
    season = param1;
  }

  if (!season) {
    return plantList;
  }

  const raw = String(season).trim().toLowerCase();
  if (raw === 'all plants' || raw === 'allplants') {
    return plantList;
  }

  return plantList.filter(plant => isPlantInSeason(plant, season));
};

/**
 * Searches plants across name, category, subcategory, descriptions, and tags.
 * Accepts both signatures:
 * - searchPlants(plants, query)
 * - searchPlants(query)
 */
export const searchPlants = (param1, param2) => {
  let query;
  let plantList;

  if (param2 !== undefined) {
    plantList = getAllPlants(param1);
    query = param2;
  } else {
    plantList = getAllPlants(defaultPlants);
    query = param1;
  }

  if (!query || typeof query !== 'string' || !query.trim()) {
    return plantList;
  }

  const lowerQuery = query.trim().toLowerCase();

  return plantList.filter(plant => {
    if (!plant) return false;
    return (
      (plant.name && String(plant.name).toLowerCase().includes(lowerQuery)) ||
      (plant.category && String(plant.category).toLowerCase().includes(lowerQuery)) ||
      (plant.subcategory && String(plant.subcategory).toLowerCase().includes(lowerQuery)) ||
      (plant.shortDescription && String(plant.shortDescription).toLowerCase().includes(lowerQuery)) ||
      (plant.description && String(plant.description).toLowerCase().includes(lowerQuery)) ||
      (Array.isArray(plant.tags) && plant.tags.some(tag => tag && String(tag).toLowerCase().includes(lowerQuery)))
    );
  });
};

/**
 * Combined filter for plants by category, subcategory, season, and search query.
 * Accepts both signatures:
 * - filterPlants(plants, options)
 * - filterPlants(options)
 */
export const filterPlants = (param1, param2) => {
  let filters;
  let plantList;

  if (param2 !== undefined) {
    plantList = getAllPlants(param1);
    filters = param2 || {};
  } else {
    plantList = getAllPlants(defaultPlants);
    filters = param1 || {};
  }

  const { category, season, search, subcategory } = filters;
  let result = plantList;

  if (category && String(category).toLowerCase() !== 'all') {
    result = getPlantsByCategory(result, category);
  }

  if (subcategory && String(subcategory).toLowerCase() !== 'all') {
    const normSub = String(subcategory).trim().toLowerCase();
    result = result.filter(plant => plant?.subcategory && String(plant.subcategory).trim().toLowerCase() === normSub);
  }

  if (season && String(season).toLowerCase() !== 'all') {
    result = getPlantsBySeason(result, season);
  }

  if (search) {
    result = searchPlants(result, search);
  }

  return result;
};

/**
 * Retrieves a single plant by its unique identifier.
 * Accepts both signatures:
 * - getPlantById(id)
 * - getPlantById(plants, id)
 *
 * Safely handles string/number mismatch, casing differences, trimming,
 * and returns null if not found.
 */
export const getPlantById = (param1, param2) => {
  let targetId;
  let plantList;

  if (param2 !== undefined) {
    plantList = getAllPlants(param1);
    targetId = param2;
  } else {
    plantList = getAllPlants(defaultPlants);
    targetId = param1;
  }

  if (targetId === undefined || targetId === null) {
    return null;
  }

  const normalizedTargetId = String(targetId).trim().toLowerCase();

  return plantList.find(plant => {
    if (!plant || plant.id === undefined || plant.id === null) return false;
    return String(plant.id).trim().toLowerCase() === normalizedTargetId;
  }) || null;
};

/**
 * Helper to get related plants in the same category.
 * Excludes the current plant and limits to specified count.
 */
export const getRelatedPlants = (plantOrId, limit = 4) => {
  const currentPlant = typeof plantOrId === 'object' && plantOrId !== null
    ? plantOrId
    : getPlantById(plantOrId);

  if (!currentPlant || !currentPlant.category) return [];

  const categoryPlants = getPlantsByCategory(currentPlant.category);
  return categoryPlants
    .filter(p => p && p.id !== currentPlant.id)
    .slice(0, limit);
};
