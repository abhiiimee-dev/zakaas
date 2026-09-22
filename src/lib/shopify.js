// Shopify Storefront API adapter. Public storefront tokens are safe to use in client apps;
// never place Admin API credentials here.
import { products as fallbackProducts, getFallbackProductByHandle } from '../data/products';

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-01';

export const shopifyConfigured = Boolean(domain && token);

async function request(query, variables = {}) {
  if (!shopifyConfigured) throw new Error('Shopify is not configured.');
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
  images(first: 5) { nodes { url altText } }
  variants(first: 20) { nodes { id title availableForSale price { amount currencyCode } } }
`;

function toProduct(product, index = 0) {
  const variant = product.variants?.nodes?.[0];
  const fallback = getFallbackProductByHandle(product.handle) || fallbackProducts[index % fallbackProducts.length] || {};
  return {
    ...fallback,
    id: product.id || fallback.id,
    handle: product.handle || fallback.handle,
    variantId: variant?.id || fallback.variants?.[0]?.variantId || `var-${product.handle}-default`,
    name: product.title || fallback.name,
    description: product.description || fallback.description,
    shortDescription: fallback.shortDescription || product.description,
    line: fallback.line || product.description,
    personality: fallback.personality || 'MAHARASHTRA ORIGINAL',
    price: variant?.price?.amount || fallback.price || '150',
    mrp: fallback.mrp || '199',
    currencyCode: variant?.price?.currencyCode || fallback.currencyCode || 'INR',
    image: product.featuredImage?.url || fallback.image || ['/zakaas-bhakarwadi.jpg','/zakaas-chakli.jpg','/zakaas-shankarpali.jpg'][index % 3],
    images: product.images?.nodes?.map(i => i.url).filter(Boolean).length 
      ? product.images.nodes.map(i => i.url) 
      : (fallback.images || [fallback.image]),
    trustClaims: fallback.trustClaims || [],
    highlights: fallback.highlights || [],
    packOptions: fallback.packOptions || [],
    ingredients: fallback.ingredients,
    allergenInfo: fallback.allergenInfo,
    shelfLife: fallback.shelfLife,
    origin: fallback.origin,
    manufacturingInfo: fallback.manufacturingInfo,
    variants: product.variants?.nodes?.map(v => ({
      id: v.id,
      title: v.title,
      price: v.price?.amount,
      currencyCode: v.price?.currencyCode || 'INR',
      variantId: v.id,
      availableForSale: v.availableForSale ?? true
    })) || fallback.variants || [{ id: `var-${product.handle}-1`, title: '1 Pack (100g)', price: variant?.price?.amount || fallback.price, variantId: variant?.id }]
  };
}

export async function getProducts() {
  if (!shopifyConfigured) return fallbackProducts;
  try {
    const data = await request(`query Products { products(first: 30) { nodes { ${productFields} } } }`);
    const shopifyItems = data.products.nodes
      .filter(p => p.handle !== 'zakaas-gift-packaging')
      .map((p, i) => toProduct(p, i));
    return shopifyItems.length ? shopifyItems : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getProductByHandle(handle) {
  if (!shopifyConfigured) return getFallbackProductByHandle(handle);
  try {
    const data = await request(`query ProductByHandle($handle: String!) { product(handle: $handle) { ${productFields} } }`, { handle });
    if (data.product) return toProduct(data.product);
    return getFallbackProductByHandle(handle);
  } catch {
    return getFallbackProductByHandle(handle);
  }
}

export async function createCart(lines) {
  const data = await request(`mutation CartCreate($lines: [CartLineInput!]) { cartCreate(input: { lines: $lines }) { cart { id checkoutUrl totalQuantity lines(first: 30) { nodes { id quantity merchandise { ... on ProductVariant { id title product { title featuredImage { url altText } } } } } } } userErrors { message } } }`, { lines });
  if (data.cartCreate.userErrors.length) throw new Error(data.cartCreate.userErrors[0].message);
  return data.cartCreate.cart;
}

export async function updateCartLines(cartId, lines) {
  const data = await request(`mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id checkoutUrl totalQuantity lines(first: 30) { nodes { id quantity merchandise { ... on ProductVariant { id } } } } } userErrors { message } } }`, { cartId, lines });
  if (data.cartLinesUpdate.userErrors.length) throw new Error(data.cartLinesUpdate.userErrors[0].message);
  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId, lineIds) {
  const data = await request(`mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id checkoutUrl totalQuantity lines(first: 30) { nodes { id quantity merchandise { ... on ProductVariant { id } } } } } userErrors { message } } }`, { cartId, lineIds });
  if (data.cartLinesRemove.userErrors.length) throw new Error(data.cartLinesRemove.userErrors[0].message);
  return data.cartLinesRemove.cart;
}

export async function addCartLines(cartId, lines) {
  const data = await request(`mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { id checkoutUrl totalQuantity lines(first: 30) { nodes { id quantity merchandise { ... on ProductVariant { id } } } } } userErrors { message } } }`, { cartId, lines });
  if (data.cartLinesAdd.userErrors.length) throw new Error(data.cartLinesAdd.userErrors[0].message);
  return data.cartLinesAdd.cart;
}
