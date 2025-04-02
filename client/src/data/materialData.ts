import { MaterialType, MaterialCategory } from "../types/material";

// Material Categories
export const materialTypes: MaterialCategory[] = [
  {
    id: "all",
    name: "All Materials",
    description: "All materials in the library"
  },
  {
    id: "fabrics",
    name: "Fabrics",
    description: "All types of textiles and fabrics",
    subcategories: ["cotton", "wool", "silk", "synthetic", "blends"]
  },
  {
    id: "buttons",
    name: "Buttons",
    description: "Various button types and styles",
    subcategories: ["sew-through", "shank", "snap", "toggle"]
  },
  {
    id: "trims",
    name: "Trims & Accessories",
    description: "Zippers, ribbons, and other decorative elements",
    subcategories: ["zippers", "ribbons", "lace", "piping", "elastic"]
  }
];

// Fabric types based on the available images and documents
export const fabricTypes: MaterialType[] = [
  {
    id: "boxy-shirt-fabric",
    name: "Boxy Shirt Cotton",
    description: "Premium cotton fabric ideal for boxy shirt designs with a relaxed fit",
    category: "Fabric",
    imageUrl: "/materials/Boxy_Shirt.jpg",
    thumbnailUrl: "/materials/Boxy_Shirt.jpg",
    inStock: true,
    price: 14.99,
    priceUnit: "/meter",
    composition: "100% Cotton",
    weight: 180,
    width: 150,
    stretch: "Minimal",
    tags: ["Cotton", "Shirt Fabric", "Medium Weight", "Natural Fiber"],
    supplier: {
      name: "Premium Textiles Ltd.",
      origin: "India",
      leadTime: "2-3 weeks"
    },
    careInstructions: [
      "Machine wash cold with like colors",
      "Tumble dry low",
      "Warm iron if needed",
      "Do not bleach"
    ],
    properties: [
      { name: "Breathability", value: "High" },
      { name: "Durability", value: "Medium-High" },
      { name: "Opacity", value: "Medium" },
      { name: "Hand Feel", value: "Soft" }
    ],
    specifications: [
      { name: "Weave", value: "Plain" },
      { name: "Thread Count", value: "120" },
      { name: "Finish", value: "Soft Wash" },
      { name: "Shrinkage", value: "<2%" }
    ],
    certifications: ["OEKO-TEX Standard 100", "GOTS Certified Organic"],
    performanceData: [
      { name: "Wash Durability", value: "4.5/5" },
      { name: "Color Fastness", value: "4/5" },
      { name: "Pilling Resistance", value: "3.5/5" },
      { name: "Tear Strength", value: "Good" }
    ],
    sustainabilityRating: {
      water: "B-",
      carbon: "B",
      overall: "B"
    },
    recommendedApplications: [
      "Button-up Shirts",
      "Casual Tops",
      "Shirt Dresses",
      "Sleepwear"
    ],
    sewingDetails: [
      "Use universal needle size 80/12",
      "Suitable for various seam types including French seams",
      "Medium-weight interfacing recommended for collars and cuffs",
      "Pre-wash fabric before cutting to prevent shrinkage"
    ]
  },
  {
    id: "tpose-shirt-fabric",
    name: "T-Pose Lightweight Cotton",
    description: "Lightweight cotton perfect for t-shirts and casual summer wear",
    category: "Fabric",
    imageUrl: "/materials/Boxy_Shirt_Tpose.jpg",
    thumbnailUrl: "/materials/Boxy_Shirt_Tpose.jpg",
    inStock: true,
    price: 12.50,
    priceUnit: "/meter",
    composition: "100% Cotton",
    weight: 150,
    width: 160,
    stretch: "Minimal",
    tags: ["Cotton", "T-shirt", "Lightweight", "Summer", "Natural Fiber"],
    supplier: {
      name: "EcoTextiles",
      origin: "Turkey",
      leadTime: "1-2 weeks"
    },
    careInstructions: [
      "Machine wash warm",
      "Tumble dry medium",
      "Iron medium heat",
      "Do not bleach"
    ],
    properties: [
      { name: "Breathability", value: "Very High" },
      { name: "Durability", value: "Medium" },
      { name: "Opacity", value: "Low-Medium" },
      { name: "Hand Feel", value: "Very Soft" }
    ],
    specifications: [
      { name: "Weave", value: "Jersey" },
      { name: "Thread Count", value: "100" },
      { name: "Finish", value: "Silicone Wash" },
      { name: "Shrinkage", value: "3-4%" }
    ],
    certifications: ["OEKO-TEX Standard 100"],
    recommendedApplications: [
      "T-shirts",
      "Casual Tops",
      "Summer Garments",
      "Loungewear"
    ],
    sewingDetails: [
      "Use ballpoint needle size 70/10",
      "Use stretch stitch for hems",
      "Lightweight stabilizer recommended for necklines",
      "Always pre-wash to account for shrinkage"
    ]
  },
  {
    id: "diagonal-fabric-01",
    name: "Diagonal Stripe Linen Blend",
    description: "Medium-weight linen blend with diagonal pattern, perfect for structured garments",
    category: "Fabric",
    imageUrl: "/materials/Diagonal_01.jpg",
    thumbnailUrl: "/materials/Diagonal_01.jpg",
    inStock: true,
    price: 19.99,
    composition: "55% Linen, 45% Cotton",
    weight: 220,
    width: 140,
    stretch: "None",
    tags: ["Linen Blend", "Structured", "Diagonal Pattern", "Medium Weight"],
    supplier: {
      name: "European Textile Imports",
      origin: "Italy",
      leadTime: "3-4 weeks"
    },
    careInstructions: [
      "Dry clean recommended",
      "Hand wash cold if necessary",
      "Line dry only",
      "Warm iron on reverse"
    ],
    properties: [
      { name: "Breathability", value: "High" },
      { name: "Drape", value: "Structured" },
      { name: "Texture", value: "Slightly Rough" }
    ],
    recommendedApplications: [
      "Structured Jackets",
      "Pants",
      "Skirts",
      "Summer Blazers"
    ]
  },
  {
    id: "diagonal-fabric-02",
    name: "Diagonal Herringbone Wool",
    description: "Classic herringbone wool with diagonal pattern for premium tailored garments",
    category: "Fabric",
    imageUrl: "/materials/Diagonal_02.jpg",
    thumbnailUrl: "/materials/Diagonal_02.jpg",
    inStock: true,
    price: 29.99,
    composition: "100% Wool",
    weight: 280,
    width: 150,
    stretch: "Minimal",
    tags: ["Wool", "Herringbone", "Tailoring", "Diagonal Pattern", "Winter"],
    supplier: {
      name: "Scottish Woolens",
      origin: "UK",
      leadTime: "3-4 weeks"
    },
    careInstructions: [
      "Dry clean only",
      "Steam to refresh",
      "Store with cedar blocks"
    ],
    properties: [
      { name: "Insulation", value: "High" },
      { name: "Durability", value: "Very High" },
      { name: "Drape", value: "Structured with Movement" }
    ],
    recommendedApplications: [
      "Tailored Suits",
      "Winter Coats",
      "Structured Skirts",
      "Premium Outerwear"
    ]
  },
  {
    id: "gradation-fabric-01",
    name: "Gradation Blue Denim",
    description: "Medium-weight blue denim with tonal gradation effect, perfect for contemporary denim designs",
    category: "Fabric",
    imageUrl: "/materials/Gradation_01.jpg",
    thumbnailUrl: "/materials/Gradation_01.jpg",
    inStock: true,
    price: 16.50,
    composition: "98% Cotton, 2% Elastane",
    weight: 10.5,
    unit: "oz",
    width: 150,
    stretch: "2-Way",
    tags: ["Denim", "Stretch", "Gradation", "Medium Weight", "Blue"],
    supplier: {
      name: "Modern Denim Mills",
      origin: "Turkey",
      leadTime: "2-3 weeks"
    },
    careInstructions: [
      "Wash inside out in cold water",
      "Tumble dry low or line dry",
      "Avoid excessive washing to maintain gradation effect"
    ],
    properties: [
      { name: "Durability", value: "Very High" },
      { name: "Comfort", value: "Medium-High" },
      { name: "Unique Effect", value: "Tonal Gradation" }
    ],
    recommendedApplications: [
      "Contemporary Jeans",
      "Denim Jackets",
      "Skirts",
      "Fashion-forward Denim Pieces"
    ]
  },
  {
    id: "gradation-fabric-02",
    name: "Pink Gradation Cotton",
    description: "Soft cotton fabric with gentle pink gradation effect for fashion-forward designs",
    category: "Fabric",
    imageUrl: "/materials/Gradation_02.jpg",
    thumbnailUrl: "/materials/Gradation_02.jpg",
    inStock: true,
    price: 17.99,
    composition: "100% Cotton",
    weight: 180,
    width: 145,
    stretch: "None",
    tags: ["Cotton", "Gradation", "Pink", "Medium Weight", "Fashion Forward"],
    supplier: {
      name: "Designer Textile Group",
      origin: "Japan",
      leadTime: "3-4 weeks"
    },
    careInstructions: [
      "Hand wash cold",
      "Line dry in shade to preserve color gradation",
      "Low iron if needed"
    ],
    recommendedApplications: [
      "Statement Dresses",
      "Artistic Tops",
      "Fashion Accessories",
      "Design-focused Garments"
    ]
  },
  {
    id: "gradation-fabric-03",
    name: "Green Gradation Satin",
    description: "Luxurious satin fabric with a green hue gradation, perfect for evening wear and special occasions",
    category: "Fabric",
    imageUrl: "/materials/Gradation_03.jpg",
    thumbnailUrl: "/materials/Gradation_03.jpg",
    inStock: true,
    price: 24.99,
    composition: "85% Polyester, 15% Silk",
    weight: 140,
    width: 150,
    stretch: "Minimal",
    tags: ["Satin", "Green", "Gradation", "Evening Wear", "Lightweight"],
    supplier: {
      name: "Luxury Fabric Imports",
      origin: "South Korea",
      leadTime: "2-3 weeks"
    },
    careInstructions: [
      "Dry clean recommended",
      "Hand wash cold if necessary",
      "Line dry",
      "Low iron on reverse"
    ],
    properties: [
      { name: "Sheen", value: "High" },
      { name: "Drape", value: "Flowing" },
      { name: "Color Effect", value: "Subtle Gradation" }
    ],
    recommendedApplications: [
      "Evening Gowns",
      "Special Occasion Dresses",
      "Luxury Blouses",
      "Statement Linings"
    ]
  },
  {
    id: "gradation-fabric-04",
    name: "Natural Gradation Linen",
    description: "Natural linen fabric with subtle beige to white gradation, perfect for elevated casual wear",
    category: "Fabric",
    imageUrl: "/materials/Gradation_04.jpg",
    thumbnailUrl: "/materials/Gradation_04.jpg",
    inStock: true,
    price: 21.99,
    composition: "100% Linen",
    weight: 200,
    width: 140,
    stretch: "None",
    tags: ["Linen", "Natural", "Gradation", "Medium Weight", "Summer"],
    supplier: {
      name: "European Linen Collective",
      origin: "Lithuania",
      leadTime: "2-3 weeks"
    },
    careInstructions: [
      "Machine wash cold on gentle",
      "Tumble dry low or line dry",
      "Steam or iron while damp",
      "Expect natural wrinkling"
    ],
    properties: [
      { name: "Breathability", value: "Very High" },
      { name: "Texture", value: "Natural Slub" },
      { name: "Color Effect", value: "Earthy Gradation" }
    ],
    recommendedApplications: [
      "Summer Dresses",
      "Relaxed Pants",
      "Resort Wear",
      "Casual-Luxe Jackets"
    ]
  },
  {
    id: "gradation-fabric-05",
    name: "Purple Gradation Silk",
    description: "Luxurious silk fabric with a striking purple to lavender gradation, ideal for high-end fashion",
    category: "Fabric",
    imageUrl: "/materials/Gradation_05.jpg",
    thumbnailUrl: "/materials/Gradation_05.jpg",
    inStock: false,
    price: 39.99,
    composition: "100% Silk",
    weight: 120,
    width: 138,
    stretch: "None",
    tags: ["Silk", "Purple", "Gradation", "Lightweight", "Luxury"],
    supplier: {
      name: "Silk Road Imports",
      origin: "China",
      leadTime: "4-5 weeks"
    },
    careInstructions: [
      "Dry clean only",
      "Store rolled in acid-free tissue",
      "Avoid prolonged sun exposure"
    ],
    properties: [
      { name: "Sheen", value: "Natural Luster" },
      { name: "Drape", value: "Fluid" },
      { name: "Touch", value: "Exceptionally Soft" }
    ],
    recommendedApplications: [
      "Designer Gowns",
      "Luxury Blouses",
      "Evening Wear",
      "High-End Fashion Pieces"
    ]
  },
  {
    id: "vignette-fabric-01",
    name: "Dark Vignette Denim",
    description: "Premium dark denim with artistic vignette effect around edges, creating depth and character",
    category: "Fabric",
    imageUrl: "/materials/Vignette_01.jpg",
    thumbnailUrl: "/materials/Vignette_01.jpg",
    inStock: true,
    price: 19.99,
    composition: "100% Cotton",
    weight: 12,
    unit: "oz",
    width: 145,
    stretch: "None",
    tags: ["Denim", "Dark Wash", "Vignette Effect", "Heavy Weight", "Premium"],
    supplier: {
      name: "Artisanal Denim Collective",
      origin: "Japan",
      leadTime: "3-4 weeks"
    },
    careInstructions: [
      "Wash inside out in cold water",
      "Line dry",
      "Avoid frequent washing to preserve effect",
      "Dry clean for best color preservation"
    ],
    properties: [
      { name: "Durability", value: "Extremely High" },
      { name: "Unique Effect", value: "Dark Vignette" },
      { name: "Break-in", value: "Develops Character Over Time" }
    ],
    recommendedApplications: [
      "Premium Denim Jeans",
      "Statement Jackets",
      "Designer Outerwear",
      "High-End Denim Pieces"
    ]
  },
  {
    id: "vignette-fabric-07",
    name: "Vintage Gray Canvas",
    description: "Durable gray canvas fabric with a slight vignette effect, perfect for utilitarian designs",
    category: "Fabric",
    imageUrl: "/materials/Vignette_07.jpg",
    thumbnailUrl: "/materials/Vignette_07.jpg",
    inStock: true,
    price: 15.99,
    composition: "100% Cotton Canvas",
    weight: 320,
    width: 150,
    stretch: "None",
    tags: ["Canvas", "Gray", "Vignette Effect", "Heavy Weight", "Workwear"],
    supplier: {
      name: "Industrial Textile Supply",
      origin: "USA",
      leadTime: "1-2 weeks"
    },
    careInstructions: [
      "Machine wash cold",
      "Tumble dry low",
      "Will soften and develop character with washing"
    ],
    properties: [
      { name: "Durability", value: "Extremely High" },
      { name: "Abrasion Resistance", value: "Excellent" },
      { name: "Unique Effect", value: "Subtle Vignette" }
    ],
    recommendedApplications: [
      "Utility Jackets",
      "Workwear",
      "Heavy Duty Bags",
      "Structured Outerwear"
    ]
  }
];

