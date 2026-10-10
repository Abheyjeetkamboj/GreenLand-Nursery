#!/usr/bin/env python3
"""
Dev Greenland Nursery — Image Processing & Catalog Pipeline
Processes all 119 original Instagram screenshots in picturesofplants/:
- Crops away Instagram chrome, headers, action bars, and letterboxes.
- Preserves all plant features, leaves, flowers, pots, and accessories.
- Optimizes images to WebP and JPG in:
    public/images/plants/processed/
    public/images/accessories/processed/
- Generates an exhaustive IMAGE_PROCESSING_REPORT.md.
"""

import os
import json
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(BASE_DIR, "picturesofplants")
PLANTS_OUT = os.path.join(BASE_DIR, "public", "images", "plants", "processed")
ACCESSORIES_OUT = os.path.join(BASE_DIR, "public", "images", "accessories", "processed")
REPORT_PATH = os.path.join(BASE_DIR, "IMAGE_PROCESSING_REPORT.md")

os.makedirs(PLANTS_OUT, exist_ok=True)
os.makedirs(ACCESSORIES_OUT, exist_ok=True)

# ─── Bounding Box Detector ────────────────────────────────────────────────────
def detect_photo_bounds(img):
    w, h = img.size
    
    def is_bg(pixel):
        r, g, b = pixel[:3]
        return abs(r - 10) <= 7 and abs(g - 14) <= 7 and abs(b - 17) <= 7

    row_is_photo = []
    for y in range(80, h - 80):
        pts = [img.getpixel((x, y)) for x in range(30, w - 30, 20)]
        bg_count = sum(1 for p in pts if is_bg(p))
        center_pts = [img.getpixel((x, y)) for x in range(int(w * 0.2), int(w * 0.8), 20)]
        center_bg = sum(1 for p in center_pts if is_bg(p))
        is_p = (bg_count < len(pts) * 0.45) or (center_bg < len(center_pts) * 0.2)
        row_is_photo.append((y, is_p))

    blocks = []
    start = None
    prev = None
    for y, is_p in row_is_photo:
        if is_p:
            if start is None:
                start = y
            prev = y
        else:
            if start is not None:
                if prev - start > 220:
                    blocks.append((start, prev))
                start = None
                prev = None
    if start is not None and prev - start > 220:
        blocks.append((start, prev))

    if not blocks:
        return (0, 0, w, h)

    blocks.sort(key=lambda b: b[1] - b[0], reverse=True)
    y1, y2 = blocks[0]

    # Detect horizontal boundaries / letterboxing
    step = max(1, (y2 - y1 - 40) // 40)
    sample_y = range(y1 + 20, y2 - 20, step)

    x1 = 0
    for x in range(0, int(w * 0.35)):
        col = [img.getpixel((x, y)) for y in sample_y]
        bg_col = sum(1 for p in col if is_bg(p))
        avg_r = sum(c[0] for c in col) / len(col)
        avg_g = sum(c[1] for c in col) / len(col)
        avg_b = sum(c[2] for c in col) / len(col)
        var = sum((c[0]-avg_r)**2 + (c[1]-avg_g)**2 + (c[2]-avg_b)**2 for c in col) / len(col)
        if bg_col < len(col) * 0.2 and var > 20:
            x1 = x
            break

    x2 = w
    for x in range(w - 1, int(w * 0.65), -1):
        col = [img.getpixel((x, y)) for y in sample_y]
        bg_col = sum(1 for p in col if is_bg(p))
        avg_r = sum(c[0] for c in col) / len(col)
        avg_g = sum(c[1] for c in col) / len(col)
        avg_b = sum(c[2] for c in col) / len(col)
        var = sum((c[0]-avg_r)**2 + (c[1]-avg_g)**2 + (c[2]-avg_b)**2 for c in col) / len(col)
        if bg_col < len(col) * 0.2 and var > 20:
            x2 = x + 1
            break

    return (x1, y1, x2, y2)

# Manual crop overrides for non-standard edge cases
CROP_OVERRIDES = {
    # 150212 has dark green foliage at night that blends near top
    "Screenshot_20261006_150212.jpg": (18, 520, 1062, 1820),
    # 150848 is the official logo graphic
    "Screenshot_20261006_150848.jpg": (200, 800, 880, 1600),
}

# Master Metadata Table mapping each screenshot
METADATA = {
    "Screenshot_20261006_145746.jpg": {
        "type": "plant", "name": "Persian Shield", "botanical": "Strobilanthes dyeriana",
        "category": "Indoor Plants", "slug": "persian-shield", "catalog_match": None, "featured": True,
        "desc": "Stunning iridescent purple-and-silver foliage that glistens in bright indirect light."
    },
    "Screenshot_20261006_145758.jpg": {
        "type": "plant", "name": "Calathea White Star", "botanical": "Goeppertia majestica 'White Star'",
        "category": "Indoor Plants", "slug": "calathea-white-star", "catalog_match": None, "featured": True,
        "desc": "Lush pinstriped prayer plant with elegant pink inflorescences blooming at the nursery."
    },
    "Screenshot_20261006_145804.jpg": {
        "type": "plant", "name": "Fiddle Leaf Fig Columnar", "botanical": "Ficus lyrata 'Compacta'",
        "category": "Indoor Plants", "slug": "fiddle-leaf-fig-columnar", "catalog_match": None, "featured": True,
        "desc": "Architectural columnar fiddle leaf fig trees potted in sleek white cylindrical planters."
    },
    "Screenshot_20261006_145812.jpg": {
        "type": "plant", "name": "Twin Ficus Bonsai", "botanical": "Ficus microcarpa",
        "category": "Indoor Plants", "subcategory": "Bonsai & Topiary", "slug": "twin-ficus-bonsai", "catalog_match": None, "featured": True,
        "desc": "Twin specimen ficus bonsai trees with thick sculpted trunks on display."
    },
    "Screenshot_20261006_145819.jpg": {
        "type": "plant", "name": "Luxury Botanical Trio", "botanical": "Strelitzia, Monstera, Dypsis",
        "category": "Indoor Plants", "slug": "luxury-botanical-trio", "catalog_match": None, "featured": False,
        "desc": "Bird of paradise, monstera deliciosa, and areca palm in geometric luxury planters."
    },
    "Screenshot_20261006_145825.jpg": {
        "type": "plant", "name": "Areca Palm Luxury Specimen", "botanical": "Dypsis lutescens",
        "category": "Indoor Plants", "slug": "areca-palm", "catalog_match": "areca-palm", "featured": True,
        "desc": "Lush tropical Areca Palm in an elegant tall white oval planter."
    },
    "Screenshot_20261006_145831.jpg": {
        "type": "plant", "name": "Marguerite African Daisy", "botanical": "Osteospermum fruticosum",
        "category": "Flowering Plants", "slug": "african-marguerite-daisy", "catalog_match": None, "featured": True,
        "desc": "A vibrant sea of pink, magenta, and blush African daisy blooms in full spring flush."
    },
    "Screenshot_20261006_145836.jpg": {
        "type": "plant", "name": "Cascading Purple Petunia", "botanical": "Petunia hybrida",
        "category": "Flowering Plants", "slug": "cascading-purple-petunia", "catalog_match": None, "featured": False,
        "desc": "Lush trailing purple petunias overflowing in an authentic Dev Greenland wooden planter crate."
    },
    "Screenshot_20261006_145842.jpg": {
        "type": "plant", "name": "Bunny Ears Cactus & Haworthia", "botanical": "Opuntia microdasys",
        "category": "Indoor Plants", "subcategory": "Succulents & Cacti", "slug": "bunny-ears-cactus-pots", "catalog_match": None, "featured": False,
        "desc": "Charming bunny ears cactus and zebra haworthia in faceted geometric ceramic pots."
    },
    "Screenshot_20261006_145849.jpg": {
        "type": "plant", "name": "Rhapis Lady Palm", "botanical": "Rhapis excelsa",
        "category": "Indoor Plants", "slug": "rhapis-lady-palm", "catalog_match": None, "featured": True,
        "desc": "Graceful multi-stemmed Lady Palm with glossy fan-shaped leaves in a bronze ceramic pot."
    },
    "Screenshot_20261006_145853.jpg": {
        "type": "plant", "name": "Variegated Money Plant N'Joy", "botanical": "Epipremnum aureum 'N'Joy'",
        "category": "Indoor Plants", "slug": "money-plant", "catalog_match": "money-plant", "featured": True,
        "desc": "Hardy trailing Money Plant with crisp white-and-green variegated leaves in nursery pots."
    },
    "Screenshot_20261006_145901.jpg": {
        "type": "plant", "name": "Dieffenbachia Camilla", "botanical": "Dieffenbachia seguine 'Camilla'",
        "category": "Indoor Plants", "slug": "dieffenbachia-camilla", "catalog_match": None, "featured": False,
        "desc": "Striking cream-white centered foliage with emerald margins that brightens indoor spaces."
    },
    "Screenshot_20261006_145909.jpg": {
        "type": "plant", "name": "Bunny Ears Cactus Trio", "botanical": "Opuntia microdasys",
        "category": "Indoor Plants", "subcategory": "Succulents & Cacti", "slug": "bunny-ears-cactus-novelty", "catalog_match": None, "featured": False,
        "desc": "Playful bunny ears cacti in custom ceramic pots."
    },
    "Screenshot_20261006_145913.jpg": {
        "type": "plant", "name": "Bougainvillea Bonsai Specimen", "botanical": "Bougainvillea spectabilis",
        "category": "Outdoor Plants", "subcategory": "Bonsai & Topiary", "slug": "bougainvillea-bonsai", "catalog_match": "bougainvillea", "featured": True,
        "desc": "Spectacular potted Bougainvillea bonsai bursting with vibrant magenta bracts."
    },
    "Screenshot_20261006_145918.jpg": {
        "type": "plant", "name": "Snake Plant Futura Superba", "botanical": "Sansevieria trifasciata 'Futura Superba'",
        "category": "Indoor Plants", "slug": "snake-plant", "catalog_match": "snake-plant", "featured": True,
        "desc": "Broad upright sword-like leaves with vivid golden-yellow borders in a white fluted pot."
    },
    "Screenshot_20261006_145922.jpg": {
        "type": "plant", "name": "Crown of Thorns Red", "botanical": "Euphorbia milii",
        "category": "Flowering Plants", "slug": "crown-of-thorns-red", "catalog_match": None, "featured": False,
        "desc": "Hardy drought-tolerant flowering succulent blooming vibrant scarlet-red bracts."
    },
    "Screenshot_20261006_145925.jpg": {
        "type": "plant", "name": "Norfolk Island Pine", "botanical": "Araucaria heterophylla",
        "category": "Outdoor Plants", "slug": "norfolk-island-pine", "catalog_match": None, "featured": True,
        "desc": "Pyramidal evergreen pine trees with symmetrical tiers of soft feathery needles."
    },
    "Screenshot_20261006_145929.jpg": {
        "type": "plant", "name": "Aglaonema Pink Siam", "botanical": "Aglaonema commutatum 'Pink Siam'",
        "category": "Indoor Plants", "slug": "aglaonema-pink-siam", "catalog_match": None, "featured": True,
        "desc": "Lush tropical Chinese evergreen with brilliant candy-pink foliage."
    },
    "Screenshot_20261006_145937.jpg": {
        "type": "plant", "name": "Echeveria Elegans Rosette", "botanical": "Echeveria elegans",
        "category": "Indoor Plants", "subcategory": "Succulents & Cacti", "slug": "echeveria-elegans", "catalog_match": None, "featured": False,
        "desc": "Silvery blue-green geometric succulent rosette in a glazed ceramic dish."
    },
    "Screenshot_20261006_145941.jpg": {
        "type": "plant", "name": "Peanut Hedgehog Cactus", "botanical": "Echinopsis chamaecereus",
        "category": "Indoor Plants", "subcategory": "Succulents & Cacti", "slug": "peanut-cactus", "catalog_match": None, "featured": False,
        "desc": "Clustering columnar cactus with soft bristly spines in a nursery container."
    },
    "Screenshot_20261006_145951.jpg": {
        "type": "plant", "name": "Bougainvillea Topiary Standard", "botanical": "Bougainvillea spectabilis",
        "category": "Outdoor Plants", "subcategory": "Bonsai & Topiary", "slug": "bougainvillea", "catalog_match": "bougainvillea", "featured": True,
        "desc": "Mature topiary umbrella bougainvillea covered in vivid magenta blooms in nursery tubs."
    },
    "Screenshot_20261006_145954.jpg": {
        "type": "plant", "name": "Guava Tree with Fruit", "botanical": "Psidium guajava",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "guava", "catalog_match": "guava", "featured": True,
        "desc": "Healthy grafted guava fruit tree heavy with clusters of ripening green guavas."
    },
    "Screenshot_20261006_150002.jpg": {
        "type": "plant", "name": "Chinese Fringe Flower Bonsai", "botanical": "Loropetalum chinense",
        "category": "Outdoor Plants", "subcategory": "Bonsai & Topiary", "slug": "loropetalum-fringe-flower", "catalog_match": None, "featured": False,
        "desc": "Deep burgundy-purple foliage with ribbon-like pink blooms in a planter."
    },
    "Screenshot_20261006_150007.jpg": {
        "type": "plant", "name": "Multi-Color Grafted Bougainvillea Tree", "botanical": "Bougainvillea glabra",
        "category": "Outdoor Plants", "subcategory": "Bonsai & Topiary", "slug": "multicolor-bougainvillea-tree", "catalog_match": None, "featured": True,
        "desc": "Magnificent multi-grafted specimen tree blooming pink, yellow, and orange on one crown."
    },
    "Screenshot_20261006_150019.jpg": {
        "type": "plant", "name": "Specimen Bougainvillea Tree Loading", "botanical": "Bougainvillea glabra",
        "category": "Outdoor Plants", "slug": "bougainvillea-specimen-delivery", "catalog_match": None, "featured": False,
        "desc": "Nursery team loading a full-grown grafted rainbow bougainvillea tree for client delivery."
    },
    "Screenshot_20261006_150024.jpg": {
        "type": "plant", "name": "Niwaki Cloud Tree Ficus Bonsai", "botanical": "Ficus microcarpa",
        "category": "Outdoor Plants", "subcategory": "Bonsai & Topiary", "slug": "ficus-cloud-tree-bonsai", "catalog_match": None, "featured": True,
        "desc": "Spectacular centuries-style cloud-pruned Japanese Niwaki ficus bonsai with multi-tier pads."
    },
    "Screenshot_20261006_150026.jpg": {
        "type": "plant", "name": "Braided Stem Azalea Topiary", "botanical": "Rhododendron simsii",
        "category": "Flowering Plants", "subcategory": "Bonsai & Topiary", "slug": "braided-azalea-topiary", "catalog_match": None, "featured": True,
        "desc": "Intricately braided trunk topiary crowned with a ball of bright crimson-pink azalea blooms."
    },
    # Accessories
    "Screenshot_20261006_150030.jpg": {
        "type": "accessory", "name": "White Tiger Ceramic Planter",
        "category": "Decorative Planters & Pots", "slug": "white-tiger-ceramic-planter", "featured": True,
        "desc": "Hand-painted ceramic novelty tiger planter, perfect for succulents and small indoor plants."
    },
    "Screenshot_20261006_150034.jpg": {
        "type": "accessory", "name": "Graceful Swan Ceramic Planter",
        "category": "Decorative Planters & Pots", "slug": "swan-ceramic-planter", "featured": True,
        "desc": "Artisanal white swan ceramic pot with textured feathers for balconies, tables, and patios."
    },
    "Screenshot_20261006_150051.jpg": {
        "type": "plant", "name": "Boxwood Spherical Topiary", "botanical": "Buxus sempervirens",
        "category": "Outdoor Plants", "subcategory": "Bonsai & Topiary", "slug": "boxwood-globe-topiary", "catalog_match": None, "featured": False,
        "desc": "Pruned spherical evergreen boxwood topiary bush for manicured formal gardens and terraces."
    },
    "Screenshot_20261006_150100.jpg": {
        "type": "accessory", "name": "Wrought Iron Multi-Tier Plant Stand",
        "category": "Plant Stands & Racks", "slug": "wrought-iron-multitier-stand", "featured": True,
        "desc": "Curved white wrought-iron 4-tier plant display stand for balconies and living rooms."
    },
    "Screenshot_20261006_150107.jpg": {
        "type": "accessory", "name": "Vintage Bicycle Planter Cart",
        "category": "Plant Stands & Racks", "slug": "vintage-bicycle-planter-cart", "featured": True,
        "desc": "Whimsical white metal bicycle planter with front and rear baskets for multiple potted plants."
    },
    # Rose Collection
    "Screenshot_20261006_150142.jpg": {
        "type": "plant", "name": "Classic Crimson Shrub Rose", "botanical": "Rosa rubiginosa",
        "category": "Flowering Plants", "slug": "rose-crimson-cluster", "catalog_match": "rose", "featured": True,
        "desc": "Lush clusters of deep scarlet-red roses thriving in our nursery garden bed."
    },
    "Screenshot_20261006_150146.jpg": {
        "type": "plant", "name": "Sunset Bi-Color Floribunda Rose", "botanical": "Rosa 'Sunset'",
        "category": "Flowering Plants", "slug": "rose", "catalog_match": "rose", "featured": True,
        "desc": "Stunning sunset bi-color rose blooming with gradients of fiery orange, yellow, and red."
    },
    "Screenshot_20261006_150149.jpg": {
        "type": "plant", "name": "Red Heritage Shrub Rose", "botanical": "Rosa gallica",
        "category": "Flowering Plants", "slug": "rose-red-heritage", "catalog_match": None, "featured": False,
        "desc": "Vigorous red heritage garden rose bush with abundant ruffled blossoms."
    },
    "Screenshot_20261006_150152.jpg": {
        "type": "plant", "name": "Sunset Gold Rose Close-up", "botanical": "Rosa 'Sunset'",
        "category": "Flowering Plants", "slug": "rose-sunset-gold", "catalog_match": None, "featured": False,
        "desc": "Delicate close-up of fragrant sunset blend rose with golden center and coral petals."
    },
    "Screenshot_20261006_150201.jpg": {
        "type": "plant", "name": "Blush Pink Floribunda Rose", "botanical": "Rosa 'Bonica'",
        "category": "Flowering Plants", "slug": "rose-blush-pink", "catalog_match": None, "featured": True,
        "desc": "Soft pastel-pink floribunda roses with delicate ruffled petals and sweet floral fragrance."
    },
    "Screenshot_20261006_150203.jpg": {
        "type": "plant", "name": "Golden Yellow Shrub Rose", "botanical": "Rosa 'Golden Showers'",
        "category": "Flowering Plants", "slug": "rose-golden-yellow", "catalog_match": None, "featured": True,
        "desc": "Radiant sunny-yellow garden roses that bloom continuously throughout cooler months."
    },
    "Screenshot_20261006_150206.jpg": {
        "type": "plant", "name": "White & Pink Zonal Geranium", "botanical": "Pelargonium zonale",
        "category": "Flowering Plants", "slug": "geranium-white-pink", "catalog_match": None, "featured": False,
        "desc": "Large rounded umbels of pure white and candy-pink geranium flowers in terracotta pots."
    },
    "Screenshot_20261006_150208.jpg": {
        "type": "plant", "name": "Pink Ribbon Zonal Geranium", "botanical": "Pelargonium zonale",
        "category": "Flowering Plants", "slug": "geranium-pink-ribbon", "catalog_match": None, "featured": False,
        "desc": "Eye-catching vibrant pink zonal geranium clusters flourishing in nursery pots."
    },
    "Screenshot_20261006_150210.jpg": {
        "type": "plant", "name": "Miniature Yellow Star Rose", "botanical": "Rosa chinensis 'Minima'",
        "category": "Flowering Plants", "slug": "rose-miniature-yellow", "catalog_match": None, "featured": False,
        "desc": "Delicate star-shaped miniature yellow roses covering a compact bedding plant."
    },
    "Screenshot_20261006_150212.jpg": {
        "type": "plant", "name": "Variegated Striped Rose Abracadabra", "botanical": "Rosa 'Abracadabra'",
        "category": "Flowering Plants", "slug": "rose-abracadabra-striped", "catalog_match": None, "featured": True,
        "desc": "Rare exotic striped rose with deep velvet-red and yellow-cream splash patterns."
    },
    "Screenshot_20261006_150225.jpg": {
        "type": "plant", "name": "Standard Peach Tree Rose", "botanical": "Rosa standard",
        "category": "Flowering Plants", "subcategory": "Bonsai & Topiary", "slug": "rose-standard-tree-peach", "catalog_match": None, "featured": True,
        "desc": "Grafted tree rose standard with high stem and a crown of ruffled peach-apricot blooms."
    },
    "Screenshot_20261006_150236.jpg": {
        "type": "duplicate", "target": "Screenshot_20261006_150225.jpg", "slug": "rose-standard-peach-dup"
    },
    "Screenshot_20261006_150243.jpg": {
        "type": "plant", "name": "Flame Orange Hybrid Tea Rose", "botanical": "Rosa 'Tropicana'",
        "category": "Flowering Plants", "slug": "rose-flame-orange", "catalog_match": None, "featured": False,
        "desc": "High-centered hybrid tea rose in brilliant luminous orange tone in lime pot."
    },
    "Screenshot_20261006_150250.jpg": {
        "type": "plant", "name": "Porcelain White Tea Rose", "botanical": "Rosa 'Iceberg'",
        "category": "Flowering Plants", "slug": "rose-porcelain-white", "catalog_match": None, "featured": False,
        "desc": "Pure delicate porcelain-white rose blossom surrounded by young marigold seedlings."
    },
    "Screenshot_20261006_150258.jpg": {
        "type": "plant", "name": "Coral & Magenta Garden Roses", "botanical": "Rosa floribunda",
        "category": "Flowering Plants", "slug": "rose-coral-magenta", "catalog_match": None, "featured": False,
        "desc": "Dual blossoms in soft coral and rich magenta in nursery containers."
    },
    "Screenshot_20261006_150300.jpg": {
        "type": "plant", "name": "Sunny Amber Floribunda Rose", "botanical": "Rosa 'Amber'",
        "category": "Flowering Plants", "slug": "rose-sunny-amber", "catalog_match": None, "featured": False,
        "desc": "Bright sunny amber-yellow rose bloom in full open display in yellow container."
    },
    "Screenshot_20261006_150302.jpg": {
        "type": "plant", "name": "Velvet Scarlet Red Rose", "botanical": "Rosa 'Mr. Lincoln'",
        "category": "Flowering Plants", "slug": "rose-velvet-scarlet", "catalog_match": None, "featured": False,
        "desc": "Classic velvety deep-red rose with intoxicating traditional rose perfume."
    },
    "Screenshot_20261006_150304.jpg": {
        "type": "plant", "name": "Golden Ruffled Rose Trio", "botanical": "Rosa 'Teasing Georgia'",
        "category": "Flowering Plants", "slug": "rose-golden-ruffled-trio", "catalog_match": None, "featured": False,
        "desc": "Dense ruffled golden blossoms blooming in cluster in green nursery pot."
    },
    "Screenshot_20261006_150306.jpg": {
        "type": "plant", "name": "Apricot Floribunda Rose Bush", "botanical": "Rosa 'Apricot Nectar'",
        "category": "Flowering Plants", "slug": "rose-apricot-bush", "catalog_match": None, "featured": False,
        "desc": "Compact bush covered in warm peach-apricot and saffron blooms."
    },
    "Screenshot_20261006_150307.jpg": {
        "type": "plant", "name": "Crimson Garden Rose", "botanical": "Rosa floribunda",
        "category": "Flowering Plants", "slug": "rose-crimson-garden", "catalog_match": None, "featured": False,
        "desc": "Bright scarlet-crimson flowers contrasting against rich green serrated leaves."
    },
    "Screenshot_20261006_150309.jpg": {
        "type": "plant", "name": "Peach Sunset Rose Overhead", "botanical": "Rosa floribunda",
        "category": "Flowering Plants", "slug": "rose-sunset-overhead", "catalog_match": None, "featured": False,
        "desc": "Top-down view of peach and raspberry bi-color roses in nursery containers."
    },
    "Screenshot_20261006_150313.jpg": {
        "type": "plant", "name": "Striped Red & White Dahlia", "botanical": "Dahlia hortensis",
        "category": "Flowering Plants", "slug": "dahlia-striped-red-white", "catalog_match": None, "featured": True,
        "desc": "Spectacular dinnerplate dahlia featuring radiating petals striped in cherry-red and white."
    },
    "Screenshot_20261006_150316.jpg": {
        "type": "plant", "name": "Madagascar Periwinkle Vinca Bed", "botanical": "Catharanthus roseus",
        "category": "Flowering Plants", "slug": "vinca-periwinkle-bed", "catalog_match": None, "featured": False,
        "desc": "Mass planting of resilient Vinca groundcover blooming white, pink, and rose."
    },
    "Screenshot_20261006_150323.jpg": {
        "type": "plant", "name": "Calendula & French Marigold Bed", "botanical": "Tagetes patula & Calendula",
        "category": "Flowering Plants", "slug": "marigold", "catalog_match": "marigold", "featured": True,
        "desc": "Vibrant nursery bed of blooming golden-yellow and bright orange marigolds and calendula."
    },
    "Screenshot_20261006_150328.jpg": {
        "type": "plant", "name": "Rainbow Velvet Coleus Bed", "botanical": "Coleus scutellarioides",
        "category": "Outdoor Plants", "slug": "coleus-rainbow-bed", "catalog_match": None, "featured": False,
        "desc": "Ornamental coleus bed displaying rich velvety shades of burgundy, magenta, lime, and copper."
    },
    "Screenshot_20261006_150330.jpg": {
        "type": "plant", "name": "Chrysanthemum Guldaudi Pots", "botanical": "Chrysanthemum morifolium",
        "category": "Flowering Plants", "subcategory": "Winter Fruits", "season": "Winter", "slug": "chrysanthemum-guldaudi", "catalog_match": None, "featured": True,
        "desc": "Traditional Indian winter favourite, prolific potted Chrysanthemums in yellow, pink, and burgundy."
    },
    "Screenshot_20261006_150332.jpg": {
        "type": "plant", "name": "Sweet William Dianthus Bed", "botanical": "Dianthus barbatus",
        "category": "Flowering Plants", "slug": "dianthus-sweet-william", "catalog_match": None, "featured": False,
        "desc": "Intricate fringed bicolor petals of fragrant Dianthus blooming in mass nursery trays."
    },
    "Screenshot_20261006_150334.jpg": {
        "type": "plant", "name": "Garden Pansy Bed", "botanical": "Viola tricolor var. hortensis",
        "category": "Flowering Plants", "slug": "pansy-garden-bed", "catalog_match": None, "featured": False,
        "desc": "Cheerful velvety pansy flowers with contrasting dark face markings in yellow, violet, and purple."
    },
    # Fountains & Water Features
    "Screenshot_20261006_150357.jpg": {
        "type": "accessory", "name": "Tiered Natural Stone Water Fountain",
        "category": "Garden Water Fountains", "slug": "tiered-stone-water-fountain", "featured": True,
        "desc": "Multi-tier carved grey rock waterfall fountain, creating soothing water sounds for gardens."
    },
    "Screenshot_20261006_150401.jpg": {
        "type": "accessory", "name": "Serene Buddha Lotus Water Fountain",
        "category": "Garden Water Fountains", "slug": "buddha-lotus-water-fountain", "featured": True,
        "desc": "Tall meditative Buddha fountain seated upon a carved lotus pedestal with gentle water cascades."
    },
    "Screenshot_20261006_150403.jpg": {
        "type": "accessory", "name": "Golden Buddha Waterfall Wall Fountain",
        "category": "Garden Water Fountains", "slug": "buddha-waterfall-wall-fountain", "featured": True,
        "desc": "Rock-texture meditation fountain with golden Buddha and 4-tier slate water bowls."
    },
    "Screenshot_20261006_150405.jpg": {
        "type": "accessory", "name": "Bamboo Pot Cascade Water Fountain",
        "category": "Garden Water Fountains", "slug": "bamboo-cascade-fountain", "featured": False,
        "desc": "Green textured bamboo water fountain with 3-tier flowing water pots."
    },
    "Screenshot_20261006_150412.jpg": {
        "type": "accessory", "name": "Green Slate Cascade Water Fountain",
        "category": "Garden Water Fountains", "slug": "green-slate-cascade-fountain", "featured": False,
        "desc": "Artistic emerald-green garden fountain with cascading pouring vessels and lower catch basin."
    },
    "Screenshot_20261006_150458.jpg": {
        "type": "plant", "name": "Grafted Mango Sapling Specimen", "botanical": "Mangifera indica",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "mango", "catalog_match": "mango", "featured": True,
        "desc": "Vigorous grafted mango tree sapling ready for terrace gardening or orchard planting."
    },
    # Wicker & Rattan Planters
    "Screenshot_20261006_150508.jpg": {
        "type": "accessory", "name": "Hanging Wicker Planter Basket with Chains",
        "category": "Decorative Planters & Pots", "slug": "hanging-wicker-planter-basket", "featured": True,
        "desc": "Woven weather-resistant wicker hanging basket with triple steel chains and inner protective liner."
    },
    "Screenshot_20261006_150510.jpg": {
        "type": "accessory", "name": "Fluted Wicker Planter Urn",
        "category": "Decorative Planters & Pots", "slug": "fluted-wicker-planter-urn", "featured": False,
        "desc": "Elegant tapered woven rattan urn pot with rolled rim, wrapped in protective transport cover."
    },
    "Screenshot_20261006_150512.jpg": {
        "type": "accessory", "name": "Oval Wicker Planter on Metal Stand",
        "category": "Decorative Planters & Pots", "slug": "oval-wicker-planter-stand", "featured": False,
        "desc": "Low-profile woven wicker bowl mounted on a custom white wrought-iron plant stand."
    },
    "Screenshot_20261006_150514.jpg": {
        "type": "accessory", "name": "Fluted Tall Wicker Planter",
        "category": "Decorative Planters & Pots", "slug": "fluted-tall-wicker-planter", "featured": False,
        "desc": "Tall woven resin-wicker floor planter urn for indoor palm trees and decorative foliage."
    },
    "Screenshot_20261006_150518.jpg": {
        "type": "accessory", "name": "Dark Grey Rattan Planter Bowl",
        "category": "Decorative Planters & Pots", "slug": "dark-grey-rattan-planter-bowl", "featured": True,
        "desc": "Sophisticated flared rattan planter in slate-grey finish with matching drip saucer tray."
    },
    "Screenshot_20261006_150520.jpg": {
        "type": "accessory", "name": "Charcoal Flared Wicker Pot",
        "category": "Decorative Planters & Pots", "slug": "charcoal-flared-wicker-pot", "featured": False,
        "desc": "Charcoal woven container with deep interior volume for balcony and patio arrangements."
    },
    "Screenshot_20261006_150523.jpg": {
        "type": "accessory", "name": "Natural Wheat Wicker Planter Bowl",
        "category": "Decorative Planters & Pots", "slug": "natural-wheat-wicker-bowl", "featured": False,
        "desc": "Warm wheat-toned handwoven planter bowl with heavy-duty black drainage saucer."
    },
    "Screenshot_20261006_150525.jpg": {
        "type": "accessory", "name": "Square Tapered Wicker Planter",
        "category": "Decorative Planters & Pots", "slug": "square-tapered-wicker-planter", "featured": True,
        "desc": "Geometric square tapered wicker planter pot in stone-grey weave with drainage saucer."
    },
    "Screenshot_20261006_150532.jpg": {
        "type": "plant", "name": "Aglaonema Lady Valentine", "botanical": "Aglaonema 'Lady Valentine'",
        "category": "Indoor Plants", "slug": "aglaonema-lady-valentine", "catalog_match": None, "featured": True,
        "desc": "Lush speckled pink and ruby-red leaves with emerald margins in a cylindrical black pot."
    },
    "Screenshot_20261006_150536.jpg": {
        "type": "accessory", "name": "Balcony Railing & Metal Planter Stand Set",
        "category": "Plant Stands & Racks", "slug": "balcony-railing-planter-stands", "featured": True,
        "desc": "Collection of metal railing hooks, step stands, and colorful planter pots for urban balconies."
    },
    "Screenshot_20261006_150539.jpg": {
        "type": "plant", "name": "Persian Shield Nursery Display", "botanical": "Strobilanthes dyeriana",
        "category": "Indoor Plants", "slug": "persian-shield-display", "catalog_match": None, "featured": False,
        "desc": "Glistening purple Persian Shield nestled alongside decorative wooden textured planters."
    },
    "Screenshot_20261006_150546.jpg": {
        "type": "plant", "name": "Red Spine Barrel Cactus", "botanical": "Ferocactus pilosus",
        "category": "Indoor Plants", "subcategory": "Succulents & Cacti", "slug": "red-spine-barrel-cactus", "catalog_match": None, "featured": True,
        "desc": "Architectural spherical desert cactus with prominent fiery-red curved spines."
    },
    "Screenshot_20261006_150552.jpg": {
        "type": "plant", "name": "Braided Stem Money Tree Ficus", "botanical": "Ficus microcarpa / Pachira",
        "category": "Indoor Plants", "subcategory": "Bonsai & Topiary", "slug": "braided-money-tree-ficus", "catalog_match": None, "featured": True,
        "desc": "Pair of braided lattice trunk topiary trees with compact lush canopies in terracotta pots."
    },
    "Screenshot_20261006_150604.jpg": {
        "type": "accessory", "name": "Natural Coco Coir Hanging Planter Nest",
        "category": "Coir & Hanging Decor", "slug": "coco-coir-hanging-nest", "featured": True,
        "desc": "Biodegradable eco-friendly coconut fiber hanging nest planter with dual access holes and jute ropes."
    },
    "Screenshot_20261006_150609.jpg": {
        "type": "plant", "name": "Calathea Freddie", "botanical": "Goeppertia concinna 'Freddie'",
        "category": "Indoor Plants", "slug": "calathea-freddie", "catalog_match": None, "featured": True,
        "desc": "Pale green leaves patterned with deep green feathering stripes, purifying indoor air."
    },
    "Screenshot_20261006_150612.jpg": {
        "type": "plant", "name": "Fiddle Leaf Fig Nursery Bed", "botanical": "Ficus lyrata",
        "category": "Indoor Plants", "slug": "fiddle-leaf-fig-bed", "catalog_match": None, "featured": False,
        "desc": "Vigorous young Fiddle Leaf Fig saplings with healthy violin-shaped foliage in nursery bags."
    },
    "Screenshot_20261006_150622.jpg": {
        "type": "plant", "name": "Ginseng Ficus Bonsai", "botanical": "Ficus retusa / microcarpa",
        "category": "Indoor Plants", "subcategory": "Bonsai & Topiary", "slug": "ginseng-ficus-bonsai", "catalog_match": None, "featured": True,
        "desc": "Living art piece featuring thick pot-bellied root caudex and dense emerald-green foliage."
    },
    # AVA CRAFT Designer Planters
    "Screenshot_20261006_150626.jpg": {
        "type": "accessory", "name": "AVA CRAFT Rustic Red Fluted Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-rustic-red-fluted", "featured": True,
        "desc": "Hand-textured vertical fluted artisan planter in distressed rust-red and charcoal finish."
    },
    "Screenshot_20261006_150628.jpg": {
        "type": "accessory", "name": "AVA CRAFT Vintage Stone Cylindrical Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-vintage-stone-cylinder", "featured": True,
        "desc": "Carved cylindrical planter featuring natural travertine stone texture with rustic aged patina."
    },
    "Screenshot_20261006_150630.jpg": {
        "type": "accessory", "name": "AVA CRAFT Ribbed Bark Finish Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-ribbed-bark-planter", "featured": False,
        "desc": "Tapered cylinder planter sculpted with deep vertical tree bark ridges in earthen tones."
    },
    "Screenshot_20261006_150633.jpg": {
        "type": "accessory", "name": "AVA CRAFT Rectangular Brick-Red Trough Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-brick-trough-planter", "featured": True,
        "desc": "Generous rectangular trough planter in warm terracotta-brick wash, ideal for boundary hedging."
    },
    "Screenshot_20261006_150638.jpg": {
        "type": "accessory", "name": "AVA CRAFT Sun Face Tribal Stone Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-sun-face-stone-planter", "featured": True,
        "desc": "Handcrafted stone-finish planter with an embossed radiant sun medallion and textured relief."
    },
    "Screenshot_20261006_150641.jpg": {
        "type": "accessory", "name": "AVA CRAFT Cobblestone Rock Tall Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-cobblestone-tall-planter", "featured": True,
        "desc": "Artisan cylindrical planter finished in rounded river rock cobblestone mosaic texture."
    },
    "Screenshot_20261006_150643.jpg": {
        "type": "accessory", "name": "AVA CRAFT Honeycomb Lava Textured Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-honeycomb-lava-planter", "featured": True,
        "desc": "Dramatic tall sculptural planter with honeycomb lava stone inlays and earthy brown glaze."
    },
    "Screenshot_20261006_150645.jpg": {
        "type": "accessory", "name": "AVA CRAFT Swirled Tree Bark Sculpted Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-swirled-tree-bark-planter", "featured": False,
        "desc": "Dynamic swirled grain tree bark design sculpted into a heavy-duty artisan planter."
    },
    "Screenshot_20261006_150651.jpg": {
        "type": "plant", "name": "Black Diamond Crape Myrtle Pink", "botanical": "Lagerstroemia indica 'Pink'",
        "category": "Flowering Plants", "slug": "crape-myrtle-pink", "catalog_match": None, "featured": True,
        "desc": "Near-black ebony foliage contrasting brilliantly against vibrant candy-pink crepe blossoms."
    },
    "Screenshot_20261006_150653.jpg": {
        "type": "plant", "name": "Black Diamond Crape Myrtle Crimson", "botanical": "Lagerstroemia indica 'Crimson'",
        "category": "Flowering Plants", "slug": "crape-myrtle-crimson", "catalog_match": None, "featured": False,
        "desc": "Dark burgundy leaves topped with rich ruby-crimson ruffled flower heads in full sun."
    },
    "Screenshot_20261006_150656.jpg": {
        "type": "accessory", "name": "AVA CRAFT Brick & Stone Patchwork Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-brick-stone-patchwork", "featured": False,
        "desc": "Handmade planter showcasing a rustic brick wall motif bordered with dark slate-stone texture."
    },
    "Screenshot_20261006_150658.jpg": {
        "type": "accessory", "name": "AVA CRAFT Red Brick Wall Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-red-brick-planter", "featured": False,
        "desc": "Charming red-brick masonry finish planter with faux mortar joints and stone accent trim."
    },
    "Screenshot_20261006_150700.jpg": {
        "type": "accessory", "name": "AVA CRAFT Grey Cobblestone Brick Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-grey-cobblestone-planter", "featured": False,
        "desc": "Weathered grey masonry brick planter with artisanal slate-relief border for rustic gardens."
    },
    "Screenshot_20261006_150702.jpg": {
        "type": "accessory", "name": "AVA CRAFT Cracked Rock Bark Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-cracked-rock-bark-planter", "featured": False,
        "desc": "Rugged fractured rock and tree bark relief planter with warm earthen wash."
    },
    "Screenshot_20261006_150703.jpg": {
        "type": "accessory", "name": "AVA CRAFT Petrified Wood Grain Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-petrified-wood-planter", "featured": True,
        "desc": "Realistic petrified timber grain finish with growth rings and organic wood textures."
    },
    "Screenshot_20261006_150705.jpg": {
        "type": "accessory", "name": "AVA CRAFT Carved Tree Trunk Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-tree-trunk-carved", "featured": True,
        "desc": "Sculpted hollow tree stump planter with realistic fissures, knots, and warm amber wood tones."
    },
    "Screenshot_20261006_150707.jpg": {
        "type": "accessory", "name": "AVA CRAFT Wooden Barrel with Metal Bands",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-wooden-barrel-planter", "featured": True,
        "desc": "Rustic wooden barrel planter detailed with faux metal rivets and golden accent straps."
    },
    "Screenshot_20261006_150709.jpg": {
        "type": "accessory", "name": "AVA CRAFT Heritage Wine Cask Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-wine-cask-planter", "featured": False,
        "desc": "Classic heritage wine stave barrel planter with deep grain definition and gold rivets."
    },
    "Screenshot_20261006_150710.jpg": {
        "type": "accessory", "name": "AVA CRAFT Cut Log Spiral Core Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-cut-log-spiral-planter", "featured": True,
        "desc": "Artisan log planter featuring an intricately carved annual growth ring spiral."
    },
    "Screenshot_20261006_150712.jpg": {
        "type": "accessory", "name": "AVA CRAFT Carved Grey Stone Block Planter",
        "category": "Decorative Planters & Pots", "slug": "ava-craft-grey-stone-block-planter", "featured": False,
        "desc": "Hand-chiseled slate-grey granite texture planter with organic geometric relief."
    },
    "Screenshot_20261006_150718.jpg": {
        "type": "plant", "name": "Adenium Desert Rose Bonsai Tray", "botanical": "Adenium obesum",
        "category": "Outdoor Plants", "subcategory": "Bonsai & Topiary", "slug": "adenium-desert-rose", "catalog_match": None, "featured": True,
        "desc": "Sculptural swollen caudex Desert Rose in an ornamental tray surrounded by rainbow pebbles."
    },
    "Screenshot_20261006_150725.jpg": {
        "type": "plant", "name": "ZZ Plant & Syngonium Trio", "botanical": "Zamioculcas zamiifolia",
        "category": "Indoor Plants", "slug": "zz-plant-syngonium-trio", "catalog_match": None, "featured": True,
        "desc": "Glossy emerald ZZ plant and variegated syngonium displayed on our vintage bicycle plant cart."
    },
    "Screenshot_20261006_150729.jpg": {
        "type": "plant", "name": "Barbados Cherry Tree with Fruit", "botanical": "Malpighia emarginata",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "barbados-cherry-plant", "catalog_match": None, "featured": True,
        "desc": "Evergreen fruiting shrub heavy with Vitamin-C rich ruby-red acerola cherries."
    },
    "Screenshot_20261006_150735.jpg": {
        "type": "accessory", "name": "AVA CRAFT Tree Trunk Waterfall Fountain",
        "category": "Garden Water Fountains", "slug": "ava-craft-tree-trunk-fountain", "featured": True,
        "desc": "Sculpted tree trunk waterfall fountain mounted on an ornate white metal garden stand."
    },
    "Screenshot_20261006_150741.jpg": {
        "type": "plant", "name": "Euphorbia Milii Miniature White", "botanical": "Euphorbia milii var. splendens",
        "category": "Flowering Plants", "slug": "euphorbia-milii-white", "catalog_match": None, "featured": False,
        "desc": "Profusion of miniature waxy cream-white flowers blooming continuously in terracotta bowl."
    },
    "Screenshot_20261006_150743.jpg": {
        "type": "plant", "name": "Moses-in-the-Cradle Purple", "botanical": "Tradescantia spathacea",
        "category": "Indoor Plants", "slug": "moses-in-the-cradle", "catalog_match": None, "featured": False,
        "desc": "Striking upright leaves with glossy olive-green uppers and rich royal purple undersides."
    },
    "Screenshot_20261006_150747.jpg": {
        "type": "plant", "name": "Dusty Miller Silver Foliage", "botanical": "Jacobaea maritima",
        "category": "Outdoor Plants", "slug": "dusty-miller-silver", "catalog_match": None, "featured": False,
        "desc": "Intricately lacy silver-grey felted leaves providing brilliant contrast in borders and containers."
    },
    "Screenshot_20261006_150749.jpg": {
        "type": "plant", "name": "Foxtail Royal Palm Trees", "botanical": "Wodyetia bifurcata",
        "category": "Outdoor Plants", "slug": "foxtail-palm-specimen", "catalog_match": None, "featured": True,
        "desc": "Mature columnar Foxtail Palms with fluffy arching fronds ready for avenue and landscape planting."
    },
    "Screenshot_20261006_150752.jpg": {
        "type": "plant", "name": "Grafted Mango Tree with Fruit", "botanical": "Mangifera indica",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "mango-tree-fruiting", "catalog_match": "mango", "featured": True,
        "desc": "Young grafted mango tree bearing heavy green mangoes right on the plant in our shade house."
    },
    "Screenshot_20261006_150754.jpg": {
        "type": "plant", "name": "Starfruit Kamrakh Saplings", "botanical": "Averrhoa carambola",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "starfruit-kamrakh", "catalog_match": None, "featured": True,
        "desc": "Healthy young Starfruit (Kamrakh) trees with bright lime foliage in nursery grow bags."
    },
    "Screenshot_20261006_150805.jpg": {
        "type": "plant", "name": "Sweet Lime Mosambi Tree with Fruit", "botanical": "Citrus limetta",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "lemon-mosambi-tree", "catalog_match": "lemon", "featured": True,
        "desc": "Prolific citrus tree laden with round green sweet limes / lemons on healthy branches."
    },
    "Screenshot_20261006_150808.jpg": {
        "type": "plant", "name": "Citrus Lemon Orchard Tree", "botanical": "Citrus limon",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "lemon", "catalog_match": "lemon", "featured": True,
        "desc": "Mature fruit-bearing lemon tree heavy with juicy green-yellow lemons against blue skies."
    },
    "Screenshot_20261006_150810.jpg": {
        "type": "plant", "name": "Grafted Mango Nursery Rows with Fruit", "botanical": "Mangifera indica",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "mango-nursery-rows", "catalog_match": "mango", "featured": False,
        "desc": "Rows of young grafted mango saplings in nursery grow bags, fruiting at just 3 feet height."
    },
    "Screenshot_20261006_150822.jpg": {
        "type": "plant", "name": "Fig Anjeer Plant with Fruit", "botanical": "Ficus carica",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "fig-anjeer-plant", "catalog_match": None, "featured": True,
        "desc": "Hardy grafted Indian fig (Anjeer) plant bearing developing fruit on a sturdy stem."
    },
    "Screenshot_20261006_150826.jpg": {
        "type": "plant", "name": "Grafted Guava Sapling Rows", "botanical": "Psidium guajava",
        "category": "Fruit Plants", "subcategory": "Summer Fruits", "slug": "guava-sapling-rows", "catalog_match": "guava", "featured": False,
        "desc": "Healthy rows of nursery-grown guava saplings displaying young developing fruit and foliage."
    },
    "Screenshot_20261006_150848.jpg": {
        "type": "logo", "name": "Dev Green Land Nursery Official Logo Graphic",
        "category": "Brand Asset", "slug": "dev-greenland-nursery-brand-graphic", "featured": False,
        "desc": "Official high-resolution graphic mark of Dev Green Land Nursery."
    }
}

def process_all_images():
    files = sorted(os.listdir(SRC_DIR))
    print(f"Starting processing of {len(files)} images...")
    
    report_rows = []
    processed_count = 0
    duplicate_count = 0
    review_count = 0
    
    for f in files:
        src_path = os.path.join(SRC_DIR, f)
        meta = METADATA.get(f)
        
        if not meta:
            # Fallback for unexpected file
            print(f"Warning: No metadata entry for {f}, flagging for review.")
            review_count += 1
            report_rows.append({
                "orig": f, "status": "Review Required", "type": "Unknown",
                "name": "Unidentified", "processed_file": "N/A", "crop": "None", "notes": "No metadata configured"
            })
            continue

        item_type = meta["type"]
        slug = meta["slug"]
        
        if item_type == "duplicate":
            duplicate_count += 1
            report_rows.append({
                "orig": f, "status": "Duplicate Omitted", "type": "Duplicate Screenshot",
                "name": f"Duplicate of {meta['target']}", "processed_file": "N/A", "crop": "None",
                "notes": f"Identified as duplicate screenshot of {meta['target']}"
            })
            continue

        if item_type == "logo":
            report_rows.append({
                "orig": f, "status": "Brand Asset", "type": "Logo Graphic",
                "name": meta["name"], "processed_file": "public/images/logo.png", "crop": "Cropped",
                "notes": "Official brand logo mark graphic"
            })
            continue

        # Determine output folder
        out_dir = PLANTS_OUT if item_type == "plant" else ACCESSORIES_OUT
        out_jpg = os.path.join(out_dir, f"{slug}.jpg")
        out_webp = os.path.join(out_dir, f"{slug}.webp")
        
        with Image.open(src_path) as img:
            # Get crop box
            if f in CROP_OVERRIDES:
                box = CROP_OVERRIDES[f]
            else:
                box = detect_photo_bounds(img)
                
            crop_img = img.crop(box)
            w, h = crop_img.size
            
            # Save WebP and JPG with high visual fidelity and Web optimization
            crop_img.save(out_jpg, "JPEG", quality=90, optimize=True)
            crop_img.save(out_webp, "WEBP", quality=85)
            
            processed_count += 1
            crop_desc = f"Box ({box[0]}, {box[1]}, {box[2]}, {box[3]}) -> {w}x{h}"
            
            report_rows.append({
                "orig": f, "status": "Successfully Processed", "type": item_type.capitalize(),
                "name": meta["name"], "processed_file": f"{item_type}s/processed/{slug}.webp",
                "crop": crop_desc, "notes": f"Botanical: {meta.get('botanical', 'N/A')} | Cat: {meta.get('category')}"
            })
            print(f"Processed [{item_type.upper()}] {f} -> {slug}.webp ({w}x{h})")

    # Generate Markdown Report
    with open(REPORT_PATH, "w") as rf:
        rf.write("# Dev Greenland Nursery — Image Processing & Catalog Report\n\n")
        rf.write(f"- **Total original images inspected:** {len(files)}\n")
        rf.write(f"- **Successfully processed into catalog:** {processed_count}\n")
        rf.write(f"- **Duplicate screenshots merged/skipped:** {duplicate_count}\n")
        rf.write(f"- **Brand assets documented:** 1\n")
        rf.write(f"- **Images needing manual review:** {review_count}\n\n")
        rf.write("## Processing Details\n\n")
        rf.write("| Original File | Type | Item Name | Status | Crop Coordinates | Processed Output |\n")
        rf.write("|---|---|---|---|---|---|\n")
        for r in report_rows:
            rf.write(f"| `{r['orig']}` | {r['type']} | **{r['name']}** | {r['status']} | `{r['crop']}` | `{r['processed_file']}` |\n")
            
    print(f"\nProcessing complete! Report generated at {REPORT_PATH}")
    print(f"Total Processed: {processed_count}, Duplicates: {duplicate_count}, Review: {review_count}")

if __name__ == "__main__":
    process_all_images()

