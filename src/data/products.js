export const UNIT_PRICE = 180;
export const UNIT_MRP = 199;
export const GIFT_PACKAGING_PRICE = 99;

// Verified active Shopify automatic discounts on wcfsjc-ib.myshopify.com:
// - "2 Pack": 10% automatic discount when 2 items are in the bag
// - "3 Pack": 15% automatic discount when 3+ items are in the bag (applies across eligible lines at checkout, including 3-pack & 6-pack gift boxes)
export const ACTIVE_GIFT_DISCOUNT = {
  title: '3 Pack Automatic Discount',
  percent: 15,
  rate: 0.15,
  minPacks: 3,
  appliesAt: 'checkout',
  summaryNote: '15% automatic bundle discount on 3+ packs (applied automatically at Shopify checkout across pouches and gift box packaging).',
};

export function getUnitPrice(product) {
  const parsed = Number(product?.price);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : UNIT_PRICE;
}

export function getUnitMrp(product) {
  const parsed = Number(product?.mrp);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : UNIT_MRP;
}

export function buildPackOptions(unitPrice = UNIT_PRICE, unitMrp = UNIT_MRP, variantId) {
  const p = Number(unitPrice) || UNIT_PRICE;
  const m = Number(unitMrp) || UNIT_MRP;
  return [
    {
      id: 'pack-1',
      packCount: 1,
      title: '1 PACK',
      weight: '100g',
      mrp: m,
      price: p,
      savings: Math.max(0, m - p),
      badge: null,
      variantId,
    },
    {
      id: 'pack-3',
      packCount: 3,
      title: '3 PACKS',
      weight: '300g',
      mrp: m * 3,
      price: p * 3,
      savings: Math.max(0, (m - p) * 3),
      badge: 'BEST SELLER',
      variantId,
    },
    {
      id: 'pack-5',
      packCount: 5,
      title: '5 PACKS',
      weight: '500g',
      mrp: m * 5,
      price: p * 5,
      savings: Math.max(0, (m - p) * 5),
      badge: 'STOCK UP',
      variantId,
    },
  ];
}

export function calculateGiftBoxPricing(selectedProducts = [], packagingPrice = GIFT_PACKAGING_PRICE) {
  const snackSubtotal = selectedProducts.reduce((sum, p) => sum + getUnitPrice(p), 0);
  const packCount = selectedProducts.length;
  const packagingCharge = Number(packagingPrice) || GIFT_PACKAGING_PRICE;
  const grossTotal = snackSubtotal + packagingCharge;
  const eligibleForDiscount = packCount >= ACTIVE_GIFT_DISCOUNT.minPacks;
  const discountAmount = eligibleForDiscount
    ? Number((grossTotal * ACTIVE_GIFT_DISCOUNT.rate).toFixed(2))
    : 0;
  const finalTotal = Number((grossTotal - discountAmount).toFixed(2));

  return {
    packCount,
    snackSubtotal,
    packagingCharge,
    grossTotal,
    eligibleForDiscount,
    discountTitle: ACTIVE_GIFT_DISCOUNT.title,
    discountPercent: eligibleForDiscount ? ACTIVE_GIFT_DISCOUNT.percent : 0,
    discountAmount,
    finalTotal,
  };
}

export function calculateBagSummary(items = []) {
  const isPackagingItem = (item) =>
    item?.id === 'gift-box-pkg' ||
    String(item?.handle || '').includes('gift-packaging') ||
    String(item?.variantId || '').includes('50335097979137');

  const packagingItems = items.filter(isPackagingItem);
  const snackItems = items.filter((item) => !isPackagingItem(item));

  const snackSubtotal = snackItems.reduce((sum, item) => sum + getUnitPrice(item), 0);
  const packagingCharge = packagingItems.reduce(
    (sum, item) => sum + (Number(item?.price) || GIFT_PACKAGING_PRICE),
    0
  );
  const grossTotal = snackSubtotal + packagingCharge;
  const snackCount = snackItems.length;
  const totalUnits = items.length;

  let discountPercent = 0;
  let discountTitle = '';
  if (totalUnits >= 3) {
    discountPercent = 15;
    discountTitle = '3+ Pack Automatic Discount (15% off at checkout)';
  } else if (totalUnits === 2) {
    discountPercent = 10;
    discountTitle = '2 Pack Automatic Discount (10% off at checkout)';
  }

  const discountAmount = discountPercent > 0
    ? Number(((grossTotal * discountPercent) / 100).toFixed(2))
    : 0;
  const finalTotal = Number((grossTotal - discountAmount).toFixed(2));

  return {
    snackCount,
    packagingCount: packagingItems.length,
    snackSubtotal,
    packagingCharge,
    grossTotal,
    discountPercent,
    discountTitle,
    discountAmount,
    finalTotal,
  };
}

