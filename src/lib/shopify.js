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

function toProduct(product, index = 0) {
  const variant = product.variants.nodes[0];
  return {
    id: product.id,
    handle: product.handle,
    variantId: variant?.id,
    name: product.title,
    description: product.description,
    line: product.description,
    personality: 'MAHARASHTRA ORIGINAL',
    price: variant?.price?.amount,
    currencyCode: variant?.price?.currencyCode,
    image: product.featuredImage?.url || ['/zakaas-bhakarwadi.jpg','/zakaas-chakli.jpg','/zakaas-shankarpali.jpg'][index % 3],
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
  const data = await request(`mutation CartCreate($lines: [CartLineInput!]) { cartCreate(input: { lines: $lines }) { cart { id checkoutUrl totalQuantity lines(first: 30) { nodes { id quantity merchandise { ... on ProductVariant { id title product { title featuredImage { url altText } } } } } } } userErrors { message } } }`, { lines });
  if (data.cartCreate.userErrors.length) throw new Error(data.cartCreate.userErrors[0].message);
  return data.cartCreate.cart;
}

export async function addCartLines(cartId, lines) {
  const data = await request(`mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { id checkoutUrl totalQuantity } userErrors { message } } }`, { cartId, lines });
  if (data.cartLinesAdd.userErrors.length) throw new Error(data.cartLinesAdd.userErrors[0].message);
  return data.cartLinesAdd.cart;
}
