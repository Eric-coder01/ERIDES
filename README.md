# E-RIDES Automotives

[![Static site checks](https://github.com/Nexora-CyberX/ERIDES/actions/workflows/static-site-checks.yml/badge.svg?branch=main)](https://github.com/Nexora-CyberX/ERIDES/actions/workflows/static-site-checks.yml)

E-RIDES is a multi-page automotive website concept built as a front-end portfolio project and a possible foundation for a future automotive business website.

The project demonstrates page structure, responsive styling, browser-side interactions, inventory filtering interfaces, and rental-price calculation UI.

## Project highlights

- **Home page** introducing the E-RIDES concept.
- **Vehicle inventory** with category and search/filter interfaces for price, type, fuel, and year.
- **Rental calculator UI** with rental duration, vehicle category, insurance selection, and a price breakdown.
- **Services and contact pages** presenting service information and an enquiry interface.
- **Theme control** and responsive CSS.

## Project case study

See [the E-RIDES project case study](docs/PROJECT-CASE-STUDY.md) for the project goal, structure, engineering improvements, automated validation, limitations, and next steps.

## Technology

- HTML5
- CSS3
- JavaScript
- Optional Python utility for a separate barcode API experiment

## Demo status and limitations

**This repository is a demonstration, not a live car-rental platform.**

Vehicle listings, prices, offers, testimonials, and service descriptions are sample content. The booking, payment, contact, mapping, and tracking workflows are not connected to production services and do not complete real transactions. Do not rely on the sample business information as verified.

Before presenting this project as production-ready, the remaining work includes connecting and testing a backend, validating all business content, implementing secure form handling, and completing accessibility and cross-device testing.

## Run locally

The main website is static HTML, CSS, and JavaScript.

1. Clone the repository:

   ```bash
   git clone https://github.com/Nexora-CyberX/ERIDES.git
   cd ERIDES
   ```

2. Open `html/index.html` in a browser, or serve the repository folder with a local development server such as VS Code Live Server.
3. Explore the Home, Inventory, Services, and Contact pages.

No Node.js installation is required for the basic static website.

## Repository structure

```text
ERIDES/
├── html/       # Website pages
├── css/        # Page styles, components, responsive rules
├── JS/         # Browser-side interactions
├── images/     # Website imagery
├── docs/       # Project notes and readiness documentation
├── scripts/    # Supporting scripts
└── README.md
```

## Optional barcode API utility

A separate Python utility is included in the repository. It is not required to run the website. Follow the script's own setup instructions and keep provider tokens in environment variables.

Never commit real API tokens or credentials. If a credential was ever committed, revoke or rotate it with the provider; deleting it from the latest file does not remove it from Git history.

## Development checklist

- [ ] Verify navigation and all asset paths on every page.
- [ ] Test inventory filters and calculator behavior.
- [ ] Test responsive layouts on mobile and desktop.
- [ ] Check keyboard navigation, labels, contrast, and screen-reader semantics.
- [ ] Ensure all forms clearly identify demo behavior until a backend is connected.
- [ ] Scan the repository and its history for secrets before public release.
- [ ] Add a license only after choosing terms that match the intended reuse.

## License

No license is currently declared. Unless a license is added, visitors should not assume they have permission to reuse, modify, or distribute this project.
