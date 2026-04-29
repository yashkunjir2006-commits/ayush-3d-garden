export const ayushPlants = [
  {
    id: "calotropis-gigantea",
    botanicalName: "Calotropis gigantea",
    commonName: "Crown Flower / Aak / Madar",
    category: "Ayurveda",
    systems: ["Ayurveda", "Siddha", "Unani", "Folk Medicine"],
    medicinalUses: [
      "Treatment of skin diseases",
      "Pain relief and anti-inflammatory",
      "Respiratory disorders (asthma, cough)",
      "Digestive issues",
      "Wound healing"
    ],
    region: "Widely found in India, Southeast Asia, and tropical regions",
    scientificClassification: "Family: Apocynaceae",
    summary: "A hardy medicinal shrub known for its milky latex and traditional use in treating skin conditions, respiratory problems, and inflammation. It holds significant importance in Ayurveda and cultural practices.",
    images: ['/images/WhatsApp Image 2026-04-26 at 22.27.51.jpg'],
    audioNarration: "/audio/calotropis.mp3"
  },
  {
    id: "tradescantia-pallida",
    botanicalName: "Tradescantia pallida",
    commonName: "Purple Heart / Purple Queen",
    category: "Ornamental",
    systems: ["Folk Use"],
    medicinalUses: [
      "Traditionally used for minor wound healing",
      "Anti-inflammatory properties (folk use)",
      "Used in herbal remedies in some cultures"
    ],
    region: "Native to Mexico, widely grown in tropical and subtropical regions",
    scientificClassification: "Family: Commelinaceae",
    summary: "A striking purple-leaved ornamental plant commonly used in landscaping. While mainly decorative, it has minor traditional medicinal uses in some cultures.",
    images: ['/images/WhatsApp Image 2026-04-26 at 22.27.51 (1).jpg'],
    audioNarration: "/audio/tradescantia.mp3"
  },
  {
    id: "ipomoea-purpurea",
    botanicalName: "Ipomoea purpurea",
    commonName: "Morning Glory",
    category: "Ayurveda",
    systems: ["Ayurveda", "Homeopathy"],
    medicinalUses: [
      "Traditional purgative",
      "Digestive issues",
      "Folk remedies"
    ],
    region: "Cultivated in gardens across India",
    scientificClassification: "Family: Convolvulaceae",
    summary: "Known for its beautiful purple flowers, parts of this plant have been used traditionally as a purgative.",
    images: ['/images/WhatsApp Image 2026-04-26 at 22.27.51 (2).jpg'],
    audioNarration: "/audio/ipomoea.mp3"
  },
  {
    id: "alternanthera-ficoidea",
    botanicalName: "Alternanthera ficoidea",
    commonName: "Joyweed",
    category: "Ayurveda",
    systems: ["Ayurveda", "Folk Medicine"],
    medicinalUses: [
      "Skin conditions",
      "Inflammation relief",
      "Wound healing"
    ],
    region: "Tropical and subtropical regions",
    scientificClassification: "Family: Amaranthaceae",
    summary: "A vibrant plant often used in traditional medicine for its anti-inflammatory properties.",
    images: ['/images/WhatsApp Image 2026-04-26 at 22.27.51 (3).jpg'],
    audioNarration: "/audio/alternanthera.mp3"
  },
  {
    id: 'plumeria-rubra',
    botanicalName: 'Plumeria rubra',
    commonName: 'Frangipani (Champa)',
    category: 'Ayurveda',
    systems: ['Ayurveda', 'Unani'],
    medicinalUses: ['Rheumatism relief', 'Wound healing', 'Skin conditions'],
    region: 'Tropical regions of India',
    scientificClassification: 'Family: Apocynaceae',
    summary: 'Known for its fragrant flowers, its bark and leaves are used in traditional remedies for skin and joint issues.',
    images: ['/images/WhatsApp Image 2026-04-26 at 22.27.51 (5).jpg'],
    audioNarration: '/audio/plumeria.mp3'
  },
  {
    id: 'tradescantia-pallida',
    botanicalName: 'Tradescantia pallida',
    commonName: 'Purple Heart',
    category: 'Ayurveda',
    systems: ['Folk Medicine'],
    medicinalUses: ['Anti-inflammatory', 'Antioxidant properties', 'Air purification'],
    region: 'Ornamental plant in Indian gardens',
    scientificClassification: 'Family: Commelinaceae',
    summary: 'A popular ornamental plant that also possesses antioxidant properties and improves indoor air quality.',
    images: ['/images/WhatsApp Image 2026-04-26 at 22.27.51 (6).jpg'],
    audioNarration: '/audio/tradescantia.mp3'
  }
];

// Extract distinct categories
export const categories = ["All", ...new Set(ayushPlants.map(p => p.category))];

export const plantImageFilenames = ayushPlants.map((plant) => ({
  id: plant.id,
  commonName: plant.commonName,
  filename: plant.images[0].replace('/images/', '')
}));

export const categoryHighlights = [
  {
    title: 'Ayurveda Canopy',
    count: ayushPlants.filter((plant) => plant.category === 'Ayurveda').length,
    description: 'Rejuvenative plants, digestive herbs, tonic fruits, and classical Ayurvedic botanicals.',
    image: '/images/tulsi.jpg'
  },
  {
    title: 'Unani Courtyard',
    count: ayushPlants.filter((plant) => plant.category === 'Unani').length,
    description: 'Digestive seeds, cleansing herbs, and soothing plants widely discussed in Unani practice.',
    image: '/images/senna.jpg'
  },
  {
    title: 'Siddha Valley',
    count: ayushPlants.filter((plant) => plant.category === 'Siddha').length,
    description: 'South Indian medicinal herbs arranged for respiratory, digestive, and general wellness learning.',
    image: '/images/nilavembu.jpg'
  }
];

export const ayushStats = [
  {
    label: 'Plant Records',
    value: `${ayushPlants.length}`,
    detail: 'Curated medicinal plant records for classroom-friendly AYUSH browsing.'
  },
  {
    label: 'Healing Systems',
    value: '5',
    detail: 'Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy.'
  },
  {
    label: 'Multi-System Plants',
    value: `${ayushPlants.filter((plant) => plant.systems.length > 1).length}`,
    detail: 'Several plants now reflect their use across more than one AYUSH tradition.'
  },
  {
    label: 'Future Features',
    value: '3D + Audio',
    detail: 'Ready for narration, model integration, and deeper interactive learning.'
  }
];

export const featuredPlants = [
  ayushPlants.find((plant) => plant.id === 'ocimum-tenuiflorum'),
  ayushPlants.find((plant) => plant.id === 'murraya-koenigii'),
  ayushPlants.find((plant) => plant.id === 'lawsonia-inermis')
];
