Project: "Local Service MarketPlace Build with MERN"
Tech use: React, Node, Express, MongoDB, JWT

# Local Service Marketplace 🚀

**MERN Stack app connecting local customers with service providers** (UrbanCompany-style)

## Features
- 🔐 JWT authentication + role-based access (customer/provider/admin)
- 📋 Service providers create/edit listings (plumber, electrician, tutor...)
- 🔍 Customers browse/filter services by category/city
- 📩 Simple booking request system (no payments in v1)
- 🛡️ Protected routes + input validation

## Tech Stack

## Progress Log

- Day 1–2: Backend auth with JWT (signup, login, role-based middleware)
- Day 3: Provider service listing model + create/my listings APIs
- Day 4: Public service listing + filters + details APIs
- Day 5: Customer browse page (React) wired to /api/services, basic filters and service cards working
- Day 6: Implemented Service Details route and page wired to GET /api/services/:id with loading and not-found states.
- Day 7: Implemented Booking model and customer request flow from Service Details page (pending requests stored with service, provider, and customer links).
- Day 8: Built customer "My Requests" and provider "Incoming Requests" dashboards listing bookings with service, note, status, and created date.
- Day 9: Added provider accept/reject booking actions (PATCH status) with role/ownership validation and reflected updates on customer + provider dashboards.


