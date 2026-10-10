/**
 * Dev Greenland Nursery — Accessories & Garden Decor Catalogue
 * 
 * Source of truth for all gardening accessories, designer planters,
 * plant stands, and water fountains available at the nursery.
 */

export const accessoryCategories = {
  "Decorative Planters & Pots": {
    name: "Decorative Planters & Pots",
    tagline: "Handcrafted Planters for Every Aesthetic",
    description: "Explore our exclusive AVA CRAFT collection, woven wicker baskets, ceramic animal pots, and heavy-duty terrace containers.",
    icon: "Flower2",
    count: 27
  },
  "Garden Water Fountains": {
    name: "Garden Water Fountains",
    tagline: "Tranquil Water Features",
    description: "Serene carved stone, bamboo cascade, and meditative Buddha fountains to bring soothing sounds of nature to your garden.",
    icon: "Droplets",
    count: 6
  },
  "Plant Stands & Racks": {
    name: "Plant Stands & Racks",
    tagline: "Elevate Your Greenery",
    description: "Durable wrought iron multi-tier stands, railing hangers, and vintage decorative bicycle carts.",
    icon: "Layers",
    count: 4
  },
  "Coir & Hanging Decor": {
    name: "Coir & Hanging Decor",
    tagline: "Eco-Friendly Hanging Garden Solutions",
    description: "Biodegradable coco coir bird nests, hanging planters, and natural fiber accents.",
    icon: "Feather",
    count: 1
  },
  "Gardening Tools": {
    name: "Gardening Tools",
    tagline: "Precision Gardening Instruments",
    description: "Quality pruning shears, hand trowels, weeders, and nursery tools for maintaining healthy plants.",
    icon: "Wrench",
    count: 0
  },
  "Watering Cans & Sprayers": {
    name: "Watering Cans & Sprayers",
    tagline: "Hydration & Mist Solutions",
    description: "Ergonomic watering cans, brass pressure sprayers, and gentle roses for container plants.",
    icon: "Droplets",
    count: 0
  },
  "Potting Soil & Media": {
    name: "Potting Soil & Growing Media",
    tagline: "Nutrient-Rich Growing Media",
    description: "Specialized potting mixes, perlite, vermiculite, and washed coco peat blends prepared for root health.",
    icon: "Layers",
    count: 0
  },
  "Fertilizers & Plant Care": {
    name: "Fertilizers & Plant Care",
    tagline: "Organic Nutrition & Protection",
    description: "Organic plant foods, seaweed extracts, cold-pressed neem oils, and micronutrient enhancers.",
    icon: "Sparkles",
    count: 0
  },
  "Seed Trays & Supplies": {
    name: "Seed Trays & Supplies",
    tagline: "Propagation & Germination Supplies",
    description: "Heavy-duty seedling nursery trays, humidity domes, and propagation essentials.",
    icon: "Layers",
    count: 0
  }
};

