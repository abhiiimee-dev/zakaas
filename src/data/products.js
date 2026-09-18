export const products = [
  {
    id: 'bhakarwadi',
    handle: 'bhakarwadi',
    name: 'Bhākarwadi',
    category: 'bhakarwadi',
    line: 'Ami konala nai ghabrat.',
    personality: 'THE SPICY ONE',
    price: '240',
    currencyCode: 'INR',
    accent: 'clay',
    image: '/zakaas-bhakarwadi.jpg',
    images: ['/zakaas-bhakarwadi.jpg', '/zakaas-home-kitchen.png', '/zakaas-story-kitchen.png'],
    description: 'Crispy golden spiral rolls stuffed with a sweet, spicy, aromatic poppy seed, sesame, coconut and Maharashtrian spice masala. Hand-rolled using traditional home kitchen techniques.',
    ingredients: 'Gram flour (Besan), Whole wheat flour, Refined poppy seeds (Khas khas), White sesame seeds (Til), Dry grated coconut, Red chilli powder, Garam masala, Asafoetida (Hing), Salt, Refined peanut oil.',
    shelfLife: '90 Days',
    origin: 'Pune & Kolhapur Tradition',
    spiceLevel: 'Medium-Spicy',
    weight: '250g',
    variants: [
      { id: 'var-bhakarwadi-250', title: '250g Pack', price: '240', variantId: 'gid://shopify/ProductVariant/bhakarwadi-250' },
      { id: 'var-bhakarwadi-500', title: '500g Family Pack', price: '450', variantId: 'gid://shopify/ProductVariant/bhakarwadi-500' },
      { id: 'var-bhakarwadi-box3', title: 'Bundle of 3 Packs (750g)', price: '680', variantId: 'gid://shopify/ProductVariant/bhakarwadi-750' }
    ]
  },
  {
    id: 'chakli',
    handle: 'chakli',
    name: 'Chakli',
    category: 'chakli',
    line: 'Chal pooja, karuya.',
    personality: 'THE CRUNCHY ONE',
    price: '220',
    currencyCode: 'INR',
    accent: 'ochre',
    image: '/zakaas-chakli.jpg',
    images: ['/zakaas-chakli.jpg', '/zakaas-home-kitchen.png', '/zakaas-story-film.png'],
    description: 'Spiral crunch crafted from roasted rice flour, chana dal flour, cumin, sesame, and ajwain. Deep fried to golden perfection with an unmistakable crunch that commands the room.',
    ingredients: 'Roasted Rice flour, Chana dal flour (Bhajan flour), White sesame seeds (Til), Ajwain seeds, Cumin seeds, Red chilli powder, Asafoetida (Hing), Salt, Cold-pressed peanut oil.',
    shelfLife: '90 Days',
    origin: 'Maharashtra Classic',
    spiceLevel: 'Mild-Spicy',
    weight: '250g',
    variants: [
      { id: 'var-chakli-250', title: '250g Pack', price: '220', variantId: 'gid://shopify/ProductVariant/chakli-250' },
      { id: 'var-chakli-500', title: '500g Family Pack', price: '420', variantId: 'gid://shopify/ProductVariant/chakli-500' },
      { id: 'var-chakli-box3', title: 'Bundle of 3 Packs (750g)', price: '620', variantId: 'gid://shopify/ProductVariant/chakli-750' }
    ]
  },
  {
    id: 'shankarpali',
    handle: 'shankarpali',
    name: 'Shankarpali',
    category: 'shankarpada',
    line: 'Jevlis ka?',
    personality: 'THE SWEET ONE',
    price: '200',
    currencyCode: 'INR',
    accent: 'rose',
    image: '/zakaas-shankarpali.jpg',
    images: ['/zakaas-shankarpali.jpg', '/zakaas-story-kitchen.png', '/zakaas-story-film.png'],
    description: 'Diamond-cut sweet bites flaky on the outside, buttery melt-in-mouth inside. Made with organic sugar, pure desi ghee, cardamom, and semolina for festive comfort.',
    ingredients: 'Refined wheat flour (Maida), Pure Desi Ghee, Organic Sugar, Cardamom powder, Nutmeg powder, Milk, Pinch of rock salt.',
    shelfLife: '60 Days',
    origin: 'Festive Maharashtra',
    spiceLevel: 'Sweet & Aromatic',
    weight: '250g',
    variants: [
      { id: 'var-shankarpali-250', title: '250g Pack', price: '200', variantId: 'gid://shopify/ProductVariant/shankarpali-250' },
      { id: 'var-shankarpali-500', title: '500g Family Pack', price: '380', variantId: 'gid://shopify/ProductVariant/shankarpali-500' },
      { id: 'var-shankarpali-box3', title: 'Bundle of 3 Packs (750g)', price: '560', variantId: 'gid://shopify/ProductVariant/shankarpali-750' }
    ]
  },
  {
    id: 'royal-trio-box',
    handle: 'royal-trio-box',
    name: 'ZAKAAS Royal Trio Box',
    category: 'gifting',
    line: 'All three classics in one iconic tin.',
    personality: 'THE COMPLETE EXPERIENCE',
    price: '690',
    currencyCode: 'INR',
    accent: 'clay',
    image: '/zakaas-hero.png',
    images: ['/zakaas-hero.png', '/zakaas-bhakarwadi.jpg', '/zakaas-chakli.jpg', '/zakaas-shankarpali.jpg'],
    description: 'The ultimate Maharashtrian snack experience. Includes 1 Pack Bhākarwadi (250g), 1 Pack Chakli (250g), and 1 Pack Shankarpali (250g) in a rigid ZAKAAS brass-trimmed gift box.',
    ingredients: 'See individual product ingredient labels for Bhākarwadi, Chakli, and Shankarpali.',
    shelfLife: '60-90 Days',
    origin: 'All-Maharashtra Selection',
    spiceLevel: 'Sweet, Spicy & Crunchy',
    weight: '750g Total',
    variants: [
      { id: 'var-trio-box-1', title: '1 Gift Box (750g Total)', price: '690', variantId: 'gid://shopify/ProductVariant/trio-box-1' },
      { id: 'var-trio-box-2', title: '2 Box Set (1.5kg Total)', price: '1320', variantId: 'gid://shopify/ProductVariant/trio-box-2' }
    ]
  }
];

export function getFallbackProductByHandle(handle) {
  if (!handle) return null;
  const normalized = handle.toLowerCase().replace('zakaas-', '');
  return products.find(p => p.handle.toLowerCase() === normalized || p.id.toLowerCase() === normalized) || products[0];
}