export const products = [
  {
    id: 'chakli',
    handle: 'chakli',
    name: 'Chakli',
    category: 'chakli',
    line: 'Crisp spiral crunch made with wheat flour, sesame seeds, cumin and carom seeds.',
    personality: 'THE CRUNCHY ONE',
    price: String(UNIT_PRICE),
    mrp: String(UNIT_MRP),
    currencyCode: 'INR',
    variantId: 'gid://shopify/ProductVariant/50267737391361',
    accent: 'ochre',
    weight: '100g',
    image: 'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-25_at_7.54.19_PM.jpg?v=1790431374',
    images: [
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-25_at_7.54.19_PM.jpg?v=1790431374',
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-25_at_7.55.18_PM.jpg?v=1790431419',
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-25_at_7.54.18_PM.jpg?v=1790431375',
    ],
    shortDescription: 'Crisp Maharashtrian chakli spirals made with wheat flour (atta), white sesame seeds (til), cumin, and carom seeds (ajwain).',
    description: 'Crispy golden spirals crafted from wheat flour (atta), toasted sesame seeds (til), cumin seeds, carom seeds (ajwain), red chili powder, and turmeric. Fried to a clean, unmistakable crunch.',
    editorialFactStrip: [
      { value: '100G', label: 'NET WEIGHT' },
      { value: 'WHEAT & TIL', label: 'TRADITIONAL SPIRALS' },
      { value: 'NO PALM OIL', label: 'VERIFIED ON PACK' },
      { value: '100% VEG', label: 'PURE VEGETARIAN' },
      { value: 'NO ADDED', label: 'PRESERVATIVES' }
    ],
    editorialAnnotations: [
      { text: 'WHEAT FLOUR (ATTA)', pos: 'top-left' },
      { text: 'AJWAIN & CUMIN', pos: 'top-right' },
      { text: '100g PACK', pos: 'bottom-left' },
      { text: 'MAHARASHTRIAN CLASSIC', pos: 'bottom-right' }
    ],
    trustClaims: [
      '100% Vegetarian',
      'No Preservatives',
      'No Artificial Flavours or Colors',
      'No Palm Oil'
    ],
    highlights: [
      { id: '1', title: 'Crisp & crunchy spiral bite', icon: 'sparkles' },
      { id: '2', title: 'Traditional Maharashtrian recipe', icon: 'utensils' },
      { id: '3', title: 'Perfect evening tea-time snack', icon: 'coffee' },
      { id: '4', title: 'Freshly packed in 100g pouch', icon: 'package-check' },
      { id: '5', title: 'Made for sharing with chai', icon: 'users' },
      { id: '6', title: 'Signature ZAKAAS crunch', icon: 'shield-check' }
    ],
    packOptions: buildPackOptions(UNIT_PRICE, UNIT_MRP, 'gid://shopify/ProductVariant/50267737391361'),
    ingredientBreakdown: [
      {
        id: 'wheat-flour',
        name: 'Wheat Flour (Atta)',
        nativeName: 'गव्हाचे पीठ · Atta',
        index: '01',
        role: 'THE GRAIN BASE',
        image: '/ingredients/bhajan-flour.png',
        alt: 'Traditional milled flour base for Chakli',
        nutritionalPointers: [
          {
            title: 'Ridged Spiral Structure',
            text: 'Kneaded into a firm, pliable dough that holds sharp, even ridges when pressed through the chakli mould.'
          },
          {
            title: 'Crisp Golden Bite',
            text: 'Fries to a clean, brittle snap that stays crunchy from the outer ring to the center spiral.'
          },
          {
            title: 'Savoury Foundation',
            text: 'Carries the roasted spice notes and toasted seeds evenly across every bite.'
          }
        ]
      },
      {
        id: 'cumin',
        name: 'Cumin Seeds',
        nativeName: 'जिरे · Jeera',
        index: '02',
        role: 'THE WARM NOTE',
        image: '/ingredients/cumin.png',
        alt: 'Whole aromatic cumin seeds',
        nutritionalPointers: [
          {
            title: 'Earthy Warmth',
            text: 'Whole cumin seeds folded into the dough release a warm, nutty aroma as the spirals fry.'
          },
          {
            title: 'Classic Tea-Time Pairing',
            text: 'Balances the gentle heat of red chili powder and pairs naturally with hot cutting chai.'
          },
          {
            title: 'Whole-Seed Texture',
            text: 'Provides subtle pockets of roasted spice character in every coil.'
          }
        ]
      },
      {
        id: 'ajwain',
        name: 'Carom Seeds (Ajwain)',
        nativeName: 'ओवा · Ajwain',
        index: '03',
        role: 'THE DISTINCTIVE AROMA',
        image: '/ingredients/ajwain.png',
        alt: 'Whole carom ajwain seeds',
        nutritionalPointers: [
          {
            title: 'Signature Savoury Aroma',
            text: 'Delivers the unmistakable peppery, herbal fragrance the moment the packet is opened.'
          },
          {
            title: 'Traditional Maharashtrian Profile',
            text: 'An essential spice in classic home-style chakli recipes across Maharashtra.'
          },
          {
            title: 'Balanced Spice Finish',
            text: 'Rounds out turmeric and red chili with a clean, lingering savoury note.'
          }
        ]
      },
      {
        id: 'white-sesame',
        name: 'White Sesame (Til)',
        nativeName: 'पांढरे तीळ · Til',
        index: '04',
        role: 'THE NUTTY CRUNCH',
        image: '/ingredients/white-sesame.png',
        alt: 'Toasted white sesame seeds',
        nutritionalPointers: [
          {
            title: 'Toasted Nutty Pop',
            text: 'Generous white sesame seeds embedded along the ridges toast golden during frying.'
          },
          {
            title: 'Visual & Textural Contrast',
            text: 'Dots each golden spiral with delicate crunch and classic festive appearance.'
          },
          {
            title: 'Rich Roasted Flavour',
            text: 'Deepens the savoury finish of the spiced wheat dough.'
          }
        ]
      }
    ],
    whyIngredientsStory: 'Crafted from wheat flour (atta), sesame seeds (til), cumin seeds, carom seeds (ajwain), red chili powder, and turmeric powder in edible vegetable oil (no palm oil).',
    nutritionFacts: [
      { nutrient: 'Energy', value: '530 kcal' },
      { nutrient: 'Protein', value: '7.1 g' },
      { nutrient: 'Total Fat', value: '28.5 g' },
      { nutrient: 'Saturated Fat', value: '8.2 g' },
      { nutrient: 'Carbohydrate', value: '60.6 g' },
      { nutrient: 'Sugars', value: '2.3 g' },
      { nutrient: 'Dietary Fibre', value: '6 g' },
      { nutrient: 'Sodium', value: '474 mg' }
    ],
    nutritionFootnote: 'Nutritional information per 100 g approx. as printed on the ZAKAAS Chakli pack.',
    madeTheZakaasWay: [
      { title: 'SMALL BATCHES', desc: 'Crafted in controlled batches so every packet maintains peak crunch and spice balance.' },
      { title: 'FRESHLY PACKED', desc: 'Sealed in 100g resealable black pouches to lock out moisture and preserve aroma.' },
      { title: 'NO PALM OIL', desc: 'Prepared with wheat flour, sesame, cumin, and carom seeds with no preservatives or palm oil.' }
    ],
    ingredients: 'Wheat Flour (Atta), Edible Vegetable Oil, Sesame Seeds (Til), Red Chili Powder, Iodised Salt, Cumin Seeds, Carom Seeds, Turmeric Powder.',
    allergenInfo: 'Contains: Wheat (Gluten) and Sesame Seeds. May contain traces of nuts and peanuts.',
    shelfLife: 'See MFG. DATE and EXP. DATE printed on the package.',
    origin: 'Maharashtra Classic',
    spiceLevel: 'Mild-Spicy',
    manufacturingInfo: {
      manufacturedBy: 'Bharat Namkeen (Marketed by ZAKAAS)',
      fssaiLicNo: '10021021000754',
      netQuantity: '100 g',
      countryOfOrigin: 'India',
      foodCategory: 'Ready to Eat Traditional Savouries',
      storageInstructions: 'Store in a cool, dry place. Keep sealed to maintain freshness.',
      shelfLife: 'Refer to MFG. DATE, EXP. DATE, and BATCH NO. printed on the pack.'
    },
    variants: [
      { id: 'var-chakli-1', title: '1 Pack (100g)', price: String(UNIT_PRICE), mrp: String(UNIT_MRP), variantId: 'gid://shopify/ProductVariant/50267737391361', packCount: 1 },
      { id: 'var-chakli-3', title: '3 Packs (300g)', price: String(UNIT_PRICE * 3), mrp: String(UNIT_MRP * 3), variantId: 'gid://shopify/ProductVariant/50267737391361', packCount: 3 },
      { id: 'var-chakli-5', title: '5 Packs (500g)', price: String(UNIT_PRICE * 5), mrp: String(UNIT_MRP * 5), variantId: 'gid://shopify/ProductVariant/50267737391361', packCount: 5 }
    ]
  },
  {
    id: 'bhakarwadi',
    handle: 'bhakarwadi',
    name: 'Bhakarwadi',
    category: 'bhakarwadi',
    line: 'Crispy spiced pinwheel rolls made with maida, besan, sesame, fennel, amchur and warm spices.',
    personality: 'THE SPICY ONE',
    price: String(UNIT_PRICE),
    mrp: String(UNIT_MRP),
    currencyCode: 'INR',
    variantId: 'gid://shopify/ProductVariant/50267737456897',
    accent: 'clay',
    weight: '100g',
    image: 'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-25_at_7.52.30_PM_2.jpg?v=1790431251',
    images: [
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-25_at_7.52.30_PM_2.jpg?v=1790431251',
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-25_at_7.52.30_PM.jpg?v=1790431250',
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-25_at_7.52.30_PM_1.jpg?v=1790431251',
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-25_at_7.52.29_PM.jpg?v=1790431251',
    ],
    shortDescription: 'Crispy golden spiral pinwheels made with refined wheat flour (maida) and besan, rolled with sesame, fennel, amchur, red chilli, and aromatic whole spices.',
    description: 'Tightly rolled Maharashtrian pinwheels crafted from refined wheat flour (maida) and Bengal gram flour (besan), filled with a tangy-sweet and spicy masala of sesame seeds (til), fennel (saunf), carom seeds (ajowan), dried mango powder (amchur), red chilli, ginger, black pepper, cinnamon, clove, cardamom, bay leaves, and hing, fried crisp in refined palmolein oil.',
    editorialFactStrip: [
      { value: '100G', label: 'NET WEIGHT' },
      { value: 'MAIDA & BESAN', label: 'LAYERED PASTRY ROLL' },
      { value: 'SWEET & SPICY', label: 'TANGY MASALA FILLING' },
      { value: '100% VEG', label: 'PURE VEGETARIAN' },
      { value: 'NO ADDED', label: 'PRESERVATIVES' }
    ],
    editorialAnnotations: [
      { text: 'MAIDA & BESAN ROLL', pos: 'top-left' },
      { text: 'AMCHUR & SPICES', pos: 'top-right' },
      { text: '100g PACK', pos: 'bottom-left' },
      { text: 'TRADITIONAL PINWHEEL', pos: 'bottom-right' }
    ],
    trustClaims: [
      '100% Vegetarian',
      'No Preservatives',
      'No Artificial Flavours or Colors',
      'Traditional Spice Blend'
    ],
    highlights: [
      { id: '1', title: 'Authentic Maharashtrian recipe', icon: 'utensils' },
      { id: '2', title: 'Crispy spiral layered texture', icon: 'sparkles' },
      { id: '3', title: 'Tangy amchur, sesame & spice filling', icon: 'flame' },
      { id: '4', title: 'Freshly packed in 100g pouch', icon: 'package-check' },
      { id: '5', title: 'Perfect accompaniment for cutting chai', icon: 'coffee' },
      { id: '6', title: 'Made for festive sharing', icon: 'users' }
    ],
    packOptions: buildPackOptions(UNIT_PRICE, UNIT_MRP, 'gid://shopify/ProductVariant/50267737456897'),
    ingredientBreakdown: [
      {
        id: 'maida-besan-pastry',
        name: 'Maida & Besan Dough',
        nativeName: 'मैदा आणि बेसन · Outer Roll',
        index: '01',
        role: 'THE CRISP PASTRY SHELL',
        image: null,
        specimenLabel: 'MAIDA + BESAN',
        alt: 'Refined wheat flour and Bengal gram flour pastry',
        nutritionalPointers: [
          {
            title: 'Tightly Rolled Layers',
            text: 'Refined wheat flour (maida) and Bengal gram flour (besan) roll thin without tearing to lock in the spice spiral.'
          },
          {
            title: 'Blistered Golden Crust',
            text: 'Fried in refined palmolein oil for a crisp, flaky pastry shell that holds its pinwheel shape.'
          },
          {
            title: 'Savoury Gram Depth',
            text: 'Besan adds nutty body that balances the sweet, tangy, and fiery filling inside.'
          }
        ]
      },
      {
        id: 'white-sesame-bhakarwadi',
        name: 'Sesame Seeds (Til)',
        nativeName: 'पांढरे तीळ · Til',
        index: '02',
        role: 'THE ROASTED FILLING CRUNCH',
        image: '/ingredients/white-sesame.png',
        alt: 'Toasted white sesame seeds',
        nutritionalPointers: [
          {
            title: 'Nutty Inner Swirl',
            text: 'Sesame seeds packed inside the masala layers toast gently as each pinwheel fries.'
          },
          {
            title: 'Textural Bite',
            text: 'Adds a distinct, delicate crunch against the crisp maida-besan pastry.'
          },
          {
            title: 'Classic Masala Base',
            text: 'Helps bind the sugar and spice mixture cleanly inside every cross-section.'
          }
        ]
      },
      {
        id: 'ajowan-fennel',
        name: 'Ajowan & Fennel (Saunf)',
        nativeName: 'ओवा आणि बडीशेप · Aromatic Seeds',
        index: '03',
        role: 'THE SWEET-SAVOURY AROMA',
        image: '/ingredients/ajwain.png',
        alt: 'Carom seeds and aromatic spices',
        nutritionalPointers: [
          {
            title: 'Layered Fragrance',
            text: 'Fennel seeds (saunf) bring a cool, sweet lift while carom seeds (ajowan) ground the roll in savoury warmth.'
          },
          {
            title: 'Signature Pune-Style Balance',
            text: 'Bridges the refined sugar and tangy dried mango powder (amchur) in the stuffing.'
          },
          {
            title: 'Freshly Ground Character',
            text: 'Releases bright essential aromas with every bite.'
          }
        ]
      },
      {
        id: 'amchur-garam-spices',
        name: 'Amchur, Chilli & Whole Spices',
        nativeName: 'आमचूर आणि खडे मसाले · Masala',
        index: '04',
        role: 'THE TANGY & FIERY CORE',
        image: null,
        specimenLabel: '10-SPICE MASALA',
        alt: 'Amchur, red chilli, ginger, black pepper, cinnamon, clove, cardamom, bay leaves and hing',
        nutritionalPointers: [
          {
            title: 'Sweet, Tangy & Spicy',
            text: 'Dried mango powder (amchur) and refined sugar meet red chilli and black pepper for bold contrast.'
          },
          {
            title: 'Warm Whole Spices',
            text: 'Seasoned with dried ginger, cinnamon, clove, cardamom, bay leaves, and a pinch of asafoetida (hing).'
          },
          {
            title: 'Built for Chai',
            text: 'Leaves a lingering, lively spice finish made for afternoon tea.'
          }
        ]
      }
    ],
    whyIngredientsStory: 'Prepared according to the packet recipe with a crisp refined wheat flour (maida) and Bengal gram flour (besan) wrapper rolled around sesame seeds, fennel, ajowan, amchur, red chilli, and warm whole spices, fried in refined palmolein oil.',
    nutritionFacts: [
      { nutrient: 'Energy', value: '540 kcal' },
      { nutrient: 'Protein', value: '7 g' },
      { nutrient: 'Total Fat', value: '31.2 g' },
      { nutrient: 'Saturated Fat', value: '10.3 g' },
      { nutrient: 'Carbohydrate', value: '49.89 g' },
      { nutrient: 'Sugars', value: '7.8 g' },
      { nutrient: 'Dietary Fibre', value: '3.4 g' },
      { nutrient: 'Sodium', value: '434 mg' }
    ],
    nutritionFootnote: 'Nutritional information per 100 g as printed on the ZAKAAS Bhakarwadi pack.',
    madeTheZakaasWay: [
      { title: 'LAYERED PINWHEELS', desc: 'Rolled and sliced to keep the tangy-spicy masala tightly sealed inside every spiral.' },
      { title: 'FRESHLY PACKED', desc: 'Sealed in 100g aroma pouches to preserve the crisp maida-besan crust.' },
      { title: 'WHOLE SPICE MASALA', desc: 'Seasoned with amchur, red chilli, fennel, sesame, ajowan, cinnamon, clove, cardamom, and hing.' }
    ],
    ingredients: 'Refined wheat flour (maida), Bengal gram flour (besan), refined palmolein oil, refined sugar, iodised salt, dried mango powder (amchur), red chilli, fennel seeds (saunf), sesame seeds (til), ajowan (carom seeds), dried ginger powder, black pepper, cinnamon, clove, cardamom, bay leaves, and asafoetida (hing).',
    allergenInfo: 'Contains wheat (gluten) and sesame. May contain traces of other allergens depending on the manufacturing facility.',
    shelfLife: 'See MFG. DATE and EXP. DATE printed on the package.',
    origin: 'Maharashtra Classic',
    spiceLevel: 'Medium-Spicy & Tangy',
    manufacturingInfo: {
      manufacturedBy: 'Bharat Namkeen (Marketed by ZAKAAS)',
      fssaiLicNo: '10021021000754',
      netQuantity: '100 g',
      countryOfOrigin: 'India',
      foodCategory: 'Ready to Eat Traditional Savouries',
      storageInstructions: 'Store in a cool, dry place. Keep sealed to maintain freshness.',
      shelfLife: 'Refer to MFG. DATE, EXP. DATE, and BATCH NO. printed on the pack.'
    },
    variants: [
      { id: 'var-bhakarwadi-1', title: '1 Pack (100g)', price: String(UNIT_PRICE), mrp: String(UNIT_MRP), variantId: 'gid://shopify/ProductVariant/50267737456897', packCount: 1 },
      { id: 'var-bhakarwadi-3', title: '3 Packs (300g)', price: String(UNIT_PRICE * 3), mrp: String(UNIT_MRP * 3), variantId: 'gid://shopify/ProductVariant/50267737456897', packCount: 3 },
      { id: 'var-bhakarwadi-5', title: '5 Packs (500g)', price: String(UNIT_PRICE * 5), mrp: String(UNIT_MRP * 5), variantId: 'gid://shopify/ProductVariant/50267737456897', packCount: 5 }
    ]
  },
  {
    id: 'shankarpada',
    handle: 'shankarpada',
    name: 'Shankarpada',
    category: 'shankarpada',
    line: 'Crisp, golden diamond-cut sweet bites made with refined wheat flour (maida) and sugar.',
    personality: 'THE SWEET ONE',
    price: String(UNIT_PRICE),
    mrp: String(UNIT_MRP),
    currencyCode: 'INR',
    variantId: 'gid://shopify/ProductVariant/50267737784577',
    accent: 'rose',
    weight: '100g',
    image: 'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-26_at_7.59.01_PM.jpg?v=1790446310',
    images: [
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-26_at_7.59.01_PM.jpg?v=1790446310',
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-26_at_7.58.33_PM.jpg?v=1790446257',
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-26_at_7.58.33_PM_1.jpg?v=1790446258',
      'https://cdn.shopify.com/s/files/1/0839/3470/7969/files/WhatsApp_Image_2026-09-26_at_7.58.34_PM.jpg?v=1790446258',
    ],
    shortDescription: 'Diamond-cut sweet Maharashtrian bites made with refined wheat flour (maida), refined sugar, and edible vegetable oil (palm oil) for a crisp, flaky crunch.',
    description: 'Traditional diamond-cut sweet bites crafted from refined wheat flour (72%), edible vegetable oil (16%, palm oil), refined sugar (8%), and hydrogenated vegetable fat. Lightly sweet, flaky, and made for tea-time and festive faral.',
    editorialFactStrip: [
      { value: '100G', label: 'NET WEIGHT' },
      { value: 'SWEET BITES', label: 'DIAMOND-CUT PASTRY' },
      { value: 'TRADITIONAL', label: 'DIWALI FARAL CLASSIC' },
      { value: '100% VEG', label: 'PURE VEGETARIAN' },
      { value: 'NO ADDED', label: 'PRESERVATIVES' }
    ],
    editorialAnnotations: [
      { text: 'DIAMOND CUT', pos: 'top-left' },
      { text: 'SWEET & FLAKY', pos: 'top-right' },
      { text: '100g PACK', pos: 'bottom-left' },
      { text: 'FESTIVE FARAL', pos: 'bottom-right' }
    ],
    trustClaims: [
      '100% Vegetarian',
      'No Preservatives',
      'No Artificial Flavours or Colors',
      'A Taste of Maharashtra'
    ],
    highlights: [
      { id: '1', title: 'Crisp & flaky diamond bite', icon: 'sparkles' },
      { id: '2', title: 'Traditional festive sweet snack', icon: 'heart' },
      { id: '3', title: 'Balanced sweetness in every bite', icon: 'coffee' },
      { id: '4', title: 'Freshly packed in 100g pouch', icon: 'package-check' },
      { id: '5', title: 'Perfect sweet tea-time companion', icon: 'users' },
      { id: '6', title: 'Classic Maharashtrian faral', icon: 'utensils' }
    ],
    packOptions: buildPackOptions(UNIT_PRICE, UNIT_MRP, 'gid://shopify/ProductVariant/50267737784577'),
    ingredientBreakdown: [
      {
        id: 'refined-wheat-flour',
        name: 'Refined Wheat Flour (72%)',
        nativeName: 'मैदा · Maida Base',
        index: '01',
        role: 'THE PASTRY DOUGH',
        image: null,
        specimenLabel: '72% MAIDA BASE',
        alt: 'Refined wheat flour pastry dough',
        nutritionalPointers: [
          {
            title: 'Signature Diamond Cut',
            text: 'Rolled into smooth sheets and hand-cut into classic bite-sized Maharashtrian lozenges.'
          },
          {
            title: 'Light, Even Crumb',
            text: 'Puffs gently during frying to create a crisp exterior and tender, biscuit-like interior.'
          },
          {
            title: 'Festive Faral Staple',
            text: 'The sweet counterbalance alongside savoury Chakli and spicy Bhakarwadi.'
          }
        ]
      },
      {
        id: 'edible-vegetable-oil',
        name: 'Edible Vegetable Oil (16%)',
        nativeName: 'खाद्यतेल · Palm Oil Medium',
        index: '02',
        role: 'THE FRYING MEDIUM',
        image: null,
        specimenLabel: 'GOLDEN FRY',
        alt: 'Edible vegetable palm oil frying medium',
        nutritionalPointers: [
          {
            title: 'Even Golden Colour',
            text: 'Slow-fried at steady heat so the thick diamond bites cook through without burning the sugar.'
          },
          {
            title: 'Long-Lasting Crispness',
            text: 'Keeps each bite crisp inside the sealed 100g pouch.'
          },
          {
            title: 'Clean Sweet Finish',
            text: 'Lets the gentle caramelised sugar note take center stage.'
          }
        ]
      },
      {
        id: 'refined-sugar',
        name: 'Refined Sugar (8%)',
        nativeName: 'साखर · Balanced Sweetness',
        index: '03',
        role: 'THE GENTLE SWEETNESS',
        image: null,
        specimenLabel: '8% SUGAR',
        alt: 'Refined sugar kneaded into dough',
        nutritionalPointers: [
          {
            title: 'Kneaded Into the Dough',
            text: 'Dissolved directly into the dough rather than coated on top, giving uniform, restrained sweetness.'
          },
          {
            title: 'Caramelised Edges',
            text: 'Lightly browns in the kettle for a warm, biscuit-sweet aroma.'
          },
          {
            title: 'Made for Tea Time',
            text: 'Sweet enough to satisfy a craving without overwhelming a cup of chai.'
          }
        ]
      },
      {
        id: 'shortening-fat',
        name: 'Vegetable Shortening',
        nativeName: 'मोहन · Flaky Layers',
        index: '04',
        role: 'THE SHORTENED CRUMB',
        image: null,
        specimenLabel: 'FLAKY CRUMB',
        alt: 'Hydrogenated vegetable fat shortening',
        nutritionalPointers: [
          {
            title: 'Traditional Mohan Technique',
            text: 'Worked into the flour before kneading to shorten the gluten strands and create flaky layers.'
          },
          {
            title: 'Tender Snap',
            text: 'Ensures each diamond breaks cleanly with a delicate, crumbly bite instead of turning hard.'
          },
          {
            title: 'Sealed for Freshness',
            text: 'Packed cool in airtight pouches to preserve texture.'
          }
        ]
      }
    ],
    whyIngredientsStory: 'Prepared from refined wheat flour (maida, 72%), edible vegetable oil (palm oil, 16%), refined sugar (8%), and hydrogenated vegetable fat for a crisp, flaky diamond bite.',
    nutritionFacts: [
      { nutrient: 'Energy', value: '460.2 Kcal' },
      { nutrient: 'Carbohydrate', value: '71.49 g' },
      { nutrient: 'Total Fat', value: '16.43 g' },
      { nutrient: 'Protein', value: '6.58 g' },
      { nutrient: 'Fiber', value: '0.00 g' },
      { nutrient: 'Sodium', value: '0.00 mg' },
      { nutrient: 'Sugar', value: '13.12 g' },
      { nutrient: 'Iron', value: '0.65 mg' },
      { nutrient: 'Calcium', value: '8.31 g' }
    ],
    nutritionFootnote: 'Nutritional information per 100 g approx. serving size as printed on the ZAKAAS Shankarpada pack.',
    madeTheZakaasWay: [
      { title: 'DIAMOND-CUT BITES', desc: 'Cut into classic bite-sized diamonds and slow-fried for even golden colour.' },
      { title: 'FRESHLY PACKED', desc: 'Sealed in 100g pouches to keep every sweet bite crisp and fresh.' },
      { title: 'NO PRESERVATIVES', desc: 'Made with no artificial flavours, no artificial colours, and no added preservatives.' }
    ],
    ingredients: 'Refined Wheat Flour (Maida, 72%), Edible Vegetable Oil (Palm Oil, 16%), Refined Sugar (8%), Hydrogenated Vegetable Fat.',
    allergenInfo: 'Contains: Wheat (Gluten). May contain traces of nuts and peanuts.',
    shelfLife: 'See MFG. DATE and EXP. DATE printed on the package.',
    origin: 'Festive Maharashtra',
    spiceLevel: 'Sweet & Crisp',
    manufacturingInfo: {
      manufacturedBy: 'Bharat Namkeen (Marketed by ZAKAAS)',
      fssaiLicNo: '10021021000754',
      netQuantity: '100 g',
      countryOfOrigin: 'India',
      foodCategory: 'Ready to Eat Traditional Sweet Snack',
      storageInstructions: 'Store in a cool, dry place. Keep sealed to maintain freshness.',
      shelfLife: 'Refer to MFG. DATE, EXP. DATE, and BATCH NO. printed on the pack.'
    },
    variants: [
      { id: 'var-shankarpada-1', title: '1 Pack (100g)', price: String(UNIT_PRICE), mrp: String(UNIT_MRP), variantId: 'gid://shopify/ProductVariant/50267737784577', packCount: 1 },
      { id: 'var-shankarpada-3', title: '3 Packs (300g)', price: String(UNIT_PRICE * 3), mrp: String(UNIT_MRP * 3), variantId: 'gid://shopify/ProductVariant/50267737784577', packCount: 3 },
      { id: 'var-shankarpada-5', title: '5 Packs (500g)', price: String(UNIT_PRICE * 5), mrp: String(UNIT_MRP * 5), variantId: 'gid://shopify/ProductVariant/50267737784577', packCount: 5 }
    ]
  }
];

export function getFallbackProductByHandle(handle) {
  if (!handle) return products[0];
  const normalized = handle.toLowerCase().replace('zakaas-', '');
  return products.find(p =>
    p.handle.toLowerCase() === normalized ||
    p.id.toLowerCase() === normalized ||
    (normalized.includes('shankar') && (p.handle.includes('shankar') || p.id.includes('shankar')))
  ) || products[0];
}
