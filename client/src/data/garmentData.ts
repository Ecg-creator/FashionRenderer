import { Garment } from '@/types/garment';

export const garmentData: Garment[] = [
  {
    id: "t-001",
    name: "Classic T-Shirt",
    type: "tshirt",
    description: "A versatile classic t-shirt with a relaxed fit and crew neck. Made with premium cotton for everyday comfort.",
    material: {
      composition: "100% Cotton",
      weight: 180,
      stretch: "Low Stretch"
    },
    measurements: {
      size: "M",
      chest: 52,
      waist: 50,
      hip: 52,
      length: 70,
      shoulder: 45,
      sleeve: 22
    },
    construction: [
      "Overlocked seams",
      "Double-needle stitching at hem",
      "Taped neck for comfort",
      "Ribbed collar"
    ],
    careInstructions: [
      "Machine wash cold",
      "Tumble dry low",
      "Do not bleach",
      "Iron on low heat"
    ],
    tags: ["T-shirt", "Basic", "Casual", "Cotton"]
  },
  {
    id: "d-001",
    name: "Summer Dress",
    type: "dress",
    description: "A light and airy summer dress with a flared silhouette. Perfect for warm days with its breathable fabric.",
    material: {
      composition: "95% Cotton, 5% Elastane",
      weight: 150,
      stretch: "Medium Stretch"
    },
    measurements: {
      size: "S",
      chest: 46,
      waist: 38,
      hip: 48,
      length: 90,
      shoulder: 38,
      sleeve: 0
    },
    construction: [
      "French seams",
      "Gathered waistline",
      "Hidden side zipper",
      "Lined bodice"
    ],
    careInstructions: [
      "Hand wash cold",
      "Line dry",
      "Do not bleach",
      "Iron on medium heat"
    ],
    tags: ["Dress", "Summer", "Flared", "Cotton"]
  },
  {
    id: "j-001",
    name: "Tailored Jacket",
    type: "jacket",
    description: "A structured tailored jacket with a modern fit. Features notched lapels and two front flap pockets.",
    material: {
      composition: "80% Wool, 20% Polyester",
      weight: 300,
      stretch: "Low Stretch"
    },
    measurements: {
      size: "L",
      chest: 56,
      waist: 52,
      hip: 54,
      length: 75,
      shoulder: 48,
      sleeve: 64
    },
    construction: [
      "Fully lined",
      "Padded shoulders",
      "Double-breasted front",
      "Interior pockets",
      "Back vent"
    ],
    careInstructions: [
      "Dry clean only",
      "Cool iron if needed",
      "Do not wash",
      "Store on hanger"
    ],
    tags: ["Jacket", "Tailored", "Formal", "Wool"]
  }
];
