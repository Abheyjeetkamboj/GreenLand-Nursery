/**
 * Dev Greenland Nursery — Plant Catalogue Data
 *
 * This is the single source of truth for all plants displayed on the website.
 * To add a new plant, simply add an object to this array.
 * The UI will automatically:
 *   - display the plant in the correct category
 *   - make it searchable and filterable
 *   - generate its detail view
 *   - include it in featured/seasonal sections when enabled
 *
 * Required fields: id, name, category, image
 * All other fields are optional but recommended for a complete listing.
 */

export const plants = [
  // ─── Indoor Plants ────────────────────────────────────────────
  {
    id: "money-plant",
    name: "Money Plant",
    category: "Indoor Plants",
    subcategory: null,
    season: "All Season",
    image: "/images/plants/money-plant.jpg",
    shortDescription:
      "A popular trailing vine that purifies indoor air and thrives with minimal care.",
    description:
      "Money Plant (Epipremnum aureum) is one of the most popular indoor plants in Indian households. Known for its heart-shaped leaves and trailing vines, it is believed to bring prosperity and good fortune. It grows well in water or soil and can tolerate low-light conditions, making it ideal for offices, living rooms, and bathrooms. It also helps purify indoor air by removing common toxins.",
    sunlight: "Low to Bright Indirect",
    watering: "Moderate",
    height: "6–10 ft (trailing)",
    careLevel: "Easy",
    floweringSeason: null,
    featured: true,
    tags: ["indoor", "air-purifier", "low-light", "beginner-friendly", "trailing"],
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    category: "Indoor Plants",
    subcategory: null,
    season: "All Season",
    image: "/images/plants/snake-plant.jpg",
    shortDescription:
      "Striking upright leaves that purify air and thrive on neglect.",
    description:
      "Snake Plant (Sansevieria trifasciata) features tall, rigid, sword-shaped leaves with distinctive green and yellow banding. It is one of the hardiest houseplants available, surviving in low light and requiring very infrequent watering. NASA studies have identified it as one of the best plants for improving indoor air quality, filtering formaldehyde, benzene, and other toxins even at night.",
    sunlight: "Low to Bright Indirect",
    watering: "Low",
    height: "2–4 ft",
    careLevel: "Easy",
    floweringSeason: null,
    featured: true,
    tags: ["indoor", "air-purifier", "low-light", "beginner-friendly", "drought-tolerant"],
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    category: "Indoor Plants",
    subcategory: null,
    season: "All Season",
    image: "/images/plants/peace-lily.jpg",
    shortDescription:
      "Elegant white blooms and glossy foliage that brighten any indoor space.",
    description:
      "Peace Lily (Spathiphyllum) is cherished for its elegant white spathe flowers and lush, dark green leaves. It is remarkably adaptable to low-light conditions and is an excellent air purifier. The plant signals when it needs water by slightly drooping its leaves, making it easy for beginners to care for. It blooms multiple times a year under the right conditions.",
    sunlight: "Low to Medium Indirect",
    watering: "Moderate",
    height: "1–3 ft",
    careLevel: "Easy",
    floweringSeason: "Spring, Summer",
    featured: false,
    tags: ["indoor", "flowering", "air-purifier", "low-light"],
  },
  {
    id: "areca-palm",
    name: "Areca Palm",
    category: "Indoor Plants",
    subcategory: null,
    season: "All Season",
    image: "/images/plants/areca-palm.jpg",
    shortDescription:
      "Graceful feathery fronds that add a tropical touch to interiors.",
    description:
      "Areca Palm (Dypsis lutescens) is a graceful palm with arching, feather-like fronds that can transform any room into a tropical retreat. It acts as a natural humidifier and is excellent at filtering indoor pollutants. This palm prefers bright, indirect light and regular watering, rewarding good care with lush, vibrant growth.",
    sunlight: "Bright Indirect",
    watering: "Regular",
    height: "4–7 ft",
    careLevel: "Medium",
    floweringSeason: null,
    featured: true,
    tags: ["indoor", "palm", "air-purifier", "tropical"],
  },
  {
    id: "jade-plant",
    name: "Jade Plant",
    category: "Indoor Plants",
    subcategory: null,
    season: "All Season",
    image: "/images/plants/jade-plant.jpg",
    shortDescription:
      "A beautiful succulent with thick, oval leaves symbolizing good luck.",
    description:
      "Jade Plant (Crassula ovata) is a popular succulent with thick, woody stems and oval, fleshy leaves. Often called the 'money tree' or 'lucky plant,' it is traditionally associated with prosperity. It thrives in bright light and well-draining soil, requiring very little water. With proper care, a jade plant can live for decades, growing into a miniature tree-like form.",
    sunlight: "Bright Direct to Indirect",
    watering: "Low",
    height: "1–3 ft",
    careLevel: "Easy",
    floweringSeason: "Winter",
    featured: false,
    tags: ["indoor", "succulent", "drought-tolerant", "beginner-friendly"],
  },

  // ─── Outdoor Plants ───────────────────────────────────────────
  {
    id: "bougainvillea",
    name: "Bougainvillea",
    category: "Outdoor Plants",
    subcategory: null,
    season: "Summer",
    image: "/images/plants/bougainvillea.jpg",
    shortDescription:
      "Vibrant, papery blooms that cascade in brilliant shades of pink, purple, and orange.",
    description:
      "Bougainvillea is a spectacular ornamental vine known for its brilliantly coloured papery bracts that surround tiny white flowers. It thrives in warm climates with full sun and is remarkably drought-tolerant once established. Available in shades ranging from magenta and purple to orange and white, it is perfect for covering walls, trellises, and fences, adding dramatic colour to any outdoor space.",
    sunlight: "Full Sun",
    watering: "Low to Moderate",
    height: "10–30 ft (vine)",
    careLevel: "Easy",
    floweringSeason: "Spring, Summer, Monsoon",
    featured: true,
    tags: ["outdoor", "flowering", "climber", "drought-tolerant", "colourful"],
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    category: "Outdoor Plants",
    subcategory: null,
    season: "Summer",
    image: "/images/plants/hibiscus.jpg",
    shortDescription:
      "Large, trumpet-shaped flowers in vivid colours that attract butterflies.",
    description:
      "Hibiscus (Hibiscus rosa-sinensis) produces large, showy, trumpet-shaped flowers in shades of red, pink, orange, yellow, and white. A staple of Indian gardens, it blooms profusely in warm weather and attracts butterflies and hummingbirds. The plant prefers full sun and regular watering. Hibiscus flowers are also used in traditional hair care and worship.",
    sunlight: "Full Sun",
    watering: "Regular",
    height: "4–8 ft",
    careLevel: "Medium",
    floweringSeason: "Spring, Summer, Monsoon",
    featured: false,
    tags: ["outdoor", "flowering", "tropical", "garden"],
  },
  {
    id: "mogra",
    name: "Mogra (Arabian Jasmine)",
    category: "Outdoor Plants",
    subcategory: null,
    season: "Summer",
    image: "/images/plants/mogra.jpg",
    shortDescription:
      "Intensely fragrant white flowers cherished for their soothing aroma.",
    description:
      "Mogra (Jasminum sambac), also known as Arabian Jasmine, is treasured across India for its intensely fragrant, small white blossoms. The flowers are used in garlands, perfumes, and traditional ceremonies. The plant is a compact shrub or vine that thrives in warm, sunny conditions with regular watering. Its enchanting fragrance is strongest in the evening hours.",
    sunlight: "Full Sun to Partial Shade",
    watering: "Regular",
    height: "3–6 ft",
    careLevel: "Medium",
    floweringSeason: "Summer, Monsoon",
    featured: true,
    tags: ["outdoor", "flowering", "fragrant", "garden", "traditional"],
  },
  {
    id: "tulsi",
    name: "Tulsi (Holy Basil)",
    category: "Outdoor Plants",
    subcategory: null,
    season: "All Season",
    image: "/images/plants/tulsi.jpg",
    shortDescription:
      "A sacred herb with medicinal properties, found in almost every Indian home.",
    description:
      "Tulsi (Ocimum tenuiflorum) holds a revered place in Indian culture and Ayurveda. This aromatic herb is known for its medicinal properties — the leaves are used in teas, home remedies, and cooking. It grows as a bushy plant with fragrant leaves and small purple or white flower spikes. Tulsi prefers warm conditions with plenty of sunlight and regular watering.",
    sunlight: "Full Sun",
    watering: "Regular",
    height: "1–2 ft",
    careLevel: "Easy",
    floweringSeason: "Monsoon, Autumn",
    featured: false,
    tags: ["outdoor", "medicinal", "herb", "traditional", "aromatic"],
  },
  {
    id: "curry-leaf",
    name: "Curry Leaf Plant",
    category: "Outdoor Plants",
    subcategory: null,
    season: "All Season",
    image: "/images/plants/curry-leaf.jpg",
    shortDescription:
      "Aromatic leaves essential to Indian cuisine, easy to grow in warm climates.",
    description:
      "The Curry Leaf Plant (Murraya koenigii) is an essential part of Indian kitchens, providing the aromatic leaves used in tempering and seasoning dishes across South and Western India. This small tree or large shrub has pinnate leaves with a distinctive pungent aroma. It thrives in warm, sunny conditions and well-drained soil. Regular pruning encourages bushy growth and more leaf production.",
    sunlight: "Full Sun",
    watering: "Moderate",
    height: "6–15 ft",
    careLevel: "Easy",
    floweringSeason: "Spring",
    featured: false,
    tags: ["outdoor", "herb", "culinary", "aromatic", "evergreen"],
  },

  // ─── Fruit Plants — Summer Fruits ─────────────────────────────
  {
    id: "mango",
    name: "Mango",
    category: "Fruit Plants",
    subcategory: "Summer Fruits",
    season: "Summer",
    image: "/images/plants/mango.jpg",
    shortDescription:
      "The king of fruits — a majestic tree bearing the most beloved summer treat.",
    description:
      "Mango (Mangifera indica) is rightfully called the King of Fruits in India. This majestic tropical tree produces sweet, juicy, aromatic fruits that are central to Indian cuisine, culture, and celebrations. Mango trees can grow very large and live for over a hundred years. They prefer warm climates with distinct dry and wet seasons. Grafted varieties produce fruit faster than seed-grown trees.",
    sunlight: "Full Sun",
    watering: "Moderate",
    height: "30–45 ft",
    careLevel: "Medium",
    floweringSeason: "Late Winter, Spring",
    featured: true,
    tags: ["fruit", "summer", "outdoor", "tropical", "tree"],
  },
  {
    id: "guava",
    name: "Guava",
    category: "Fruit Plants",
    subcategory: "Summer Fruits",
    season: "Summer",
    image: "/images/plants/guava.jpg",
    shortDescription:
      "A hardy tropical fruit tree that produces abundantly with minimal care.",
    description:
      "Guava (Psidium guajava) is a hardy tropical fruit tree widely grown across India. Known for its fragrant, nutritious fruits rich in Vitamin C, guava is enjoyed fresh, in juices, and in preserves. The tree adapts well to various soil types and climates, often producing fruit twice a year. Its beautiful bark peels in patches, revealing smooth green trunk beneath.",
    sunlight: "Full Sun",
    watering: "Moderate",
    height: "10–25 ft",
    careLevel: "Easy",
    floweringSeason: "Spring, Monsoon",
    featured: true,
    tags: ["fruit", "summer", "outdoor", "tropical", "tree"],
  },
  {
    id: "lemon",
    name: "Lemon",
    category: "Fruit Plants",
    subcategory: "Summer Fruits",
    season: "All Season",
    image: "/images/plants/lemon.jpg",
    shortDescription:
      "A versatile citrus tree that provides fresh lemons year-round.",
    description:
      "Lemon (Citrus limon) is one of the most useful fruit trees for home gardens. This compact evergreen tree produces fragrant white blossoms followed by bright yellow, tangy fruits used universally in cooking, beverages, and remedies. Lemon trees can fruit throughout the year in warm climates and adapt well to container growing, making them suitable for terraces and balconies.",
    sunlight: "Full Sun",
    watering: "Regular",
    height: "8–15 ft",
    careLevel: "Medium",
    floweringSeason: "Spring, Autumn",
    featured: false,
    tags: ["fruit", "summer", "outdoor", "citrus", "container-friendly"],
  },
  {
    id: "papaya",
    name: "Papaya",
    category: "Fruit Plants",
    subcategory: "Summer Fruits",
    season: "Summer",
    image: "/images/plants/papaya.jpg",
    shortDescription:
      "A fast-growing tropical plant that fruits within the first year.",
    description:
      "Papaya (Carica papaya) is a fast-growing tropical plant that can start producing fruit within 6–9 months of planting. Its large, palmate leaves give it a distinctive tropical appearance. The sweet, orange-fleshed fruits are rich in vitamins A and C, papain enzyme, and antioxidants. Papaya prefers warm conditions and does not tolerate frost.",
    sunlight: "Full Sun",
    watering: "Regular",
    height: "10–15 ft",
    careLevel: "Easy",
    floweringSeason: "Year-round in warm climates",
    featured: false,
    tags: ["fruit", "summer", "outdoor", "tropical", "fast-growing"],
  },

  // ─── Fruit Plants — Winter Fruits ──────────────────────────────
  {
    id: "pomegranate",
    name: "Pomegranate",
    category: "Fruit Plants",
    subcategory: "Winter Fruits",
    season: "Winter",
    image: "/images/plants/pomegranate.jpg",
    shortDescription:
      "Ruby-red seeds packed with antioxidants from an ancient, ornamental tree.",
    description:
      "Pomegranate (Punica granatum) is an ancient fruit tree known for its jewel-like, ruby-red seeds called arils. The tree is both ornamental and productive, featuring attractive orange-red flowers and distinctive rounded fruits. Pomegranates are rich in antioxidants and are highly valued in Indian cuisine and Ayurveda. The tree is drought-tolerant and thrives in hot, dry climates.",
    sunlight: "Full Sun",
    watering: "Low to Moderate",
    height: "10–20 ft",
    careLevel: "Easy",
    floweringSeason: "Spring, Summer",
    featured: true,
    tags: ["fruit", "winter", "outdoor", "drought-tolerant", "ornamental"],
  },
  {
    id: "amla",
    name: "Amla (Indian Gooseberry)",
    category: "Fruit Plants",
    subcategory: "Winter Fruits",
    season: "Winter",
    image: "/images/plants/amla.jpg",
    shortDescription:
      "A Vitamin C powerhouse revered in Ayurveda for its health benefits.",
    description:
      "Amla (Phyllanthus emblica), or Indian Gooseberry, is one of the most important medicinal plants in Ayurveda. The small, translucent green fruits are extraordinarily rich in Vitamin C and are used fresh, dried, and in preparations like amla candy, pickles, juices, and hair oils. The deciduous tree has feathery foliage and can grow in a variety of soil conditions.",
    sunlight: "Full Sun",
    watering: "Moderate",
    height: "20–30 ft",
    careLevel: "Easy",
    floweringSeason: "Spring",
    featured: false,
    tags: ["fruit", "winter", "outdoor", "medicinal", "ayurvedic", "tree"],
  },

  // ─── Flowering Plants ──────────────────────────────────────────
  {
    id: "rose",
    name: "Rose",
    category: "Flowering Plants",
    subcategory: null,
    season: "Winter",
    image: "/images/plants/rose.jpg",
    shortDescription:
      "The timeless queen of flowers, available in countless colours and fragrances.",
    description:
      "Rose (Rosa) is universally cherished as the queen of flowers. Available in an astonishing range of colours, sizes, and fragrances — from miniature bushes to climbing varieties — roses have been cultivated for centuries. In Indian climates, roses bloom best during the cooler months from October to March. They require regular pruning, feeding, and attention to pest management for the best blooms.",
    sunlight: "Full Sun",
    watering: "Regular",
    height: "2–6 ft",
    careLevel: "Medium",
    floweringSeason: "Winter, Spring",
    featured: true,
    tags: ["flowering", "outdoor", "fragrant", "garden", "classic"],
  },
  {
    id: "marigold",
    name: "Marigold",
    category: "Flowering Plants",
    subcategory: null,
    season: "Winter",
    image: "/images/plants/marigold.jpg",
    shortDescription:
      "Cheerful golden blooms that are a staple of Indian festivals and gardens.",
    description:
      "Marigold (Tagetes) produces cheerful, densely-petaled flowers in shades of golden yellow, orange, and deep red. An integral part of Indian festivals, weddings, and religious ceremonies, marigolds are also valued for their pest-repelling properties in companion planting. They are easy to grow from seed, bloom quickly, and continue flowering profusely through the cool season.",
    sunlight: "Full Sun",
    watering: "Moderate",
    height: "1–3 ft",
    careLevel: "Easy",
    floweringSeason: "Autumn, Winter",
    featured: false,
    tags: ["flowering", "outdoor", "seasonal", "festival", "beginner-friendly"],
  },
  {
    id: "champa",
    name: "Champa (Plumeria)",
    category: "Flowering Plants",
    subcategory: null,
    season: "Summer",
    image: "/images/plants/champa.jpg",
    shortDescription:
      "Exotic, waxy flowers with an unforgettable tropical fragrance.",
    description:
      "Champa (Plumeria) produces stunning, waxy flowers with an intoxicating sweet fragrance that defines tropical gardens. The flowers come in shades of white, yellow, pink, and red, often with beautiful gradients. This deciduous tree drops its leaves in winter but rewards with magnificent blooms in the warm months. It is low-maintenance and can be grown from cuttings.",
    sunlight: "Full Sun",
    watering: "Low to Moderate",
    height: "15–25 ft",
    careLevel: "Easy",
    floweringSeason: "Summer, Monsoon",
    featured: false,
    tags: ["flowering", "outdoor", "fragrant", "tropical", "tree"],
  },
  {
    id: "rajnigandha",
    name: "Rajnigandha (Tuberose)",
    category: "Flowering Plants",
    subcategory: null,
    season: "Monsoon",
    image: "/images/plants/rajnigandha.jpg",
    shortDescription:
      "Tall spikes of intensely fragrant white flowers that perfume summer evenings.",
    description:
      "Rajnigandha (Polianthes tuberosa), known as Tuberose, produces tall spikes of waxy, pure white flowers with one of the most intense and captivating fragrances in the plant world. Widely grown in India for garlands, perfumery, and religious offerings, tuberose blooms during the warm and monsoon months. It grows from bulbs and prefers rich, well-drained soil with regular watering.",
    sunlight: "Full Sun to Partial Shade",
    watering: "Regular",
    height: "2–3 ft",
    careLevel: "Medium",
    floweringSeason: "Summer, Monsoon",
    featured: false,
    tags: ["flowering", "outdoor", "fragrant", "bulb", "garden"],
  },
];

