import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'sb-01',
    name: 'Glowing Vitamin C + E Serum',
    category: 'Skincare',
    price: 149000,
    originalPrice: 189000,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    description: 'A powerful, fast-absorbing Vitamin C serum blended with Vitamin E and Hyaluronic Acid. Designed to fade dark spots, brighten uneven skin tone, boost collagen, and deliver a brilliant daily glow while protecting against environmental stressors.',
    rating: 4.9,
    reviewsCount: 142,
    stock: 24,
    benefits: [
      'Brightens hyperpigmentation and fades dark spots',
      'Boosts skin elasticity and reduces fine lines',
      'Provides deep hydration and long-lasting lock-in moisture',
      'Neutralizes harmful free radicals and UV damage'
    ],
    ingredients: 'Water, Sodium Ascorby Phosphate (Vitamin C), Tocopheryl Acetate (Vitamin E), Hyaluronic Acid, Aloe Barbadensis Leaf Juice, Glycerin, Ferulic Acid, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: 'Apply 3-5 drops of serum to clean, dry facial skin each morning. Gently press into the skin using your fingertips. Follow with moisturizer and mineral sunscreen.'
  },
  {
    id: 'sb-02',
    name: 'Matte Velvet Liquid Lipstick',
    category: 'Makeup',
    price: 89000,
    originalPrice: 109000,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    description: 'An ultra-pigmented liquid lipstick that glides on like a dream and dries down to a velvety matte finish. Infused with Shea Butter and Jojoba Oil to keep your lips moist and comfortable for up to 16 hours without cracking.',
    rating: 4.8,
    reviewsCount: 98,
    stock: 45,
    benefits: [
      '16-hour long-wear smudge-proof formula',
      'Deeply moisturizing with natural oils (non-drying)',
      'Intense, high-pigment payoff in a single swipe',
      'Lightweight feel that does not cake or peel'
    ],
    ingredients: 'Isododecane, Trimethylsiloxysilicate, Cyclopentasiloxane, Shea Butter, Jojoba Seed Oil, Vitamin E, Dimethicone, Silica, Titanium Dioxide, Iron Oxides.',
    howToUse: 'Define lip borders with the precision applicator, then fill in the rest. Allow 60 seconds to dry completely to set the matte, transfer-proof finish.'
  },
  {
    id: 'sb-03',
    name: 'Hydrating Damask Rose Toner',
    category: 'Skincare',
    price: 119000,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80',
    description: 'A soothing facial toner infused with real, organic Damask Rose petals and Hyaluronic Acid. It removes residual impurities, balances pH levels, tightens enlarged pores, and preps your skin to absorb serums and moisturizers with maximum efficacy.',
    rating: 4.7,
    reviewsCount: 84,
    stock: 15,
    benefits: [
      'Restores skin pH balance instantly post-cleanse',
      'Soothes redness, irritation, and calm skin layers',
      'Hydrates, plumps, and softens skin texture',
      'Tightens pores and controls excess sebum'
    ],
    ingredients: 'Organic Rosa Damascena Flower Water, Real Rose Petals, Glycerin, Sodium Hyaluronate, Centella Asiatica Extract, Witch Hazel Leaf Extract, Panthenol, Allantoin.',
    howToUse: 'After cleansing, pour a moderate amount onto a cotton pad or your palms. Gently sweep or pat across the face and neck. Use morning and night.'
  },
  {
    id: 'sb-04',
    name: 'Ultimate Lash Volumizing Mascara',
    category: 'Makeup',
    price: 99000,
    originalPrice: 129000,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    description: 'Get instantly longer, thicker, and beautifully separated lashes with our water-resistant, fiber-infused volumizing mascara. Features an hourglass-shaped brush designed to coat every single lash with deep, carbon-black pigment.',
    rating: 4.6,
    reviewsCount: 115,
    stock: 30,
    benefits: [
      'Delivers up to 5x dramatic lash volume and length',
      'Waterproof, sweatproof, and smudge-resistant all day',
      'Infused with Panthenol and Keratin to nourish lashes',
      'Zero clumping or flaking under eyes'
    ],
    ingredients: 'Water, Beeswax, Copernicia Cerifera Wax, Stearic Acid, Carbon Black, Panthenol, Hydrolyzed Keratin, Tocopheryl Acetate, Phenoxyethanol.',
    howToUse: 'Sweep the mascara wand from the base of the eyelashes to the tips in a gentle wiggling motion. Build with a second coat while wet for extra drama.'
  },
  {
    id: 'sb-05',
    name: 'Nourishing Argan & Rosemary Hair Oil',
    category: 'Haircare',
    price: 179000,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    description: 'A luxurious hair treatment that combines Pure Moroccan Argan Oil and Rosemary Essential Oil. This dual-action formula strengthens hair roots, stimulates hair growth, tames frizzy split ends, and leaves hair with a brilliant, silky-smooth shine.',
    rating: 4.9,
    reviewsCount: 156,
    stock: 18,
    benefits: [
      'Stimulates scalp circulation to boost hair growth',
      'Repairs split ends and tames unruly, dry frizz',
      'Provides intense heat protection from styling tools',
      'Non-greasy, lightweight formula suitable for all hair types'
    ],
    ingredients: 'Moroccan Argan Kernel Oil, Rosemary Leaf Oil, Jojoba Seed Oil, Sweet Almond Oil, Coconut Oil, Vitamin E, Lavender Essential Oil.',
    howToUse: 'Apply a few drops to damp hair before styling, or massage directly onto the scalp 30 minutes before washing as a deep-conditioning hair treatment.'
  },
  {
    id: 'sb-06',
    name: 'Rose De Mai Luxury Eau de Parfum',
    category: 'Fragrance',
    price: 349000,
    originalPrice: 420000,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    description: 'An elegant, long-lasting fragrance that captures the essence of fresh-blooming May Roses in Grasse. Accented with subtle notes of White Jasmine, sparkling Bergamot, and warm Cedarwood for a highly sophisticated, sensual, and modern finish.',
    rating: 4.9,
    reviewsCount: 74,
    stock: 8,
    benefits: [
      'High-concentration Eau de Parfum lasting up to 8-10 hours',
      'Crafted from premium, hand-harvested organic floral extracts',
      'Chic, minimalist glass bottle that looks gorgeous on vanity tables',
      'Hypoallergenic formula gentle on sensitive pulse points'
    ],
    ingredients: 'Alcohol Denat., Fragrance (Parfum), Rosa Centifolia (Rose de Mai) Extract, Jasminum Officinale Extract, Citrus Aurantium Bergamia Fruit Oil, Water, Linalool, Citronellol.',
    howToUse: 'Spray onto your pulse points—wrists, neck, and behind the ears. Avoid rubbing your wrists together as it can break down the delicate top fragrance notes.'
  },
  {
    id: 'sb-07',
    name: 'Gentle Oat Cleansing Balm',
    category: 'Skincare',
    price: 129000,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    description: 'A nourishing melting cleansing balm that effortlessly dissolves stubborn waterproof makeup, sunscreen, and daily pollutants while calming sensitive skin. Formulated with Colloidal Oatmeal and Sweet Almond Oil to protect the natural skin barrier.',
    rating: 4.8,
    reviewsCount: 62,
    stock: 22,
    benefits: [
      'Melts from balm to oil to gentle milk, rinsing clean',
      'Deeply cleanses without stripping natural moisture',
      'Soothes irritated, dry, or redness-prone skin with oats',
      'Safe and non-irritating for sensitive eyes and lips'
    ],
    ingredients: 'Prunus Amygdalus Dulcis (Sweet Almond) Oil, Caprylic/Capric Triglyceride, PEG-20 Glyceryl Triisostearate, Colloidal Oatmeal, Candelilla Wax, Tocopherol.',
    howToUse: 'Massage a small scoop onto dry skin, including around the eyes to dissolve makeup. Add warm water to emulsify into a milky rinse, then splash clean.'
  },
  {
    id: 'sb-08',
    name: 'Mineral Sunscreen SPF 50+ PA++++',
    category: 'Skincare',
    price: 159000,
    originalPrice: 199000,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    description: 'An ultra-lightweight, 100% physical mineral sunscreen that provides broad-spectrum protection against UVA/UVB rays. Formulated with Zinc Oxide, Centella Asiatica, and Niacinamide to soothe skin and deliver a clean, invisible, zero-white-cast finish.',
    rating: 4.7,
    reviewsCount: 110,
    stock: 35,
    benefits: [
      'Broad-spectrum SPF 50+ PA++++ physical protection',
      'Zero white-cast, lightweight, and non-greasy matte texture',
      'Niacinamide brightens skin tone and strengthens barriers',
      'Reef-safe and completely free of toxic chemical filters'
    ],
    ingredients: 'Zinc Oxide, Titanium Dioxide, Centella Asiatica Extract, Niacinamide, Adenosine, Glycerin, Silica, Aqua, Chamomilla Recutita Extract.',
    howToUse: 'Apply a generous amount (approx. two-finger length) to the face and neck as the final step of your morning skincare routine, 15 minutes before sun exposure.'
  },
  {
    id: 'sb-09',
    name: 'Tinted Rose Lip Glow Balm',
    category: 'Makeup',
    price: 79000,
    image: 'https://images.unsplash.com/photo-1617224908560-6b3a0cc0124b?auto=format&fit=crop&w=600&q=80',
    description: 'A deeply hydrating daily lip balm that reacts with your lips\' natural pH level to create a custom, natural pink glow. Packed with Macadamia Nut Oil and Beeswax to soothe chapped lips and provide a glossy, healthy sheen.',
    rating: 4.8,
    reviewsCount: 125,
    stock: 40,
    benefits: [
      'Reacts with lip pH to deliver a unique personal flush',
      'Heals cracked, chapped lips and seals in moisture',
      'Gives a plump, glossy finish without sticky residue',
      'Sweet, subtle organic berry aroma'
    ],
    ingredients: 'Macadamia Seed Oil, Beeswax, Coconut Oil, Shea Butter, Vitamin E, Sunflower Seed Oil, pH-Responsive Color Pigments.',
    howToUse: 'Swipe on clean lips throughout the day whenever hydration is needed. Can be worn alone or as a hydrating base primer before applying matte lipstick.'
  },
  {
    id: 'sb-10',
    name: 'Keratin Intense Repair Hair Mask',
    category: 'Haircare',
    price: 139000,
    originalPrice: 169000,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    description: 'An intensive, salon-grade hair repair treatment that restores damaged, over-processed hair. Packed with Hydrolyzed Keratin, Argan Oil, and Biotin, it strengthens hair strands, reduces breakage, and restores elasticity in just one use.',
    rating: 4.9,
    reviewsCount: 92,
    stock: 12,
    benefits: [
      'Reconstructs damaged hair shaft structure with Keratin',
      'Infuses deep moisture, reducing breakage by up to 95%',
      'Promotes thicker-looking hair with Biotin enrichment',
      'Protects colored or chemically treated hair'
    ],
    ingredients: 'Water, Cetearyl Alcohol, Hydrolyzed Keratin, Argania Spinosa Kernel Oil, Biotin, Panthenol, Behentrimonium Chloride, Dimethicone, Phenoxyethanol.',
    howToUse: 'After shampooing, apply a generous scoop from mid-lengths to ends. Leave on for 5-10 minutes, then rinse thoroughly with cool water. Use 1-2 times weekly.'
  }
];