// Button types based on the provided .btn files
export const buttonTypes: MaterialType[] = [
  {
    id: "sew-through-button-01-cross",
    name: "Cross Stitch Button (Type 01)",
    description: "Classic 4-hole button with cross stitch pattern, medium size",
    category: "Button",
    imageUrl: "/materials/Vignette_02.jpg", // Using a placeholder image
    thumbnailUrl: "/materials/Vignette_02.jpg",
    inStock: true,
    price: 0.75,
    priceUnit: "/piece",
    color: "#8B4513",
    tags: ["Button", "Cross Stitch", "4-hole", "Medium", "Classic"],
    supplier: {
      name: "Fashion Buttons Inc.",
      origin: "Italy",
      leadTime: "1-2 weeks"
    },
    buttonDetails: {
      size: "18mm",
      holes: 4,
      material: "Polyester",
      finishType: "Matte"
    },
    buttonStyles: ["Cross Stitch", "Classic", "Type 01"],
    recommendedApplications: [
      "Shirts",
      "Blouses",
      "Light Jackets",
      "Dresses"
    ]
  },
  {
    id: "sew-through-button-01-parallel",
    name: "Parallel Stitch Button (Type 01)",
    description: "Classic 4-hole button with parallel stitch pattern, medium size",
    category: "Button",
    imageUrl: "/materials/Vignette_03.jpg", // Using a placeholder image
    thumbnailUrl: "/materials/Vignette_03.jpg",
    inStock: true,
    price: 0.75,
    priceUnit: "/piece",
    color: "#8B4513",
    tags: ["Button", "Parallel Stitch", "4-hole", "Medium", "Classic"],
    supplier: {
      name: "Fashion Buttons Inc.",
      origin: "Italy",
      leadTime: "1-2 weeks"
    },
    buttonDetails: {
      size: "18mm",
      holes: 4,
      material: "Polyester",
      finishType: "Matte"
    },
    buttonStyles: ["Parallel Stitch", "Classic", "Type 01"],
    recommendedApplications: [
      "Shirts",
      "Blouses",
      "Light Jackets",
      "Dresses"
    ]
  },
  {
    id: "sew-through-button-02-square",
    name: "Square Pattern Button (Type 02)",
    description: "Modern 4-hole button with square stitch pattern, large size",
    category: "Button",
    imageUrl: "/materials/Vignette_04.jpg", // Using a placeholder image
    thumbnailUrl: "/materials/Vignette_04.jpg",
    inStock: true,
    price: 0.95,
    priceUnit: "/piece",
    color: "#2F4F4F",
    tags: ["Button", "Square Stitch", "4-hole", "Large", "Modern"],
    supplier: {
      name: "Contemporary Button Co.",
      origin: "Germany",
      leadTime: "2 weeks"
    },
    buttonDetails: {
      size: "22mm",
      holes: 4,
      material: "Plastic",
      finishType: "Semi-Gloss"
    },
    buttonStyles: ["Square Stitch", "Modern", "Type 02"],
    recommendedApplications: [
      "Coats",
      "Heavy Jackets",
      "Cardigans",
      "Outerwear"
    ]
  },
  {
    id: "sew-through-button-03-cross",
    name: "Premium Cross Stitch Button (Type 03)",
    description: "Premium quality 4-hole button with cross stitch pattern, medium size",
    category: "Button",
    imageUrl: "/materials/Vignette_05.jpg", // Using a placeholder image 
    thumbnailUrl: "/materials/Vignette_05.jpg",
    inStock: true,
    price: 1.25,
    priceUnit: "/piece",
    color: "#000000",
    tags: ["Button", "Cross Stitch", "4-hole", "Premium", "Medium"],
    supplier: {
      name: "Luxury Button Imports",
      origin: "France",
      leadTime: "2-3 weeks"
    },
    buttonDetails: {
      size: "20mm",
      holes: 4,
      material: "Horn",
      finishType: "Polished"
    },
    buttonStyles: ["Cross Stitch", "Premium", "Type 03"],
    recommendedApplications: [
      "Luxury Shirts",
      "Designer Blouses",
      "Premium Jackets",
      "High-End Garments"
    ]
  }
];