export const accessories = [
  // ─── Garden Water Fountains ──────────────────────────────────────────────
  {
    id: "tiered-stone-water-fountain",
    name: "Tiered Natural Stone Water Fountain",
    category: "Garden Water Fountains",
    image: "/images/accessories/processed/tiered-stone-water-fountain.webp",
    shortDescription: "A multi-tier carved grey rock waterfall fountain that creates soothing water cascades.",
    description: "Crafted from durable weatherproof composite and natural slate textures, this multi-tier waterfall fountain provides a tranquil auditory backdrop for gardens, patios, and shaded courtyards. Equipped with a recirculating pump system.",
    material: "Carved Stone Composite",
    dimensions: "Approx. 4.5 ft height",
    usage: "Outdoor Garden, Patio, Lawn",
    featured: true,
    inStock: true,
    tags: ["fountain", "stone", "water-feature", "garden-decor"]
  },
  {
    id: "buddha-lotus-water-fountain",
    name: "Serene Buddha Lotus Water Fountain",
    category: "Garden Water Fountains",
    image: "/images/accessories/processed/buddha-lotus-water-fountain.webp",
    shortDescription: "A majestic Buddha seated upon a carved lotus pedestal with gentle water cascades.",
    description: "An impressive spiritual garden centerpiece featuring a serene Buddha statue atop an ornate lotus bowl pedestal with gentle trickling streams. Ideal for creating a calm zen corner in your home garden.",
    material: "Reinforced Mineral Resin & Stone",
    dimensions: "Approx. 5 ft height",
    usage: "Garden Entrance, Courtyard, Temple Garden",
    featured: true,
    inStock: true,
    tags: ["fountain", "buddha", "zen", "lotus", "garden-feature"]
  },
  {
    id: "buddha-waterfall-wall-fountain",
    name: "Golden Buddha Waterfall Wall Fountain",
    category: "Garden Water Fountains",
    image: "/images/accessories/processed/buddha-waterfall-wall-fountain.webp",
    shortDescription: "Rock-textured meditation fountain with golden Buddha and multi-tier slate bowls.",
    description: "Combines a golden seated Buddha statue with an illuminated stone-slab waterfall. Water flows harmoniously through carved slate cups into a quiet lower basin.",
    material: "Polyresin & Weatherproof Slate Finish",
    dimensions: "Approx. 4 ft height",
    usage: "Indoor Foyer, Covered Balcony, Veranda",
    featured: false,
    inStock: true,
    tags: ["fountain", "buddha", "gold", "waterfall"]
  },
  {
    id: "bamboo-cascade-fountain",
    name: "Bamboo Cascade Pot Fountain",
    category: "Garden Water Fountains",
    image: "/images/accessories/processed/bamboo-cascade-fountain.webp",
    shortDescription: "Vibrant green textured bamboo water fountain with multi-tier pouring pots.",
    description: "A naturalistic garden water feature designed with stacked pouring pots and bamboo stalk motifs in an earthy emerald glaze.",
    material: "Glazed Ceramic / Resin",
    dimensions: "Approx. 3.5 ft height",
    usage: "Balcony, Terrace, Garden Patio",
    featured: false,
    inStock: true,
    tags: ["fountain", "bamboo", "cascade", "ceramic"]
  },
  {
    id: "ava-craft-tree-trunk-fountain",
    name: "AVA CRAFT Tree Trunk Waterfall Fountain",
    category: "Garden Water Fountains",
    image: "/images/accessories/processed/ava-craft-tree-trunk-fountain.webp",
    shortDescription: "Sculpted tree trunk waterfall fountain mounted on an ornate white metal garden stand.",
    description: "An exclusive artisan creation from the AVA CRAFT line. Features a realistic hollow log cascade perched securely upon a custom wrought-iron plant stand.",
    material: "AVA CRAFT Engineered Stone & Metal",
    dimensions: "Approx. 3.8 ft total height",
    usage: "Garden Corner, Balcony Display",
    featured: true,
    inStock: true,
    tags: ["fountain", "tree-trunk", "ava-craft", "artisan"]
  },

  // ─── Decorative Planters & Pots ──────────────────────────────────────────
  {
    id: "ava-craft-rustic-red-fluted",
    name: "AVA CRAFT Rustic Red Fluted Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-rustic-red-fluted.webp",
    shortDescription: "Hand-textured vertical fluted artisan planter in distressed rust-red and charcoal finish.",
    description: "Part of the signature AVA CRAFT outdoor collection. Heavy-duty, frost-resistant, and UV-stable with sculpted vertical ridges and contrasting charcoal wash.",
    material: "Artisan Fiber-Stone",
    dimensions: "14\" dia x 16\" height",
    usage: "Indoor & Outdoor",
    featured: true,
    inStock: true,
    tags: ["planter", "ava-craft", "fluted", "rustic", "terracotta"]
  },
  {
    id: "ava-craft-vintage-stone-cylinder",
    name: "AVA CRAFT Vintage Travertine Stone Cylinder Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-vintage-stone-cylinder.webp",
    shortDescription: "Carved cylindrical planter featuring natural travertine stone texture with rustic aged patina.",
    description: "Evokes ancient Mediterranean stone masonry. Perfect for highlighting specimen topiary bushes, ficus trees, or lush flowering roses.",
    material: "Textured Mineral Stone",
    dimensions: "15\" dia x 18\" height",
    usage: "Patios, Balconies, Entrances",
    featured: true,
    inStock: true,
    tags: ["planter", "stone", "vintage", "ava-craft"]
  },
  {
    id: "ava-craft-sun-face-stone-planter",
    name: "AVA CRAFT Sun Face Tribal Stone Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-sun-face-stone-planter.webp",
    shortDescription: "Handcrafted stone-finish planter with an embossed radiant sun medallion and textured relief.",
    description: "A distinctive artistic planter featuring a sun relief face carved into textured grey stone. Brings an earthy, bohemian character to any plant collection.",
    material: "Carved Composite Stone",
    dimensions: "14\" dia x 18\" height",
    usage: "Garden Showcase, Living Room",
    featured: true,
    inStock: true,
    tags: ["planter", "sun-face", "tribal", "ava-craft"]
  },
  {
    id: "ava-craft-brick-trough-planter",
    name: "AVA CRAFT Rectangular Brick-Red Trough Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-brick-trough-planter.webp",
    shortDescription: "Generous rectangular trough planter in warm terracotta-brick wash, ideal for boundary hedging.",
    description: "Large capacity rectangular planter box designed for multi-plant arrangements, perennial borders, or privacy hedges on terraces and balconies.",
    material: "Reinforced Fiber-Clay",
    dimensions: "28\" length x 12\" width x 16\" height",
    usage: "Terrace Boundary, Balcony Railing, Hedging",
    featured: true,
    inStock: true,
    tags: ["trough", "rectangular", "planter", "ava-craft"]
  },
  {
    id: "ava-craft-honeycomb-lava-planter",
    name: "AVA CRAFT Honeycomb Lava Textured Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-honeycomb-lava-planter.webp",
    shortDescription: "Dramatic tall sculptural planter with honeycomb lava stone inlays and earthy brown glaze.",
    description: "Features deep organic honeycomb crevices reminiscent of volcanic lava rock, glazed in warm amber and scorched charcoal tones.",
    material: "Volcanic Texture Composite",
    dimensions: "16\" dia x 24\" height",
    usage: "Patios, Gate Pillars, Large Foliage",
    featured: false,
    inStock: true,
    tags: ["planter", "honeycomb", "lava-stone", "tall-planter"]
  },
  {
    id: "ava-craft-cobblestone-tall-planter",
    name: "AVA CRAFT Cobblestone Rock Tall Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-cobblestone-tall-planter.webp",
    shortDescription: "Artisan cylindrical planter finished in rounded river rock cobblestone mosaic texture.",
    description: "Sculpted to replicate natural tumbled cobblestone masonry with rich tactile relief and weather-sealed finish.",
    material: "Engineered River-Stone Composite",
    dimensions: "15\" dia x 22\" height",
    usage: "Garden Pathways, Verandas",
    featured: false,
    inStock: true,
    tags: ["planter", "cobblestone", "rock", "ava-craft"]
  },
  {
    id: "ava-craft-wooden-barrel-planter",
    name: "AVA CRAFT Wooden Barrel with Metal Bands",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-wooden-barrel-planter.webp",
    shortDescription: "Rustic wooden barrel planter detailed with faux metal rivets and golden accent straps.",
    description: "Captures the timeless warmth of vintage wine barrels with deep wood graining, golden brass straps, and simulated rivets, crafted from rot-proof composite.",
    material: "Rot-Proof Timber Composite",
    dimensions: "16\" dia x 16\" height",
    usage: "Indoor & Outdoor",
    featured: true,
    inStock: true,
    tags: ["barrel", "wood-grain", "planter", "rustic"]
  },
  {
    id: "ava-craft-tree-trunk-carved",
    name: "AVA CRAFT Carved Tree Trunk Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-tree-trunk-carved.webp",
    shortDescription: "Sculpted hollow tree stump planter with realistic fissures, knots, and warm amber wood tones.",
    description: "A showstopping naturalistic planter mimicking an ancient weathered tree trunk with realistic bark bark fissures, bark peeling, and warm timber tones.",
    material: "Sculpted Stone Composite",
    dimensions: "16\" dia x 17\" height",
    usage: "Garden Bed, Patio, Forest Theme",
    featured: false,
    inStock: true,
    tags: ["tree-trunk", "stump", "woodland", "planter"]
  },
  {
    id: "white-tiger-ceramic-planter",
    name: "Artisan White Tiger Ceramic Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/white-tiger-ceramic-planter.webp",
    shortDescription: "Hand-painted ceramic novelty tiger planter, perfect for succulents and small indoor plants.",
    description: "Whimsical glazed ceramic novelty planter sculpted in the shape of a reclining Bengal tiger. A charming accent piece for study desks, balconies, and indoor shelves.",
    material: "Glazed Ceramic",
    dimensions: "10\" length x 5\" width x 6\" height",
    usage: "Desk, Tabletop, Window Sill",
    featured: true,
    inStock: true,
    tags: ["novelty", "tiger", "animal-pot", "ceramic", "succulent-pot"]
  },
  {
    id: "swan-ceramic-planter",
    name: "Graceful White Swan Ceramic Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/swan-ceramic-planter.webp",
    shortDescription: "Artisanal white swan ceramic pot with textured feathers for balconies, tables, and patios.",
    description: "An elegant glazed white swan planter featuring carved wing feathers and long neck, ideal for cascading money plants, ferns, or flowering petunias.",
    material: "High-Gloss Glazed Ceramic",
    dimensions: "12\" length x 6\" width x 10\" height",
    usage: "Dining Table, Balcony Shelf, Garden Table",
    featured: true,
    inStock: true,
    tags: ["swan", "ceramic", "novelty", "tabletop"]
  },
  {
    id: "hanging-wicker-planter-basket",
    name: "Hanging Wicker Planter Basket with Heavy-Duty Chains",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/hanging-wicker-planter-basket.webp",
    shortDescription: "Woven weather-resistant wicker hanging basket with triple steel chains and inner protective liner.",
    description: "Premium handwoven resin-wicker hanging bowl designed for trailing pothos, petunias, and ferns. Comes complete with black rust-proof triple hanging chains and S-hook.",
    material: "All-Weather Resin Wicker & Powder-Coated Steel",
    dimensions: "14\" dia x 7\" depth (24\" hang length)",
    usage: "Balcony Ceiling, Porch, Garden Pergola",
    featured: true,
    inStock: true,
    tags: ["hanging-basket", "wicker", "rattan", "balcony"]
  },
  {
    id: "dark-grey-rattan-planter-bowl",
    name: "Slate Grey Rattan Flared Planter Bowl",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/dark-grey-rattan-planter-bowl.webp",
    shortDescription: "Sophisticated flared rattan planter in slate-grey finish with matching drip saucer tray.",
    description: "Wide flared woven bowl in elegant slate-grey with an integrated water retention saucer. Generous root room for flowering annuals or compact shrub topiaries.",
    material: "All-Weather Synthetic Rattan",
    dimensions: "16\" dia x 12\" height",
    usage: "Patio Table, Terrace, Veranda",
    featured: false,
    inStock: true,
    tags: ["rattan", "wicker", "bowl-planter", "grey"]
  },
  {
    id: "square-tapered-wicker-planter",
    name: "Square Tapered Wicker Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/square-tapered-wicker-planter.webp",
    shortDescription: "Geometric square tapered wicker planter pot in stone-grey weave with drainage saucer.",
    description: "Modern architectural square planter crafted in durable grey wicker weave. Suitable for both contemporary office spaces and home balconies.",
    material: "Synthetic Wicker Weave",
    dimensions: "12\" x 12\" top x 14\" height",
    usage: "Indoor Living, Office, Balcony Corners",
    featured: false,
    inStock: true,
    tags: ["square-planter", "wicker", "modern", "grey"]
  },

  // ─── Plant Stands & Racks ────────────────────────────────────────────────
  {
    id: "vintage-bicycle-planter-cart",
    name: "Vintage Wrought Iron Bicycle Planter Cart",
    category: "Plant Stands & Racks",
    image: "/images/accessories/processed/vintage-bicycle-planter-cart.webp",
    shortDescription: "Whimsical white metal bicycle planter with front and rear baskets for multiple potted plants.",
    description: "A delightful Parisian-style decorative bicycle stand fabricated from durable powder-coated wrought iron. Features dual woven metal baskets for holding flowering potted plants.",
    material: "Rust-Resistant Powder-Coated Wrought Iron",
    dimensions: "32\" length x 14\" width x 24\" height",
    usage: "Garden Lawn, Balcony, Living Room, Porch",
    featured: true,
    inStock: true,
    tags: ["bicycle-stand", "plant-stand", "wrought-iron", "vintage", "decorative"]
  },
  {
    id: "wrought-iron-multitier-stand",
    name: "Wrought Iron Multi-Tier Plant Display Stand",
    category: "Plant Stands & Racks",
    image: "/images/accessories/processed/wrought-iron-multitier-stand.webp",
    shortDescription: "Curved white wrought-iron 4-tier plant display stand for balconies and living rooms.",
    description: "A space-saving vertical stair-step plant stand with four circular mesh platforms and decorative leaf scrolls. Allows multiple plants to receive optimal sunlight without crowding.",
    material: "Heavy-Duty Powder-Coated Steel",
    dimensions: "28\" width x 16\" depth x 36\" height",
    usage: "Balcony Corners, Indoor Sunrooms, Patios",
    featured: true,
    inStock: true,
    tags: ["multitier-stand", "plant-rack", "wrought-iron", "vertical-garden"]
  },
  {
    id: "balcony-railing-planter-stands",
    name: "Balcony Railing Hanger & Stand Set",
    category: "Plant Stands & Racks",
    image: "/images/accessories/processed/balcony-railing-planter-stands.webp",
    shortDescription: "Collection of metal railing hooks, step stands, and colorful planter pots for urban balconies.",
    description: "Versatile modular metal plant stand and railing hanger solutions designed for maximizing green space on compact apartment balconies.",
    material: "Galvanized Coated Metal",
    dimensions: "Various configurations available in-store",
    usage: "Apartment Railings, Compact Balconies",
    featured: false,
    inStock: true,
    tags: ["railing-stand", "balcony-rack", "metal-hangers"]
  },

  // ─── Coir & Hanging Decor ────────────────────────────────────────────────
  {
    id: "coco-coir-hanging-nest",
    name: "Natural Coco Coir Hanging Planter Nest",
    category: "Coir & Hanging Decor",
    image: "/images/accessories/processed/coco-coir-hanging-nest.webp",
    shortDescription: "Biodegradable eco-friendly coconut fiber hanging nest planter with dual access holes and jute ropes.",
    description: "100% natural, biodegradable coconut coir nest handcrafted for birds or creative air-plant and succulent displays. Suspended with sturdy eco-friendly jute ropes.",
    material: "Organic Compressed Coconut Coir & Jute",
    dimensions: "18\" length x 7\" diameter",
    usage: "Trees, Balcony Ceiling, Pergola Hangers",
    featured: true,
    inStock: true,
    tags: ["coir", "nest", "hanging-decor", "eco-friendly", "natural"]
  },

  // ─── Additional Genuine Nursery Fountains & Planters ─────────────────────────
  {
    id: "green-slate-cascade-fountain",
    name: "Green Slate Tiered Cascade Fountain",
    category: "Garden Water Fountains",
    image: "/images/accessories/processed/green-slate-cascade-fountain.webp",
    alt: "Green Slate Tiered Cascade Fountain — Dev Greenland Nursery",
    shortDescription: "Textured natural green slate waterfall fountain with illuminated tiers and recirculating pump.",
    description: "Handcrafted from durable mineral composite with real green slate stone textures, creating a calming, multi-tier water soundscape for gardens and verandas.",
    material: "Natural Green Slate & Weatherproof Resin",
    dimensions: "Approx. 4 ft height",
    usage: "Garden Patio, Shaded Courtyard, Living Room",
    featured: false,
    inStock: true,
    tags: ["fountain", "green-slate", "water-cascade", "outdoor-fountain"]
  },
  {
    id: "ava-craft-brick-stone-patchwork",
    name: "AVA CRAFT Patchwork Stone & Brick Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-brick-stone-patchwork.webp",
    alt: "AVA CRAFT Patchwork Stone & Brick Planter — Dev Greenland Nursery",
    shortDescription: "Hand-sculpted rustic planter combining exposed brickwork textures with natural stone blocks.",
    description: "Exclusive AVA CRAFT artisanal planter featuring realistic textured stone and terracotta brick detailing. Built with heavy-duty frost-proof composite for terrace and patio gardens.",
    material: "Textured Mineral Composite",
    dimensions: "14\" dia x 14\" height",
    usage: "Terrace Garden, Entryway, Patio",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "brick", "stone", "terrace"]
  },
  {
    id: "ava-craft-cracked-rock-bark-planter",
    name: "AVA CRAFT Cracked Rock & Bark Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-cracked-rock-bark-planter.webp",
    alt: "AVA CRAFT Cracked Rock & Bark Planter — Dev Greenland Nursery",
    shortDescription: "Dramatic geological texture planter with cracked granite faces and fossilized bark reliefs.",
    description: "Artisanal garden pot showcasing naturalistic fault-line fractures and rough-hewn stone grain. Provides superior thermal insulation for plant root balls.",
    material: "Heavy-Duty Cast Mineral",
    dimensions: "15\" dia x 15\" height",
    usage: "Garden Lawn, Balcony, Living Room Corner",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "granite", "rock-texture"]
  },
  {
    id: "ava-craft-cut-log-spiral-planter",
    name: "AVA CRAFT Cut-Log Spiral Tree Trunk Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-cut-log-spiral-planter.webp",
    alt: "AVA CRAFT Cut-Log Spiral Tree Trunk Planter — Dev Greenland Nursery",
    shortDescription: "Spiral tree trunk planter with detailed growth rings, rugged bark exterior, and drainage opening.",
    description: "Replicates a weathered ancient hardwood log with visible radial growth rings and deep wood grain. Weatherproof and ideal for bonsai, ferns, and trailing pothos.",
    material: "Poly-Fiber & Crushed Stone",
    dimensions: "14\" dia x 12\" height",
    usage: "Bonsai Display, Balcony, Garden Corner",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "wood-grain", "log", "bonsai-pot"]
  },
  {
    id: "ava-craft-grey-cobblestone-planter",
    name: "AVA CRAFT Grey Cobblestone Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-grey-cobblestone-planter.webp",
    alt: "AVA CRAFT Grey Cobblestone Planter — Dev Greenland Nursery",
    shortDescription: "Old-world masonry cobblestone circular planter pot with weathered mortar grooves.",
    description: "Captures the architectural charm of ancient European cobblestone streets. Finished in timeless stone grey with pre-drilled bottom drainage.",
    material: "Engineered Weatherproof Cast Stone",
    dimensions: "16\" dia x 14\" height",
    usage: "Garden Pathway, Patio, Courtyard",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "cobblestone", "stone-pot"]
  },
  {
    id: "ava-craft-grey-stone-block-planter",
    name: "AVA CRAFT Ashlar Grey Stone Block Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-grey-stone-block-planter.webp",
    alt: "AVA CRAFT Ashlar Grey Stone Block Planter — Dev Greenland Nursery",
    shortDescription: "Geometric ashlar cut stone planter with textured chisel marks and modern silhouette.",
    description: "A clean architectural planter built with clean square lines and rough-chiseled block faces. Ideal for architectural statement plants like Ficus and Palms.",
    material: "Cast Stone Composite",
    dimensions: "15\" x 15\" x 16\" height",
    usage: "Office Entrance, Modern Living Room, Porch",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "ashlar", "modern-planter"]
  },
  {
    id: "ava-craft-petrified-wood-planter",
    name: "AVA CRAFT Petrified Wood Mineral Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-petrified-wood-planter.webp",
    alt: "AVA CRAFT Petrified Wood Mineral Planter — Dev Greenland Nursery",
    shortDescription: "Fossilized wood-grain planter finished with amber mineral luster and rich earthy bark tones.",
    description: "Expertly modeled after prehistoric petrified wood with intricate grain patterns and naturalistic bark contours. Resists UV fading and harsh outdoor heat.",
    material: "Resin-Bonded Mineral Aggregate",
    dimensions: "16\" dia x 15\" height",
    usage: "Patio, Indoor Foyer, Terrace Garden",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "petrified-wood", "fossil-stone"]
  },
  {
    id: "ava-craft-red-brick-planter",
    name: "AVA CRAFT Heritage Red Brick Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-red-brick-planter.webp",
    alt: "AVA CRAFT Heritage Red Brick Planter — Dev Greenland Nursery",
    shortDescription: "Traditional terracotta red brick mortar planter with weathered vintage finish.",
    description: "Classic exposed brick masonry look in a lightweight, high-durability pot. Provides a warm rustic atmosphere for garden borders and flowering plants.",
    material: "Cast Mineral Composite",
    dimensions: "14\" dia x 14\" height",
    usage: "Garden Borders, Patios, Balconies",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "red-brick", "rustic"]
  },
  {
    id: "ava-craft-ribbed-bark-planter",
    name: "AVA CRAFT Ribbed Pine Bark Cylinder",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-ribbed-bark-planter.webp",
    alt: "AVA CRAFT Ribbed Pine Bark Cylinder — Dev Greenland Nursery",
    shortDescription: "Vertical grooved pine bark cylinder pot featuring tactile woodland relief textures.",
    description: "Emulates deeply furrowed evergreen bark with vertical striations and natural earthy hues. Perfect for ornamental foliage plants and palms.",
    material: "Cast Mineral & Fiber",
    dimensions: "14\" dia x 16\" height",
    usage: "Balcony, Patio, Living Room",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "bark-relief", "pine-texture"]
  },
  {
    id: "ava-craft-swirled-tree-bark-planter",
    name: "AVA CRAFT Swirled Olive Bark Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-swirled-tree-bark-planter.webp",
    alt: "AVA CRAFT Swirled Olive Bark Planter — Dev Greenland Nursery",
    shortDescription: "Artistic gnarled trunk planter with organic swirls and weathered hollow accents.",
    description: "A showpiece planter capturing the ancient, twisted beauty of aged olive trunks. Enhances desert plants, flowering bougainvillea, and cacti.",
    material: "Reinforced Mineral Composite",
    dimensions: "16\" dia x 15\" height",
    usage: "Focal Point Display, Terrace, Front Garden",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "olive-trunk", "sculptural"]
  },
  {
    id: "ava-craft-wine-cask-planter",
    name: "AVA CRAFT Rustic Wine Cask Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/ava-craft-wine-cask-planter.webp",
    alt: "AVA CRAFT Rustic Wine Cask Planter — Dev Greenland Nursery",
    shortDescription: "Vintage aged oak barrel cask pot with dark metal band hoops and authentic wood grain.",
    description: "Authentic rustic wine barrel design with weathered wood planks and riveted iron-look banding. Does not rot or warp under moisture.",
    material: "Weatherproof Polymer & Mineral Composite",
    dimensions: "16\" dia x 14\" height",
    usage: "Garden Lawn, Farmhouse Porch, Balcony",
    featured: false,
    inStock: true,
    tags: ["planter", "ava-craft", "wine-cask", "barrel-planter"]
  },
  {
    id: "charcoal-flared-wicker-pot",
    name: "Flared Charcoal Rattan Woven Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/charcoal-flared-wicker-pot.webp",
    alt: "Flared Charcoal Rattan Woven Planter — Dev Greenland Nursery",
    shortDescription: "Contemporary flared wicker weave pot in sophisticated charcoal grey tone.",
    description: "Handcrafted synthetic all-weather rattan woven over a rust-proof framework. Includes internal pot liner for clean, leak-free indoor and outdoor use.",
    material: "All-Weather Resin Wicker & Metal Frame",
    dimensions: "14\" top dia x 16\" height",
    usage: "Modern Interiors, Balcony, Sunroom",
    featured: false,
    inStock: true,
    tags: ["wicker", "rattan", "charcoal", "modern-pot"]
  },
  {
    id: "fluted-tall-wicker-planter",
    name: "Tall Fluted Wicker Pedestal Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/fluted-tall-wicker-planter.webp",
    alt: "Tall Fluted Wicker Pedestal Planter — Dev Greenland Nursery",
    shortDescription: "Elegant vertical fluted wicker pedestal container in warm natural tones.",
    description: "Slender, space-saving tall planter woven from durable natural-finish synthetic fibers. Ideal for flanking doors, pathways, and living room credenzas.",
    material: "UV-Resistant Polyethylene Wicker",
    dimensions: "12\" dia x 24\" height",
    usage: "Doorway Entry, Balcony, Living Room",
    featured: false,
    inStock: true,
    tags: ["wicker", "tall-planter", "pedestal", "entryway"]
  },
  {
    id: "fluted-wicker-planter-urn",
    name: "Fluted Classic Wicker Urn Planter",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/fluted-wicker-planter-urn.webp",
    alt: "Fluted Classic Wicker Urn Planter — Dev Greenland Nursery",
    shortDescription: "Classic urn silhouette woven in dense golden-honey rattan wicker.",
    description: "Combines classical garden urn contours with organic basket weave textures. Perfect for flowering annuals and cascading indoor vines.",
    material: "All-Weather Poly-Rattan",
    dimensions: "16\" dia x 18\" height",
    usage: "Garden Porch, Covered Patio, Balcony",
    featured: false,
    inStock: true,
    tags: ["wicker", "urn", "honey-rattan", "classic"]
  },
  {
    id: "natural-wheat-wicker-bowl",
    name: "Natural Wheat Low Wicker Planter Bowl",
    category: "Decorative Planters & Pots",
    image: "/images/accessories/processed/natural-wheat-wicker-bowl.webp",
    alt: "Natural Wheat Low Wicker Planter Bowl — Dev Greenland Nursery",
    shortDescription: "Shallow round wicker planter bowl with braided rim for succulent arrangements.",
    description: "A wide, shallow bowl silhouette ideal for multi-plant arrangements, succulent fairy gardens, and coffee-table green centerpieces.",
    material: "Natural Finished Woven Wicker",
    dimensions: "18\" dia x 8\" height",
    usage: "Table Centerpiece, Low Wall, Balcony",
    featured: false,
    inStock: true,
    tags: ["wicker", "bowl-planter", "succulent-bowl", "tabletop"]
  },
  {
    id: "oval-wicker-planter-stand",
    name: "Oval Wicker Planter Basket with Wooden Legs",
    category: "Plant Stands & Racks",
    image: "/images/accessories/processed/oval-wicker-planter-stand.webp",
    alt: "Oval Wicker Planter Basket with Wooden Legs — Dev Greenland Nursery",
    shortDescription: "Elevated oval wicker basket stand on tapered natural wooden legs.",
    description: "Mid-century modern inspired plant stand combining a woven oval basket with solid wooden tripod legs. Elevates plants off cold floors for better sunlight exposure.",
    material: "Wicker Basket with Solid Hardwood Legs",
    dimensions: "20\" length x 12\" width x 22\" height",
    usage: "Living Room, Bedroom, Sheltered Balcony",
    featured: true,
    inStock: true,
    tags: ["plant-stand", "wicker-basket", "wooden-legs", "mid-century"]
  }
];

export const getAccessories = () => accessories;

export const getAccessoriesByCategory = (category) => {
  if (!category || category === "All") return accessories;
  return accessories.filter(a => a.category === category);
};

export const getAccessoryById = (id) => {
  return accessories.find(a => a.id === id) || null;
};

export const searchAccessories = (query) => {
  if (!query) return accessories;
  const q = query.toLowerCase().trim();
  return accessories.filter(a => 
    a.name.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q) ||
    (a.shortDescription && a.shortDescription.toLowerCase().includes(q)) ||
    (a.material && a.material.toLowerCase().includes(q)) ||
    (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
  );
};

export const getAccessoryCategories = () => Object.keys(accessoryCategories);
