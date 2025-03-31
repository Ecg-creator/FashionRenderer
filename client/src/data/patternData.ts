import { Pattern, PatternSummary } from '../types/pattern';
import { garmentData } from './garmentData';

// Sample patterns for demonstration
export const patternSummaries: PatternSummary[] = [
  // Ergonomic patterns
  {
    id: 'erg-001',
    name: 'Adaptive Workspace Jacket',
    description: 'Ergonomic jacket designed for long periods of desk work with articulated elbows and adjustable fit.',
    primaryCategory: 'ergonomic',
    subcategory: 'ergonomic-workspace',
    skillLevel: 'intermediate',
    thumbnailUrl: '/patterns/workspace-jacket-thumb.jpg',
    tags: ['ergonomic', 'office', 'adjustable', 'comfort']
  },
  {
    id: 'erg-002',
    name: 'Posture Support Vest',
    description: 'Supportive inner vest that helps maintain proper posture during daily activities.',
    primaryCategory: 'ergonomic',
    subcategory: 'ergonomic-posture',
    skillLevel: 'intermediate',
    thumbnailUrl: '/patterns/posture-vest-thumb.jpg',
    tags: ['supportive', 'therapeutic', 'health', 'posture']
  },
  
  // Technical wearables
  {
    id: 'tech-001',
    name: 'Sensor-Ready Athletic Shirt',
    description: 'Athletic shirt with integrated pockets and channels for biometric sensors.',
    primaryCategory: 'technical',
    subcategory: 'tech-sensors',
    skillLevel: 'advanced',
    thumbnailUrl: '/patterns/sensor-shirt-thumb.jpg',
    tags: ['athletic', 'smart', 'monitoring', 'technology']
  },
  {
    id: 'tech-002',
    name: 'Temperature Adaptive Vest',
    description: 'Vest with special pockets for heating/cooling elements that adapts to body temperature.',
    primaryCategory: 'technical',
    subcategory: 'tech-heating',
    skillLevel: 'advanced',
    thumbnailUrl: '/patterns/temp-vest-thumb.jpg',
    tags: ['temperature control', 'adaptive', 'versatile', 'comfort']
  },
  
  // Outdoor & Hiking
  {
    id: 'out-001',
    name: 'All-Weather Hiking Jacket',
    description: 'Versatile jacket for various weather conditions with multiple ventilation options.',
    primaryCategory: 'outdoor',
    subcategory: 'outdoor-extreme',
    skillLevel: 'advanced',
    thumbnailUrl: '/patterns/hiking-jacket-thumb.jpg',
    tags: ['waterproof', 'breathable', 'durable', 'ventilated']
  },
  {
    id: 'out-002',
    name: 'Convertible Trekking Pants',
    description: 'Pants that easily convert to shorts with reinforced knees and multiple pockets.',
    primaryCategory: 'outdoor',
    subcategory: 'outdoor-convertible',
    skillLevel: 'intermediate',
    thumbnailUrl: '/patterns/trekking-pants-thumb.jpg',
    tags: ['convertible', 'versatile', 'durable', 'functional']
  },
  
  // Formal & Business
  {
    id: 'form-001',
    name: 'Modern Business Blazer',
    description: 'Contemporary blazer with stretch panels for improved mobility in office settings.',
    primaryCategory: 'formal',
    subcategory: 'formal-business',
    skillLevel: 'advanced',
    thumbnailUrl: '/patterns/business-blazer-thumb.jpg',
    tags: ['professional', 'comfortable', 'tailored', 'stretch']
  },
  {
    id: 'form-002',
    name: 'Architectural Evening Gown',
    description: 'Modern formal gown with innovative structural elements and clean lines.',
    primaryCategory: 'formal',
    subcategory: 'formal-modern',
    skillLevel: 'expert',
    thumbnailUrl: '/patterns/evening-gown-thumb.jpg',
    tags: ['elegant', 'modern', 'structural', 'minimalist']
  },
  
  // Ethnic & Cultural
  {
    id: 'eth-001',
    name: 'Contemporary Fusion Tunic',
    description: 'Modern tunic combining traditional embroidery techniques with contemporary silhouette.',
    primaryCategory: 'ethnic',
    subcategory: 'ethnic-fusion',
    skillLevel: 'intermediate',
    thumbnailUrl: '/patterns/fusion-tunic-thumb.jpg',
    tags: ['fusion', 'embroidery', 'contemporary', 'versatile']
  },
  {
    id: 'eth-002',
    name: 'Traditional Festival Garment',
    description: 'Authentic ceremonial garment pattern based on traditional techniques and designs.',
    primaryCategory: 'ethnic',
    subcategory: 'ethnic-traditional',
    skillLevel: 'advanced',
    thumbnailUrl: '/patterns/festival-garment-thumb.jpg',
    tags: ['traditional', 'ceremonial', 'detailed', 'cultural']
  }
];

