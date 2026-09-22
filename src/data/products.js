export const products = [
  {
    id: 'chakli',
    handle: 'chakli',
    name: 'Chakli',
    category: 'chakli',
    line: 'Chal pooja, karuya.',
    personality: 'THE CRUNCHY ONE',
    price: '150',
    mrp: '199',
    currencyCode: 'INR',
    accent: 'ochre',
    weight: '100g',
    image: '/zakaas-chakli.jpg',
    images: ['/zakaas-chakli.jpg', '/zakaas-home-kitchen.png', '/zakaas-story-film.png'],
    shortDescription: 'Crisp Maharashtrian chakli made with traditional bhajan flour, cumin and ajwain.',
    description: 'Spiral crunch crafted from roasted rice flour, chana dal flour, cumin, sesame, and ajwain. Deep fried to golden perfection with an unmistakable crunch that commands the room.',
    editorialFactStrip: [
      { label: 'NET WEIGHT', value: '100g' },
      { label: 'PRODUCT', value: '100% VEGETARIAN' },
      { label: 'PREPARATION', value: 'SMALL BATCH CRAFTED' },
      { label: 'ORIGIN', value: 'MAHARASHTRA INSPIRED' }
    ],
    editorialAnnotations: [
      { text: 'BHAJAN FLOUR', pos: 'top-left' },
      { text: 'AJWAIN & CUMIN', pos: 'top-right' },
      { text: '100g PACK', pos: 'bottom-left' },
      { text: 'MAHARASHTRIAN ORIGINAL', pos: 'bottom-right' }
    ],
    trustClaims: [
      '100% Vegetarian',
      'Freshly Packed',
      'Traditional Bhajan Flour',
      'Made in Small Batches'
    ],
    highlights: [
      { id: '1', title: 'Crisp & crunchy spiral bite', icon: 'sparkles' },
      { id: '2', title: 'Traditional Maharashtrian recipe', icon: 'utensils' },
      { id: '3', title: 'Perfect evening tea-time snack', icon: 'coffee' },
      { id: '4', title: 'Freshly packed in aroma pouch', icon: 'package-check' },
      { id: '5', title: 'Made for sharing with chai', icon: 'users' },
      { id: '6', title: 'Signature brittle Zakaas crunch', icon: 'shield-check' }
    ],
    packOptions: [
      {
        id: 'pack-1',
        packCount: 1,
        title: '1 PACK',
        weight: '100g',
        mrp: 199,
        price: 150,
        savings: 49,
        badge: null,
        variantId: 'gid://shopify/ProductVariant/chakli-100'
      },
      {
        id: 'pack-3',
        packCount: 3,
        title: '3 PACKS',
        weight: '300g',
        mrp: 597,
        price: 450,
        savings: 147,
        badge: 'BEST SELLER',
        variantId: 'gid://shopify/ProductVariant/chakli-300'
      },
      {
        id: 'pack-5',
        packCount: 5,
        title: '5 PACKS',
        weight: '500g',
        mrp: 995,
        price: 750,
        savings: 245,
        badge: 'STOCK UP',
        variantId: 'gid://shopify/ProductVariant/chakli-500'
      }
    ],
    ingredientBreakdown: [
      {
        name: 'BHAJAN FLOUR',
        role: 'THE BASE',
        description: 'The traditional multigrain flour base crafted from slow-roasted rice and chana dal that gives Chakli its characteristic brittle spiral ridges and savoury depth.'
      },
      {
        name: 'CUMIN (JEERA)',
        role: 'THE WARM NOTE',
        description: 'Whole seeds roasted into the dough for warm, aromatic, earthy flavour and centuries of traditional presence in Maharashtrian kitchens.'
      },
      {
        name: 'AJWAIN',
        role: 'THE DISTINCTIVE AROMA',
        description: 'Adds its unmistakable pungent aroma and sharp, savoury note that commands attention the moment the airtight packet is unsealed.'
      },
      {
        name: 'WHITE SESAME SEEDS (TIL)',
        role: 'THE NUTTY CRUNCH',
        description: 'Nutty seeds embedded throughout the ridges, toasting golden in the oil to add delicate crunch and visual heritage to every spiral.'
      },
      {
        name: 'COLD-PRESSED PEANUT OIL',
        role: 'THE CRISP MEDIUM',
        description: 'Traditional groundnut oil cooked at precise temperature to deliver that unmistakable clean, golden snap without greasiness.'
      }
    ],
    whyIngredientsStory: 'Traditional Maharashtrian snack craft is culinary balance honed over generations. Slow-roasting the grains before milling (the bhajan method) pre-cooks the starches, ensuring each spiral fries to a brittle, airy crunch rather than a hard shell. Cumin and ajwain are kneaded directly into the dough to release their fragrant essential oils in the hot oil, pairing with evening chai.',
    nutritionFacts: [
      { nutrient: 'Energy', value: '524 kcal' },
      { nutrient: 'Protein', value: '9.8 g' },
      { nutrient: 'Carbohydrates', value: '54.2 g' },
      { nutrient: 'Total Sugars', value: '1.4 g' },
      { nutrient: 'Added Sugars', value: '0 g' },
      { nutrient: 'Total Fat', value: '30.1 g' },
      { nutrient: 'Saturated Fat', value: '6.2 g' },
      { nutrient: 'Trans Fat', value: '0 g' },
      { nutrient: 'Dietary Fibre', value: '6.4 g' },
      { nutrient: 'Sodium', value: '580 mg' }
    ],
    madeTheZakaasWay: [
      { title: 'SMALL BATCHES', desc: 'Crafted in limited quantities so every packet maintains peak crunch and spice integrity.' },
      { title: 'FRESHLY PACKED', desc: 'Sealed immediately into multi-layer pouches to lock out moisture and lock in aroma.' },
      { title: 'TRADITIONAL RECIPE', desc: 'Authentic Maharashtrian flour roasting and pure spices with zero artificial preservatives.' }
    ],
    ingredients: 'Roasted Rice flour, Chana dal flour (Bhajan flour), White sesame seeds (Til), Ajwain seeds, Cumin seeds, Red chilli powder, Asafoetida (Hing), Salt, Cold-pressed peanut oil.',
    allergenInfo: 'Contains Sesame and Peanuts. Processed in a facility that also handles wheat.',
    shelfLife: '90 Days',
    origin: 'Maharashtra Classic',
    spiceLevel: 'Mild-Spicy',
    manufacturingInfo: {
      manufacturedBy: 'Bharat Namkeen Private Limited',
      factoryAddress: 'Bombay Super 11, Plot No. 32/33, Kuvadva to Wakaner Road, Rajkot – 360023, Gujarat, India.',
      netQuantity: '100g (1 Pack)',
      countryOfOrigin: 'India',
      foodCategory: 'Ready to Eat Traditional Savouries',
      storageInstructions: 'Store in an airtight container away from moisture and direct sunlight to maintain signature crunch.',
      shelfLife: '90 Days from packaging date',
      batchInfo: 'See batch code, packaging date, and best before printed on the sealed pouch.'
    },
    variants: [
      { id: 'var-chakli-1', title: '1 Pack (100g)', price: '150', mrp: '199', variantId: 'gid://shopify/ProductVariant/chakli-100', packCount: 1 },
      { id: 'var-chakli-3', title: '3 Packs (300g)', price: '450', mrp: '597', variantId: 'gid://shopify/ProductVariant/chakli-300', packCount: 3 },
      { id: 'var-chakli-5', title: '5 Packs (500g)', price: '750', mrp: '995', variantId: 'gid://shopify/ProductVariant/chakli-500', packCount: 5 }
    ]
  },
  {
    id: 'bhakarwadi',
    handle: 'bhakarwadi',
    name: 'Bhākarwadi',
    category: 'bhakarwadi',
    line: 'Ami konala nai ghabrat.',
    personality: 'THE SPICY ONE',
    price: '150',
    mrp: '199',
    currencyCode: 'INR',
    accent: 'clay',
    weight: '100g',
    image: '/zakaas-bhakarwadi.jpg',
    images: ['/zakaas-bhakarwadi.jpg', '/zakaas-home-kitchen.png', '/zakaas-story-kitchen.png'],
    shortDescription: 'Crisp golden spiral rolls stuffed with sweet, spicy coconut, poppy seeds and Maharashtrian spices.',
    description: 'Crispy golden spiral rolls stuffed with a sweet, spicy, aromatic poppy seed, sesame, coconut and Maharashtrian spice masala. Hand-rolled using traditional home kitchen techniques.',
    editorialFactStrip: [
      { label: 'NET WEIGHT', value: '100g' },
      { label: 'PRODUCT', value: '100% VEGETARIAN' },
      { label: 'PREPARATION', value: 'SMALL BATCH CRAFTED' },
      { label: 'ORIGIN', value: 'PUNE & KOLHAPUR HERITAGE' }
    ],
    editorialAnnotations: [
      { text: 'POPPY & SESAME', pos: 'top-left' },
      { text: 'SWEET & SPICY', pos: 'top-right' },
      { text: '100g PACK', pos: 'bottom-left' },
      { text: 'TRADITIONAL ROLL', pos: 'bottom-right' }
    ],
    trustClaims: [
      '100% Vegetarian',
      'Freshly Packed',
      'Authentic Maharashtrian Recipe',
      'Made in Small Batches'
    ],
    highlights: [
      { id: '1', title: 'Authentic Maharashtrian recipe', icon: 'utensils' },
      { id: '2', title: 'Crispy spiral layered texture', icon: 'sparkles' },
      { id: '3', title: 'Sweet + spicy coconut masala filling', icon: 'flame' },
      { id: '4', title: 'Freshly packed in aroma pouch', icon: 'package-check' },
      { id: '5', title: 'Perfect accompaniment for cutting chai', icon: 'coffee' },
      { id: '6', title: 'Made for festive sharing', icon: 'users' }
    ],
    packOptions: [
      {
        id: 'pack-1',
        packCount: 1,
        title: '1 PACK',
        weight: '100g',
        mrp: 199,
        price: 150,
        savings: 49,
        badge: null,
        variantId: 'gid://shopify/ProductVariant/bhakarwadi-100'
      },
      {
        id: 'pack-3',
        packCount: 3,
        title: '3 PACKS',
        weight: '300g',
        mrp: 597,
        price: 450,
        savings: 147,
        badge: 'BEST SELLER',
        variantId: 'gid://shopify/ProductVariant/bhakarwadi-300'
      },
      {
        id: 'pack-5',
        packCount: 5,
        title: '5 PACKS',
        weight: '500g',
        mrp: 995,
        price: 750,
        savings: 245,
        badge: 'STOCK UP',
        variantId: 'gid://shopify/ProductVariant/bhakarwadi-500'
      }
    ],
    ingredientBreakdown: [
      {
        name: 'BESAN & WHEAT DOUGH',
        role: 'THE CRISP OUTER SHELL',
        description: 'Finely kneaded gram flour and whole wheat rolled wafer-thin to create crisp spiral pastry layers.'
      },
      {
        name: 'DRY ROASTED COCONUT',
        role: 'THE TEXTURE & BODY',
        description: 'Grated coconut toasted until fragrant, absorbing the spiced jaggery-tamarind balance.'
      },
      {
        name: 'POPPY SEEDS (KHAS KHAS) & SESAME',
        role: 'THE NUTTY CRUNCH',
        description: 'Roasted seeds offering gentle nuttiness and comforting texture throughout the filling.'
      },
      {
        name: 'KOLHAPURI SPICE BLEND',
        role: 'THE SWEET & SPICY MASALA',
        description: 'A balance of red chilli, coriander, cumin, ginger, and warming garam masala.'
      }
    ],
    whyIngredientsStory: 'Bhakarwadi demands mastery over contrasting flavours. The sweetness of the filling meets the fire of red chillies, while the wafer-thin rolled pastry seals the fragrant filling inside before being crisp-fried to golden amber.',
    nutritionFacts: [
      { nutrient: 'Energy', value: '512 kcal' },
      { nutrient: 'Protein', value: '9.2 g' },
      { nutrient: 'Carbohydrates', value: '52.6 g' },
      { nutrient: 'Total Sugars', value: '8.4 g' },
      { nutrient: 'Added Sugars', value: '6.1 g' },
      { nutrient: 'Total Fat', value: '29.5 g' },
      { nutrient: 'Saturated Fat', value: '7.8 g' },
      { nutrient: 'Trans Fat', value: '0 g' },
      { nutrient: 'Dietary Fibre', value: '5.8 g' },
      { nutrient: 'Sodium', value: '610 mg' }
    ],
    madeTheZakaasWay: [
      { title: 'SMALL BATCHES', desc: 'Hand-rolled and sliced in small runs for authentic flaky layers.' },
      { title: 'FRESHLY PACKED', desc: 'Moisture-sealed immediately so the filling remains aromatic.' },
      { title: 'TRADITIONAL RECIPE', desc: 'Real Maharashtrian spices with pure peanut oil and no artificial colours.' }
    ],
    ingredients: 'Gram flour (Besan), Whole wheat flour, Refined poppy seeds (Khas khas), White sesame seeds (Til), Dry grated coconut, Red chilli powder, Garam masala, Asafoetida (Hing), Salt, Refined peanut oil.',
    allergenInfo: 'Contains Wheat (Gluten), Sesame, and Peanuts. Made in a facility handling tree nuts.',
    shelfLife: '90 Days',
    origin: 'Pune & Kolhapur Tradition',
    spiceLevel: 'Medium-Spicy',
    manufacturingInfo: {
      manufacturedBy: 'Bharat Namkeen Private Limited',
      factoryAddress: 'Bombay Super 11, Plot No. 32/33, Kuvadva to Wakaner Road, Rajkot – 360023, Gujarat, India.',
      netQuantity: '100g (1 Pack)',
      countryOfOrigin: 'India',
      foodCategory: 'Ready to Eat Traditional Savouries',
      storageInstructions: 'Store in an airtight container in a cool, dry place away from direct sunlight.',
      shelfLife: '90 Days from packaging date',
      batchInfo: 'See batch code, packaging date, and best before printed on the sealed pouch.'
    },
    variants: [
      { id: 'var-bhakarwadi-1', title: '1 Pack (100g)', price: '150', mrp: '199', variantId: 'gid://shopify/ProductVariant/bhakarwadi-100', packCount: 1 },
      { id: 'var-bhakarwadi-3', title: '3 Packs (300g)', price: '450', mrp: '597', variantId: 'gid://shopify/ProductVariant/bhakarwadi-300', packCount: 3 },
      { id: 'var-bhakarwadi-5', title: '5 Packs (500g)', price: '750', mrp: '995', variantId: 'gid://shopify/ProductVariant/bhakarwadi-500', packCount: 5 }
    ]
  },
  {
    id: 'shankarpali',
    handle: 'shankarpali',
    name: 'Shankarpali',
    category: 'shankarpada',
    line: 'Jevlis ka?',
    personality: 'THE SWEET ONE',
    price: '150',
    mrp: '199',
    currencyCode: 'INR',
    accent: 'rose',
    weight: '100g',
    image: '/zakaas-shankarpali.jpg',
    images: ['/zakaas-shankarpali.jpg', '/zakaas-story-kitchen.png', '/zakaas-story-film.png'],
    shortDescription: 'Diamond-cut sweet bites flaky on the outside with a tender, melt-in-the-mouth crumb — infused with pure ghee and cardamom.',
    description: 'Diamond-cut sweet bites flaky on the outside, buttery melt-in-mouth inside. Made with organic sugar, pure desi ghee, cardamom, and semolina for festive comfort.',
    editorialFactStrip: [
      { label: 'NET WEIGHT', value: '100g' },
      { label: 'PRODUCT', value: '100% VEGETARIAN' },
      { label: 'PREPARATION', value: 'PURE DESI GHEE' },
      { label: 'ORIGIN', value: 'FESTIVE MAHARASHTRA' }
    ],
    editorialAnnotations: [
      { text: 'PURE DESI GHEE', pos: 'top-left' },
      { text: 'GREEN CARDAMOM', pos: 'top-right' },
      { text: '100g PACK', pos: 'bottom-left' },
      { text: 'DIAMOND CUT', pos: 'bottom-right' }
    ],
    trustClaims: [
      '100% Vegetarian',
      'Pure Desi Ghee',
      'Freshly Packed',
      'Traditional Recipe'
    ],
    highlights: [
      { id: '1', title: 'Light & tender crumb', icon: 'sparkles' },
      { id: '2', title: 'Traditional festive sweet snack', icon: 'heart' },
      { id: '3', title: 'Infused with fragrant green cardamom', icon: 'coffee' },
      { id: '4', title: 'Freshly packed in sealed pouch', icon: 'package-check' },
      { id: '5', title: 'Perfect sweet tea-time bite', icon: 'users' },
      { id: '6', title: 'Classic Maharashtrian recipe', icon: 'utensils' }
    ],
    packOptions: [
      {
        id: 'pack-1',
        packCount: 1,
        title: '1 PACK',
        weight: '100g',
        mrp: 199,
        price: 150,
        savings: 49,
        badge: null,
        variantId: 'gid://shopify/ProductVariant/shankarpali-100'
      },
      {
        id: 'pack-3',
        packCount: 3,
        title: '3 PACKS',
        weight: '300g',
        mrp: 597,
        price: 450,
        savings: 147,
        badge: 'BEST SELLER',
        variantId: 'gid://shopify/ProductVariant/shankarpali-300'
      },
      {
        id: 'pack-5',
        packCount: 5,
        title: '5 PACKS',
        weight: '500g',
        mrp: 995,
        price: 750,
        savings: 245,
        badge: 'STOCK UP',
        variantId: 'gid://shopify/ProductVariant/shankarpali-500'
      }
    ],
    ingredientBreakdown: [
      {
        name: 'PURE DESI GHEE',
        role: 'THE RICHNESS & FLAKE',
        description: 'Warm melted clarified butter rubbed generously into the dough to form countless flaky tender layers.'
      },
      {
        name: 'SEMOLINA & FLOUR',
        role: 'THE CRISP CRUMB',
        description: 'A traditional ratio of semolina (rava) and wheat flour creating the delicate balance between crisp exterior and tender inside.'
      },
      {
        name: 'GREEN CARDAMOM & NUTMEG',
        role: 'THE AROMA',
        description: 'Freshly crushed cardamom pods providing festive warmth and natural sweet spice.'
      }
    ],
    whyIngredientsStory: 'Shankarpali is the celebrated sweet counterpart of the Maharashtrian festive spread. By layering pure desi ghee into the flour dough and cutting it into signature diamond lozenges, the bites gently puff in the warm oil, creating a delicate crumble that melts on the tongue.',
    nutritionFacts: [
      { nutrient: 'Energy', value: '498 kcal' },
      { nutrient: 'Protein', value: '7.4 g' },
      { nutrient: 'Carbohydrates', value: '61.8 g' },
      { nutrient: 'Total Sugars', value: '22.0 g' },
      { nutrient: 'Added Sugars', value: '20.5 g' },
      { nutrient: 'Total Fat', value: '24.2 g' },
      { nutrient: 'Saturated Fat', value: '11.5 g' },
      { nutrient: 'Trans Fat', value: '0 g' },
      { nutrient: 'Dietary Fibre', value: '3.1 g' },
      { nutrient: 'Sodium', value: '110 mg' }
    ],
    madeTheZakaasWay: [
      { title: 'SMALL BATCHES', desc: 'Crafted in small kettles with controlled heat so each diamond cooks evenly.' },
      { title: 'PURE DESI GHEE', desc: 'Prepared with real ghee for authentic aroma and tender melt-in-mouth texture.' },
      { title: 'FESTIVE RECIPE', desc: 'Passed down home recipes made for celebration and afternoon tea.' }
    ],
    ingredients: 'Refined wheat flour (Maida), Pure Desi Ghee, Sugar, Semolina (Rava), Cardamom powder, Nutmeg powder, Milk, Rock salt.',
    allergenInfo: 'Contains Wheat (Gluten) and Dairy (Milk & Desi Ghee).',
    shelfLife: '60 Days',
    origin: 'Festive Maharashtra',
    spiceLevel: 'Sweet & Aromatic',
    manufacturingInfo: {
      manufacturedBy: 'Bharat Namkeen Private Limited',
      factoryAddress: 'Bombay Super 11, Plot No. 32/33, Kuvadva to Wakaner Road, Rajkot – 360023, Gujarat, India.',
      netQuantity: '100g (1 Pack)',
      countryOfOrigin: 'India',
      foodCategory: 'Traditional Sweet Confectionery',
      storageInstructions: 'Store in an airtight container in a cool, dry place away from heat.',
      shelfLife: '60 Days from packaging date',
      batchInfo: 'See batch code, packaging date, and best before printed on the sealed pouch.'
    },
    variants: [
      { id: 'var-shankarpali-1', title: '1 Pack (100g)', price: '150', mrp: '199', variantId: 'gid://shopify/ProductVariant/shankarpali-100', packCount: 1 },
      { id: 'var-shankarpali-3', title: '3 Packs (300g)', price: '450', mrp: '597', variantId: 'gid://shopify/ProductVariant/shankarpali-300', packCount: 3 },
      { id: 'var-shankarpali-5', title: '5 Packs (500g)', price: '750', mrp: '995', variantId: 'gid://shopify/ProductVariant/shankarpali-500', packCount: 5 }
    ]
  }
];

export function getFallbackProductByHandle(handle) {
  if (!handle) return products[0];
  const normalized = handle.toLowerCase().replace('zakaas-', '');
  return products.find(p => p.handle.toLowerCase() === normalized || p.id.toLowerCase() === normalized) || products[0];
}
