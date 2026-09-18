# Connect ZAKAAS to Shopify

1. In Shopify Admin, go to **Settings → Apps and sales channels → Develop apps**.
2. Create an app, configure **Storefront API** access, and enable product, cart, and checkout permissions.
3. Install the app and copy the **Storefront API access token**.
4. Copy `.env.example` to `.env.local` and enter your `myshopify.com` domain and token.
5. Share the domain and token with the implementation team through a secure channel, or add them to `.env.local` yourself. Never use an Admin API token in this frontend.

Existing Shopify checkout, payment settings, customer data, and orders remain on Shopify. This storefront will only create carts and redirect buyers to Shopify checkout.