/**
 * Category configuration for visual theming.
 * Each category can have a distinct visual identity while maintaining brand consistency.
 */
export const categoryConfig = {
  "Indoor Plants": {
    tagline: "Transform Your Spaces",
    description:
      "Plants that thrive indoors, purify your air, and bring life to every corner of your home and office.",
    gradient: "from-emerald-50 to-teal-50",
    accentColor: "emerald",
    icon: "Home",
  },
  "Outdoor Plants": {
    tagline: "Let Your Garden Flourish",
    description:
      "Hardy, beautiful plants for balconies, terraces, gardens, and open spaces that love the sun and fresh air.",
    gradient: "from-green-50 to-lime-50",
    accentColor: "green",
    icon: "Sun",
  },
  "Fruit Plants": {
    tagline: "Grow Your Own Harvest",
    description:
      "Fruit-bearing trees and plants that bring the joy of homegrown, fresh produce to your garden.",
    gradient: "from-amber-50 to-orange-50",
    accentColor: "amber",
    icon: "Apple",
  },
  "Flowering Plants": {
    tagline: "Colours That Bloom",
    description:
      "Vibrant flowering plants that add colour, fragrance, and beauty to your outdoor spaces.",
    gradient: "from-pink-50 to-rose-50",
    accentColor: "pink",
    icon: "Flower2",
  },
};

/**
 * Season configuration for the seasonal section.
 */
export const seasonConfig = {
  Summer: {
    icon: "Sun",
    color: "amber",
    description: "Heat-loving plants that thrive in warm sunshine.",
  },
  Winter: {
    icon: "Snowflake",
    color: "blue",
    description: "Cool-season favourites that bloom when temperatures drop.",
  },
  Monsoon: {
    icon: "CloudRain",
    color: "teal",
    description: "Rain-loving plants that flourish during the monsoon.",
  },
  "All Season": {
    icon: "Leaf",
    color: "green",
    description: "Resilient plants that look beautiful throughout the year.",
  },
};
