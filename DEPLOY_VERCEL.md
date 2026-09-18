# Deploy ZAKAAS Headless Storefront

This Vite site is prepared for Vercel. Use the project root as the deployment directory.

## Required Vercel environment variables

Add these in Vercel under **Project → Settings → Environment Variables** for Production, Preview, and Development:

- `VITE_SHOPIFY_STORE_DOMAIN=wcfsjc-ib.myshopify.com`
- `VITE_SHOPIFY_STOREFRONT_TOKEN=` the public Storefront API token from Shopify Headless
- `VITE_SHOPIFY_API_VERSION=2025-01`

The Storefront token is intentionally public-client scoped; do not use or upload the private Headless token or Shopify Admin credentials.

## Domain cutover

After the Vercel deployment is healthy, add `zakaas.in` and `www.zakaas.in` in Vercel's Domains panel. Update the DNS records at the domain registrar to Vercel’s records shown in that panel. Shopify remains the commerce backend and still handles checkout.