// Full pattern detail example (just one for demonstration)
export const patternDetails: Pattern[] = [
  {
    id: 'erg-001',
    name: 'Adaptive Workspace Jacket',
    description: 'Ergonomic jacket designed for long periods of desk work with articulated elbows and adjustable fit. Features special panels that allow for greater range of motion while maintaining a professional appearance.',
    primaryCategory: 'ergonomic',
    subcategory: 'ergonomic-workspace',
    occasions: ['everyday', 'special'],
    measurements: {
      sizeRange: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      measurementPoints: [
        { name: 'Chest', description: 'Measure around the fullest part of your chest.' },
        { name: 'Waist', description: 'Measure around your natural waistline.' },
        { name: 'Hip', description: 'Measure around the fullest part of your hips.' },
        { name: 'Arm Length', description: 'Measure from shoulder point to wrist.' },
        { name: 'Back Width', description: 'Measure across the back from shoulder to shoulder.' }
      ]
    },
    pieces: [
      { name: 'Front Panels', description: 'Two front panels with princess seams for better fit.', skillLevel: 'intermediate' },
      { name: 'Back Panel', description: 'Single back panel with center pleat for movement.', skillLevel: 'intermediate' },
      { name: 'Sleeves', description: 'Articulated two-piece sleeves with elbow darts.', skillLevel: 'advanced' },
      { name: 'Collar', description: 'Convertible collar that can be worn up or down.', skillLevel: 'intermediate' },
      { name: 'Pocket Flaps', description: 'Optional decorative pocket flaps.', skillLevel: 'beginner' }
    ],
    recommendedMaterials: [
      {
        type: 'Stretch Woven',
        weight: 'Medium',
        stretch: 'Moderate (15-20%)',
        alternatives: ['Stretch Wool Blend', 'Stretch Cotton Twill', 'Technical Polyester Blend']
      },
      {
        type: 'Performance Fabric',
        weight: 'Light to Medium',
        stretch: 'High (30-40%)',
        alternatives: ['Athletic Twill', 'Softshell', 'Scuba Knit']
      }
    ],
    technicalDetails: {
      seams: ['French Seams', 'Flat-felled Seams', 'Stretch Seams'],
      closures: ['Front Zipper', 'Magnetic Snaps', 'Hidden Buttons'],
      constructionTechniques: ['Princess Seams', 'Articulated Sleeves', 'Gussets', 'Action Pleats'],
      finishingMethods: ['Bias Binding', 'Hong Kong Finish', 'Topstitching']
    },
    associatedGarments: [garmentData[0]], // Reference to existing garment
    tags: ['ergonomic', 'office', 'adjustable', 'comfort', 'professional', 'movement', 'stretch'],
    skillLevel: 'intermediate',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-10'),
    patternFiles: [
      {
        fileType: 'pdf',
        url: '/patterns/files/adaptive-workspace-jacket.pdf',
      },
      {
        fileType: 'svg',
        url: '/patterns/files/adaptive-workspace-jacket.svg',
      }
    ],
    instructionSteps: [
      {
        stepNumber: 1,
        title: 'Prepare Pattern Pieces',
        description: 'Print and cut out all pattern pieces. Transfer markings to fabric.',
        imageUrl: '/patterns/instructions/workspace-jacket-step1.jpg',
        tips: ['Use pattern weights to hold paper patterns in place while cutting.',
              'Transfer all darts, pleats, and notches carefully.']
      },
      {
        stepNumber: 2,
        title: 'Cut Fabric',
        description: 'Cut all pieces according to the layout diagram, paying attention to fabric grain.',
        imageUrl: '/patterns/instructions/workspace-jacket-step2.jpg',
        tips: ['Ensure proper grain alignment for stretch fabrics.',
              'Consider cutting a mock-up in cheaper fabric first to test fit.']
      },
      {
        stepNumber: 3,
        title: 'Construct Front Panels',
        description: 'Sew princess seams on front panels. Press seams open.',
        imageUrl: '/patterns/instructions/workspace-jacket-step3.jpg'
      },
      {
        stepNumber: 4,
        title: 'Prepare Back Panel',
        description: 'Create center back pleat and secure in place.',
        imageUrl: '/patterns/instructions/workspace-jacket-step4.jpg',
        tips: ['Topstitch pleat for extra security and professional finish.']
      },
      {
        stepNumber: 5,
        title: 'Assemble Sleeves',
        description: 'Construct two-piece sleeves, matching elbow darts for proper articulation.',
        imageUrl: '/patterns/instructions/workspace-jacket-step5.jpg'
      }
      // Additional steps would continue...
    ]
  }
];