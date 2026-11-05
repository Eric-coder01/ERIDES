# E-RIDES Automotives

A front-end automotive website project for showcasing vehicles and presenting automotive services. The site is organised into separate pages for the home page, vehicle inventory, services, and contact information.

## Features

- **Home page** with the E-RIDES Automotives introduction and navigation.
- **Vehicle inventory** with vehicle categories and search/filter controls for details such as price, type, fuel, and year.
- **Rental tools** including rental-duration, vehicle-category, and insurance selections with price-calculation interfaces.
- **Services page** presenting vehicle protection, inspection, and emergency-service information.
- **Contact page** for customer enquiries.
- **Theme control** and responsive styling.

> Note: These are features represented in the current source files. Some booking, contact, or service actions may need backend integration before they can process real customer requests.

## Project structure

```text
ERIDES/
├── html/
│   ├── index.html
│   ├── inventory.html
│   ├── services.html
│   └── contact.html
├── css/
│   ├── main.css
│   ├── base.css
│   ├── components.css
│   ├── home.css
│   ├── inventory.css
│   ├── services.css
│   ├── contact.css
│   └── responsive.css
├── JS/
│   ├── calculator.js
│   ├── comparison.js
│   ├── faq.js
│   ├── features.js
│   ├── inventory.js
│   ├── services.js
│   ├── testimonials.js
│   ├── theme.js
│   └── topa.js
└── images/
    └── ...
```

## Getting started

This repository contains a browser-based front end.

1. Clone the repository:

   ```bash
   git clone https://github.com/Eric-coder01/ERIDES.git
   ```

2. Open the project folder in your editor.
3. Open `html/index.html` in a browser. For local development, you can use an editor extension such as Live Server and serve the repository folder.
4. Use the navigation to explore the Home, Inventory, Services, and Contact pages.

No Node.js installation is required for the basic static pages. If you work on individual scripts, check their imports and external service requirements before running them.

## Important security note

The repository currently includes a Python script at `css/api.py` that contains an API credential in its source code. Treat that credential as exposed:

- Revoke or rotate it with the service provider immediately.
- Remove the credential from the source and load any replacement from an environment variable or another secure secret store.
- Do not commit API keys, tokens, passwords, or other secrets to Git.
- Review the Git history as well; deleting a secret from the latest version does not remove it from earlier commits.

The Python script also calls an external barcode-generation API and is separate from the basic static website. Review it and configure its dependencies and credentials securely before running it.

## Development

The main website is built with HTML, CSS, and JavaScript. Contributions and improvements can be made through feature branches and pull requests.

Before submitting changes, please check that:

- Navigation links work across all pages.
- CSS and JavaScript asset paths resolve correctly.
- Inventory filters and calculators behave as expected.
- The layout remains usable on mobile and desktop screens.
- No private credentials or personal information are included in commits.

## License

No project license has been confirmed in the repository. Unless a license is added, others should not assume they have permission to reuse, modify, or distribute this project's code.
