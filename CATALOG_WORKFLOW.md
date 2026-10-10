# Dev Greenland Nursery — Catalog & Image Processing Workflow

This guide details the complete asset pipeline, catalog architecture, and step-by-step instructions for adding new authentic photographs of plants and garden accessories to the **Dev Greenland Nursery** website.

---

## 1. Catalog Architecture Overview

```
Dev_Greenland/
├── picturesofplants/                 # Raw original photographs & Instagram screenshots (Untouched)
├── scripts/
│   ├── process_nursery_catalog.py   # Automated bounding-box cropping & WebP/JPG generator
│   └── generate_plants_js.py        # Plant dataset generator with complete botanical details
├── public/
│   └── images/
│       ├── plants/processed/        # Cropped, optimized authentic plant photos (.webp & .jpg)
│       └── accessories/processed/   # Cropped, optimized garden accessories & planters (.webp & .jpg)
├── src/
│   ├── data/
│   │   ├── plants.js                # Source of truth for all nursery plants (59 catalog items)
│   │   └── accessories.js           # Source of truth for planters, water fountains & stands (36+ items)
│   ├── components/
│   │   ├── PlantCard.jsx            # Botanical plant card with hover lift & badges
│   │   ├── AccessoryCard.jsx        # Garden accessory card with spec modal & WhatsApp inquiry
│   │   └── AccessoriesSection.jsx   # Homepage showcase for planters & water fountains
│   └── pages/
│       ├── Plants.jsx               # Filterable & searchable plant catalog
│       ├── PlantDetail.jsx          # Botanical detail page with WhatsApp inquiry & care guide
│       └── Accessories.jsx          # Dedicated garden accessories & decor catalog
└── IMAGE_PROCESSING_REPORT.md       # Audit report of all 119 inspected nursery screenshots
```

---

## 2. Image Processing Pipeline

The script `scripts/process_nursery_catalog.py` reads original images from `picturesofplants/` and:
1. **Detects letterboxes & UI chrome**: Scans horizontal and vertical slices to detect solid background colors (e.g. Instagram dark mode `#0a0e11`, white letterboxes, or system status bars).
2. **Crops cleanly**: Preserves 100% of the plant foliage, flowers, stems, and pots while removing captions, icons, and borders.
3. **Optimizes**: Converts each image to next-gen **WebP** at 85% quality and standard **JPG** at 90% quality with bicubic resampling.
4. **Never alters original files**: All files in `picturesofplants/` remain untouched in their pristine original form.

---

## 3. How to Add New Plant Photographs

Follow these simple steps whenever you capture new nursery photos or save screenshots:

### Step 1: Save the Photo
Drop the new image into `picturesofplants/`.
*Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`*

### Step 2: Run the Image Processor
Execute the script from the project root:
```bash
python3 scripts/process_nursery_catalog.py
```
This automatically processes any new photos, identifies their boundaries, and outputs optimized files into:
- `public/images/plants/processed/<slug>.webp`
- `public/images/plants/processed/<slug>.jpg`

### Step 3: Add to `src/data/plants.js`
Open `src/data/plants.js` and add an entry to the `plants` array:

```javascript
{
  id: "your-plant-slug",
  name: "Common Plant Name",
  botanicalName: "Genus species",
  category: "Indoor Plants", // or "Outdoor Plants", "Fruit Plants", "Flowering Plants", "Seasonal Plants"
  subcategory: "Foliage Plants",
  season: "All Season",
  image: "/images/plants/processed/your-plant-slug.webp",
  originalPhotoAvailable: true,
  shortDescription: "One concise sentence summarizing the plant.",
  description: "Detailed botanical description, nursery care background, and cultural significance.",
  sunlight: "Bright Indirect Light",
  watering: "Moderate",
  height: "2–3 ft",
  careLevel: "Easy",
  floweringSeason: "Spring to Autumn", // or null for non-flowering
  featured: false, // Set to true to showcase on homepage
  tags: ["indoor", "air-purifier", "real-photo"]
}
```

---

## 4. How to Add New Garden Accessories & Planters

If the photo depicts a planter, pot, water fountain, or stand:

### Step 1: Add Image to `picturesofplants/`
Place the photo in `picturesofplants/`.

### Step 2: Run the Processor
```bash
python3 scripts/process_nursery_catalog.py
```
The asset is output to `public/images/accessories/processed/<slug>.webp`.

### Step 3: Add to `src/data/accessories.js`
Open `src/data/accessories.js` and append to the `accessories` array:

```javascript
{
  id: "your-accessory-slug",
  name: "Handcrafted Stone Planter",
  category: "Decorative Planters & Pots", // Options below
  image: "/images/accessories/processed/your-accessory-slug.webp",
  shortDescription: "A durable weather-resistant planter suitable for outdoor lawns and indoor foyers.",
  description: "Comprehensive product description highlighting texture, drainage, and artistic craft.",
  material: "Carved Stone Composite / Ceramic / Wrought Iron",
  dimensions: "16\" diameter x 14\" height",
  usage: "Outdoor Garden, Patio, Indoor Living",
  featured: true, // true to show in the homepage showcase
  inStock: true,
  tags: ["planter", "stone", "ava-craft", "outdoor"]
}
```

### Supported Accessory Categories:
- `Decorative Planters & Pots`
- `Garden Water Fountains`
- `Plant Stands & Racks`
- `Coir & Hanging Decor`
- `Tools & Plant Care`

---

## 5. Verification & Testing

After updating either data file, verify that the website builds without errors:

```bash
# 1. Test production build
npm run build

# 2. Run local development server
npm run dev
```

Visit:
- `http://localhost:5173/` — Verify homepage hero, featured plants, categories, and the new **Garden Accessories & Decor** section.
- `http://localhost:5173/plants` — Browse the full 59-plant botanical catalog with real photos.
- `http://localhost:5173/accessories` — Browse the full garden accessories catalog with category filters and instant WhatsApp ordering.
- `http://localhost:5173/plant/<id>` — View individual plant care guidelines and nursery inquiry options.