// Trim types
export const trimTypes: MaterialType[] = [
  {
    id: "metallic-zipper-gold",
    name: "Metallic Gold Zipper",
    description: "Premium gold-tone metal zipper with smooth operation, ideal for luxury garments",
    category: "Trim",
    imageUrl: "/materials/Vignette_06.jpg", // Using a placeholder image
    thumbnailUrl: "/materials/Vignette_06.jpg",
    inStock: true,
    price: 3.99,
    priceUnit: "/piece",
    color: "#D4AF37",
    tags: ["Zipper", "Gold", "Metal", "Premium", "Luxury"],
    supplier: {
      name: "Global Trim Supply",
      origin: "Japan",
      leadTime: "2 weeks"
    },
    properties: [
      { name: "Length", value: "20cm" },
      { name: "Material", value: "Metal" },
      { name: "Type", value: "Separating" },
      { name: "Pull Type", value: "Standard" }
    ],
    recommendedApplications: [
      "Luxury Jackets",
      "High-End Skirts",
      "Designer Dresses",
      "Premium Accessories"
    ]
  },
  {
    id: "cotton-lace-trim",
    name: "Delicate Cotton Lace Trim",
    description: "Fine cotton lace trim with scalloped edge, perfect for adding feminine details",
    category: "Trim",
    imageUrl: "/materials/Vignette_01.jpg", // Using a placeholder image
    thumbnailUrl: "/materials/Vignette_01.jpg",
    inStock: true,
    price: 2.49,
    priceUnit: "/meter",
    color: "#FFFFFF",
    tags: ["Lace", "Cotton", "Scalloped", "Delicate", "Feminine"],
    supplier: {
      name: "European Lace House",
      origin: "France",
      leadTime: "2-3 weeks"
    },
    properties: [
      { name: "Width", value: "3.5cm" },
      { name: "Material", value: "100% Cotton" },
      { name: "Edge", value: "Scalloped" },
      { name: "Pattern", value: "Floral" }
    ],
    recommendedApplications: [
      "Lingerie",
      "Bridal Wear",
      "Blouses",
      "Dress Hems",
      "Sleepwear"
    ]
  },
  {
    id: "grosgrain-ribbon",
    name: "Navy Grosgrain Ribbon",
    description: "Sturdy woven grosgrain ribbon with distinctive ribbed texture, excellent for trims and bindings",
    category: "Trim",
    imageUrl: "/materials/Gradation_01.jpg", // Using a placeholder image
    thumbnailUrl: "/materials/Gradation_01.jpg",
    inStock: true,
    price: 1.99,
    priceUnit: "/meter",
    color: "#000080",
    tags: ["Ribbon", "Grosgrain", "Navy", "Structured", "Durable"],
    supplier: {
      name: "Ribbon & Trim Specialists",
      origin: "USA",
      leadTime: "1 week"
    },
    properties: [
      { name: "Width", value: "2.5cm" },
      { name: "Material", value: "Polyester" },
      { name: "Texture", value: "Ribbed" },
      { name: "Edge", value: "Cut" }
    ],
    recommendedApplications: [
      "Waistbands",
      "Hems",
      "Facings",
      "Embellishments",
      "Hat Bands"
    ]
  }
];