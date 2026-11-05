# E-RIDES Automotives — Project Case Study

## Overview

E-RIDES is a multi-page automotive website concept built to demonstrate front-end development skills and provide a foundation for a possible future automotive business website.

**Repository:** [Nexora-CyberX/ERIDES](https://github.com/Nexora-CyberX/ERIDES)  
**Project type:** Front-end demonstration  
**Current status:** Demo only — not a live booking or rental service

## The problem and goal

The project explores how an automotive website can organise vehicle discovery and service information in one interface. The goal was to build a navigable experience with clear page structure and useful browser-side interactions.

## Main features

- Home page with navigation and introductory content
- Vehicle inventory with search and filtering controls
- Rental calculator interface with duration, vehicle category, insurance selection, and price breakdown
- Services and contact pages
- Light/dark theme control
- FAQ and testimonial interface elements
- Responsive CSS structure

## Technology and structure

- **HTML5** for page structure
- **CSS3** for layout, components, and responsive styling
- **JavaScript** for browser-side interactions
- **Python** for an optional, separate barcode API utility

The website is organised into page files under `html/`, styles under `css/`, browser scripts under `JS/`, and supporting documentation and checks under `docs/` and `scripts/`.

## Engineering and quality work

The repository includes several improvements intended to make the demonstration safer and easier to maintain:

- Updated asset references for case-sensitive hosting environments.
- Improved inventory filtering and search-summary rendering.
- Kept the contact, booking, payment, map, and tracking features clearly in demonstration mode until real services are connected.
- Moved the optional barcode API token to the `PDF417_API_TOKEN` environment variable rather than embedding it in source code.
- Added request timeouts and HTTP error handling to the optional API utility.
- Added a `.gitignore` for local environment files and generated output.
- Added GitHub Actions checks for JavaScript syntax, local asset references, and duplicate HTML IDs.

## Automated validation

The latest GitHub Actions run on the default `main` branch completed successfully:

[View the Static site checks workflow](https://github.com/Nexora-CyberX/ERIDES/actions/workflows/static-site-checks.yml)

The automated checks are useful safeguards, but they do not replace manual browser testing, accessibility testing, or end-to-end tests of interactive behavior.

## Demo limitations

This project is not a production rental platform.

Vehicle listings, prices, offers, testimonials, and service descriptions are sample content. The booking, payment, contact, mapping, and service-tracking workflows are not connected to production providers and do not complete real transactions.

## Next steps

1. Capture real screenshots of the key pages and add them to the repository.
2. Complete manual responsive, keyboard, and screen-reader testing.
3. Add automated interaction tests for inventory filtering, calculator behavior, and navigation.
4. Replace sample business content only when verified information is available.
5. Connect a backend and trusted providers only if the project is intentionally developed into a live service.
6. Review repository history and revoke any previously exposed API credential with its provider.

## What this project demonstrates

E-RIDES is evidence of practice with multi-page web structure, responsive styling, JavaScript-driven UI behavior, basic API integration patterns, environment-based configuration, and automated repository checks. It is presented as a learning and portfolio project, not as professional production experience.
