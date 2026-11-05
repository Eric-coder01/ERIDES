# E-RIDES Automotives

A front-end automotive website project designed for both a portfolio demonstration and a future automotive business website. The site is organised into separate pages for the home page, vehicle inventory, services, and contact information.

## Features

- **Home page** with the E-RIDES Automotives introduction and navigation.
- **Vehicle inventory** with vehicle categories and search/filter controls for price, type, fuel, and year.
- **Rental tools** with rental-duration, vehicle-category, and insurance selections and price-calculation interfaces.
- **Services page** presenting vehicle protection, inspection, and emergency-service information.
- **Contact page** for customer enquiries.
- **Theme control** and responsive styling.

## Current operating mode: DEMO

E-RIDES is currently a portfolio demonstration and a foundation for a future business website. Business contact details and provider accounts have not been verified or configured. Sample listings, prices, offers, testimonials, and service content must not be treated as live business information. Contact, booking, payment, maps, and service-tracking workflows are not connected to real providers and do not complete real transactions.

See [the demo-to-live readiness plan](docs/DEMO-TO-LIVE-PLAN.md) before configuring or publishing any live customer workflow.

## Project structure

```text
ERIDES/
├── html/       # Home, inventory, services, and contact pages
├── css/        # Page styles, components, and responsive rules
├── JS/         # Browser-side interactions
├── images/     # Website images
├── requirements.txt
└── README.md
```

## Getting started

The website's main pages are static HTML, CSS, and JavaScript.

1. Clone the repository:

   ```bash
   git clone https://github.com/Eric-coder01/ERIDES.git
   cd ERIDES
   ```

2. Open `html/index.html` in a browser. For local development, serve the repository folder with a local static server such as VS Code Live Server.
3. Navigate through Home, Inventory, Services, and Contact.

No Node.js installation is required for the basic static pages.

## Optional barcode API script

The repository also contains `css/api.py`, a separate Python utility that calls the PDF417 Pro barcode API. It is not required to run the website.

1. Install Python 3.9 or newer.
2. Install its dependency:

   ```bash
   python -m pip install -r requirements.txt
   ```

3. Set the API token in your environment:

   **Linux/macOS**
   ```bash
   export PDF417_API_TOKEN="your-provider-token"
   python css/api.py
   ```

   **PowerShell**
   ```powershell
   $env:PDF417_API_TOKEN = "your-provider-token"
   python css/api.py
   ```

Never put a real token in source code, README files, screenshots, or commits. The previous hard-coded credential must be revoked or rotated with the provider. Removing a credential from the latest file does not remove it from Git history.

## Development checklist

Before submitting changes, verify that:

- Navigation links work across all pages.
- CSS and JavaScript asset paths resolve correctly.
- Inventory filters and calculators behave as expected.
- Layouts work on mobile and desktop.
- Forms and booking actions clearly indicate whether they are demonstrations or connected to a real backend.
- Demo content is clearly separated from verified business information.
- No private credentials or personal information are committed.

## License

No project license has been confirmed in this repository. Until a license is added, others should not assume they have permission to reuse, modify, or distribute this project's code.
