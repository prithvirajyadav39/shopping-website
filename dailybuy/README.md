# DailyBuy

A general marketplace storefront in the spirit of Amazon / Flipkart — multi-category browsing, search, a cart drawer, and a checkout flow. Frontend only, no backend or payment processing.

## Structure

```
dailybuy/
├── index.html   # page structure
├── style.css    # styling (design tokens at the top of the file)
└── script.js    # product catalog, cart logic, checkout flow
```

## Running it

Open `index.html` directly in your browser, or open the folder in VS Code and use the **Live Server** extension for auto-reload while editing.

## What's included

- 16 sample products across 6 categories (Electronics, Fashion, Home & Kitchen, Books, Beauty, Sports)
- Category filter chips + live search
- Cart drawer with quantity controls and remove
- Checkout form (name, email, address) → order summary → confirmation with a generated order ID

## What's not included (by design, since this is a frontend demo)

- No real payment processing
- No persistence — the cart and catalog reset on page reload
- No user accounts or order history

To make this production-ready you'd want a backend (product database, real payment gateway like Razorpay/Stripe, order storage, and auth).
