// Pattern categories organized by different perspectives

export type PatternCategory = {
  id: string;
  name: string;
  description: string;
  subcategories: PatternSubcategory[];
}

export type PatternSubcategory = {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

// Main categories based on genre/purpose
export const patternCategories: PatternCategory[] = [
  {
    id: 'ergonomic',
    name: 'Ergonomic',
    description: 'Patterns designed for maximum comfort and mobility, with attention to body mechanics and movement patterns.',
    subcategories: [
      {
        id: 'ergonomic-workspace',
        name: 'Workspace',
        description: 'Garments optimized for long periods of sitting and computer work.',
        tags: ['office', 'comfort', 'flexibility', 'temperature control']
      },
      {
        id: 'ergonomic-adaptive',
        name: 'Adaptive Clothing',
        description: 'Designs for people with mobility challenges or disabilities.',
        tags: ['accessible', 'easy-dressing', 'inclusive', 'functional']
      },
      {
        id: 'ergonomic-posture',
        name: 'Posture Support',
        description: 'Garments with integrated posture improvement features.',
        tags: ['back support', 'alignment', 'therapeutic', 'supportive']
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical Wearables',
    description: 'Patterns that integrate technology and smart features into clothing.',
    subcategories: [
      {
        id: 'tech-sensors',
        name: 'Biometric Sensors',
        description: 'Clothing with integrated health monitoring capabilities.',
        tags: ['health-tech', 'monitoring', 'smart fabric', 'connectivity']
      },
      {
        id: 'tech-heating',
        name: 'Temperature Control',
        description: 'Garments with heating or cooling capabilities.',
        tags: ['heated', 'cooling', 'climate control', 'adaptive']
      },
      {
        id: 'tech-power',
        name: 'Power Generation',
        description: 'Clothing that generates or stores power through movement or solar.',
        tags: ['solar', 'kinetic', 'energy harvesting', 'sustainable']
      }
    ]
  },
  {
    id: 'outdoor',
    name: 'Outdoor & Hiking',
    description: 'Patterns designed for outdoor activities and various weather conditions.',
    subcategories: [
      {
        id: 'outdoor-extreme',
        name: 'Extreme Weather',
        description: 'Garments for extreme cold, heat, or wet conditions.',
        tags: ['waterproof', 'insulated', 'breathable', 'protective']
      },
      {
        id: 'outdoor-hiking',
        name: 'Hiking & Trekking',
        description: 'Specialized clothing for hiking and trekking activities.',
        tags: ['durable', 'lightweight', 'quick-dry', 'ventilated']
      },
      {
        id: 'outdoor-convertible',
        name: 'Convertible',
        description: 'Multi-functional garments that can be modified in the field.',
        tags: ['modular', 'adaptable', 'versatile', 'transformable']
      }
    ]
  },
  {
    id: 'formal',
    name: 'Formal & Business',
    description: 'Patterns for professional and formal occasions, blending tradition with comfort.',
    subcategories: [
      {
        id: 'formal-business',
        name: 'Business Attire',
        description: 'Professional clothing for everyday office wear.',
        tags: ['professional', 'tailored', 'refined', 'classic']
      },
      {
        id: 'formal-ceremonial',
        name: 'Ceremonial',
        description: 'Garments for special events and formal gatherings.',
        tags: ['elegant', 'sophisticated', 'structured', 'traditional']
      },
      {
        id: 'formal-modern',
        name: 'Modern Formal',
        description: 'Contemporary interpretations of formal wear with innovative cuts.',
        tags: ['innovative', 'contemporary', 'minimalist', 'architectural']
      }
    ]
  },
  {
    id: 'ethnic',
    name: 'Ethnic & Cultural',
    description: 'Patterns celebrating cultural heritage and traditional clothing designs.',
    subcategories: [
      {
        id: 'ethnic-fusion',
        name: 'Cultural Fusion',
        description: 'Blending traditional elements with contemporary design.',
        tags: ['hybrid', 'cross-cultural', 'innovative', 'heritage']
      },
      {
        id: 'ethnic-traditional',
        name: 'Traditional',
        description: 'Authentic patterns based on cultural clothing traditions.',
        tags: ['authentic', 'heritage', 'handcrafted', 'ceremonial']
      },
      {
        id: 'ethnic-modern',
        name: 'Modernized Ethnic',
        description: 'Updated versions of traditional clothing for everyday wear.',
        tags: ['contemporary', 'functional', 'accessible', 'wearable']
      }
    ]
  }
];

// Additional organization by occasion
export const occasionCategories = [
  {
    id: 'everyday',
    name: 'Everyday',
    description: 'Practical and comfortable clothing for daily activities.',
    subcategories: ['casual', 'workwear', 'loungewear', 'activewear']
  },
  {
    id: 'special',
    name: 'Special Occasions',
    description: 'Garments for celebrations and formal events.',
    subcategories: ['wedding', 'party', 'ceremonial', 'festival']
  },
  {
    id: 'seasonal',
    name: 'Seasonal',
    description: 'Designs optimized for specific weather conditions.',
    subcategories: ['summer', 'winter', 'spring', 'fall', 'rainy season']
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Clothing for various performance activities.',
    subcategories: ['sports', 'dance', 'theater', 'presentation']
  }
];