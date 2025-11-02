# Design & Wireframes (Minimal)

Goal: Minimal, clean UI for real-estate listings with clear flows for search, view details, and user account actions.

Color / Typography
- Accent: `--accent: #0b69ff`
- Background: `--bg: #ffffff`
- Text: `--text: #0f172a`
- Use system fonts / Inter

Core pages (wireframe notes):

1) Home (/)
- Hero with background image, overlay title, short search bar
- Featured listings grid (cards)

2) Listings (/listings)
- Top: search & filters
- Grid of cards, each card clickable to property detail

3) Property Detail (/property/:id)
- Image (main), title, location, price, description, details (area/rooms)
- CTA: Contact owner / Save

4) Auth (Login / Register)
- Simple stacked inputs, clear labels, primary action button

5) Dashboard (/dashboard)
- User profile line
- My listings (grid)
- Button: Create Listing (opens form)

Create Listing (/create)
- Form fields: title, location, price, image url, type, bedrooms, bathrooms, area, description

UX Flow Summary
- Visitor lands on Home -> can search -> see Listings -> open Detail
- To post: Register/Login -> Dashboard -> Create Listing
