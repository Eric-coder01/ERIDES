# E-RIDES demo-to-live implementation plan

## Product direction

E-RIDES has two intended uses:

1. **Portfolio demonstration:** visitors can explore the interface, sample inventory, calculators, service descriptions, and clearly labelled demo interactions.
2. **Business-ready foundation:** the codebase should be structured so verified business information and provider integrations can be configured later without rebuilding the site.

Until real business details and provider accounts are supplied, the public site must remain in demo mode. It must not imply that a real enquiry was sent, a vehicle was reserved, a payment was taken, or a service record was retrieved.

## Demo-mode rules

- Label sample vehicles, prices, availability, offers, testimonials, and service records as examples.
- Do not publish invented phone numbers, email addresses, street addresses, opening hours, map pins, or customer reviews.
- Do not collect or transmit customer data from a form that has no configured receiver.
- Keep payment, booking, messaging, maps, and tracking integrations disabled until their provider accounts and server-side configuration are ready.
- Never put private API tokens in browser JavaScript, HTML, CSS, or a public repository.
- Keep any demo-only interactions local to the browser and explain what they do.

## Live-mode prerequisites

Before changing the site from demo to live, complete all of the following:

- Confirm the legal business name and public contact details.
- Confirm the business address, service-centre coordinates, opening hours, and emergency-service coverage.
- Verify every vehicle listing, price, sale/rental status, and availability date.
- Obtain permission to publish real customer testimonials and photographs.
- Select and configure a server-side contact/booking provider.
- Define how customer data is stored, protected, retained, and deleted.
- Configure map keys with domain restrictions and appropriate usage limits.
- Implement server-side validation, spam protection, rate limiting, and safe error handling.
- Add a privacy notice and terms appropriate to the actual service and jurisdiction.
- Test the complete customer journey in staging before enabling production mode.

## Suggested integration boundaries

| Capability | Demo behaviour | Live implementation required |
| --- | --- | --- |
| Contact | Disabled form with clear notice | Server endpoint or trusted form provider |
| Booking / rental quote | Estimate only; no reservation | Availability, quote, confirmation and cancellation workflow |
| Maps | No unverified business pin | Verified address/coordinates and restricted map key |
| Service tracking | Demo notice; no lookup | Authenticated backend and protected service records |
| Payments | No payment collection | Approved payment provider and server-side verification |
| Inventory | Clearly marked sample listings | Verified stock feed or controlled inventory management |

## Release gates

A live release is blocked until every live-mode prerequisite is checked and the following pass:

- Automated static asset, duplicate-ID, and JavaScript syntax checks.
- Manual keyboard and screen-reader review.
- Responsive checks on phone, tablet, and desktop sizes.
- Browser checks in current Chrome, Firefox, Safari, and Edge.
- Form, booking, and API integration tests in a non-production environment.
- Privacy and security review of all customer-data flows.

## Current status

**Mode: DEMO.** Business information and provider accounts have not yet been verified or configured. This document is a readiness plan, not a claim that the site is already production-ready.
