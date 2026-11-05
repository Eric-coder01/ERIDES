# Stage 2 Code Audit – E-RIDES Automotives

## Findings fixed in this branch

- Corrected HTML references to the uppercase `JS/` directory so scripts load on case-sensitive hosting.
- Corrected homepage image paths and replaced five references to image files that were not present in the repository.
- Expanded inventory filtering to include SUVs, sports cars, trucks, and bikes.
- Changed the inventory search summary to use text output instead of HTML injection.
- Removed duplicate rental-calculator markup and conflicting/unused homepage scripts. The old `topa.js` file contained invalid, unfinished React code and was not suitable as a browser script.
- Made the services map fail gracefully when no Maps key or verified service-centre coordinates are configured.
- Removed unverified personal contact details from the public contact page and clearly labelled its form as not connected.
- Marked the service tracker and sample review content as demonstration content rather than live business functionality.
- Added a static-site validation script and GitHub Actions workflow for JavaScript syntax, local assets, and duplicate HTML IDs.

## Items still requiring real business information or later implementation

1. **Contact form:** connect a backend or trusted form provider before accepting customer messages.
2. **Booking:** connect the quote/reservation controls to a real booking workflow; they must not imply a reservation has been made.
3. **Business details:** supply verified public business phone, email, address, opening hours, and emergency availability before publishing.
4. **Maps:** supply the real service-centre address and coordinates and configure a valid Google Maps API key. The code now expects `window.ERIDES_MAP_CONFIG = { lat, lng, address }`.
5. **Service tracker:** connect a real service-record system before enabling customer lookups.
6. **Inventory data:** confirm vehicle availability, prices, model years, and whether listings are for sale or rental.
7. **Content accuracy:** replace sample testimonials, sample offers, and illustrative service prices with verified information.
8. **Accessibility and responsive review:** manually test keyboard navigation, focus states, screen-reader labels, mobile layouts, and image alternatives.
9. **Browser testing:** test the complete site in current Chrome, Firefox, Safari, and mobile browsers.

## Validation status

The repository has a new automated check for local HTML assets and duplicate IDs, plus JavaScript syntax checks in GitHub Actions. A passing workflow run and real browser testing are still required before calling the site production-ready.


## Stage 3 – demo/live readiness and stronger validation

- Confirmed the product direction is both a portfolio demonstration and a future business-ready foundation.
- Added `docs/DEMO-TO-LIVE-PLAN.md` with explicit demo-mode rules, live prerequisites, integration boundaries, and release gates.
- Extended `scripts/check-site.js` to validate local assets referenced by CSS `url(...)` declarations as well as HTML `src`/`href` references and duplicate IDs.
- The site remains in DEMO mode. No real contact, booking, payment, map, or tracking provider is claimed to be connected.

## Remaining release blockers

- Add automated tests for interactive page behaviour and accessibility checks.
- Complete manual browser, mobile, keyboard, and screen-reader testing.
- Supply verified business information and configure provider accounts before enabling live workflows.
- Review the latest GitHub Actions results after the Stage 3 commits.
