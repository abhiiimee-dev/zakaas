// Shopify Storefront API adapter. Public storefront tokens are safe to use in client apps;
// never place Admin API credentials here.
const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-01';

export const shopifyConfigured = Boolean(domain && token);

async function request(query, variables = {}) {
  if (!shopifyConfigured) throw new Error('Shopify is not configured. Add VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN.');
  const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  if (!response.ok || data.errors) throw new Error(data.errors?.[0]?.message || 'Shopify request failed.');
  return data.data;
}

const productFields = `
  id handle title description
  featuredImage { url altText }
  variants(first: 20) { nodes { id title availableForSale price { amount currencyCode } } }
`;

const cartFields = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 50) {
    nodes {
      id
      quantity
      cost {
        totalAmount { amount currencyCode }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          price { amount currencyCode }
          product {
            id
            handle
            title
            featuredImage { url altText }
          }
        }
      }
      attributes {
        key
        value
      }
    }
  }
`;

const editorialData = {
  shankarpali: {
    punchline: 'JUST ONE MORE.',
    personality: 'SWEET CRUNCH DIAMONDS',
    line: 'Light, sweet, crisp diamonds that disappear by the handful. Traditional taste, modern craving.',
    accent: 'rose',
    image: '/zakaas-shankarpali.jpg',
  },
  chakli: {
    punchline: 'CRUNCH FIRST.',
    personality: 'THE SPIRAL FIRECRACKER',
    line: 'Geometric spiral perfection with cumin-spiced fire. Unapologetic Maharashtrian crunch.',
    accent: 'ochre',
    image: '/zakaas-chakli.jpg',
  },
  bhakarwadi: {
    punchline: "THIS WON'T LAST LONG.",
    personality: 'THE SWEET-SPICY SPIRAL',
    line: 'Ami konala nai ghabrat. Roasted coconut, sesame, and signature Maharashtrian spice rolled tight.',
    accent: 'clay',
    image: '/zakaas-bhakarwadi.jpg',
  },
  bhakarvadi: {
    punchline: "THIS WON'T LAST LONG.",
    personality: 'THE SWEET-SPICY SPIRAL',
    line: 'Ami konala nai ghabrat. Roasted coconut, sesame, and signature Maharashtrian spice rolled tight.',
    accent: 'clay',
    image: '/zakaas-bhakarwadi.jpg',
  }
};

function toProduct(product, index = 0) {
  const variant = product.variants?.nodes?.[0];
  const handleKey = (product.handle || '').toLowerCase().replace(/zakaas-|-pack/g, '');
  const editorial = editorialData[handleKey] || editorialData[Object.keys(editorialData)[index % 3]] || {};
  
  const fallbackImages = ['/zakaas-shankarpali.jpg', '/zakaas-chakli.jpg', '/zakaas-bhakarwadi.jpg'];
  const image = product.featuredImage?.url || editorial.image || fallbackImages[index % 3];

  return {
    id: product.id,
    handle: product.handle,
    variantId: variant?.id,
    name: product.title,
    description: product.description || editorial.line,
    line: editorial.line || product.description,
    punchline: editorial.punchline || 'YOU KNOW THIS ONE.',
    personality: editorial.personality || 'MAHARASHTRA ORIGINAL',
    accent: editorial.accent || ['rose', 'ochre', 'clay'][index % 3],
    price: variant?.price?.amount || '180',
    currencyCode: variant?.price?.currencyCode || 'INR',
    image,
  };
}

export async function getProducts() {
  const data = await request(`query Products { products(first: 30) { nodes { ${productFields} } } }`);
  return data.products.nodes.filter(product => product.handle !== 'zakaas-gift-packaging').map(toProduct);
}

export async function getProductByHandle(handle) {
  const data = await request(`query ProductByHandle($handle: String!) { product(handle: $handle) { ${productFields} } }`, { handle });
  return data.product ? toProduct(data.product) : null;
}

export async function createCart(lines) {
  const data = await request(
    `mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ${cartFields} }
        userErrors { message }
      }
    }`,
    { lines }
  );
  if (data.cartCreate.userErrors?.length) throw new Error(data.cartCreate.userErrors[0].message);
  return data.cartCreate.cart;
}

export async function addCartLines(cartId, lines) {
  const data = await request(
    `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${cartFields} }
        userErrors { message }
      }
    }`,
    { cartId, lines }
  );
  if (data.cartLinesAdd.userErrors?.length) throw new Error(data.cartLinesAdd.userErrors[0].message);
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(cartId, lines) {
  const data = await request(
    `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${cartFields} }
        userErrors { message }
      }
    }`,
    { cartId, lines }
  );
  if (data.cartLinesUpdate.userErrors?.length) throw new Error(data.cartLinesUpdate.userErrors[0].message);
  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId, lineIds) {
  const data = await request(
    `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${cartFields} }
        userErrors { message }
      }
    }`,
    { cartId, lineIds }
  );
  if (data.cartLinesRemove.userErrors?.length) throw new Error(data.cartLinesRemove.userErrors[0].message);
  return data.cartLinesRemove.cart;
}
