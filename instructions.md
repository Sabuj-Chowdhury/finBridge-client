

---

# 🧱 TECH STACK (STRICT)

* Axios (ONLY for API calls)
* Zustand (global state management)
* React Hook Form + Zod

* shadcn Toast (for notifications)

---

# 🌐 API CONFIGURATION (MANDATORY)

Base URL:
http://localhost:8000/api/v1

### Available Endpoints:

* POST /auth/login

* POST /auth/logout

* POST /auth/register/entrepreneur

* POST /auth/register/mfi

* GET /me

* GET /loan-products

* POST /loan/apply

* GET /entrepreneur/dashboard

* GET /mfi/dashboard

* GET /mfis

* POST /mfi/loan-products

* GET /mfi/applications

* GET /mfi/applications/{id}

* POST /mfi/applications/{id}/approve

* POST /mfi/applications/{id}/reject

---

# ⚙️ AXIOS SETUP

Create `/lib/api.ts`

### Requirements:

* Base URL set to:
  http://localhost:8000/api/v1

* Request interceptor:

  * Attach header:
    Authorization: Bearer <token>

* Token source:

  * Zustand store OR localStorage

* Response interceptor:

  * Handle 401 → redirect to login

---

# 🧠 STATE MANAGEMENT (ZUSTAND)

### useAuthStore:

* user
* token
* role
* isAuthenticated

### Behavior:

* On app load:

  * Read token from localStorage
  * Hydrate Zustand store
* Persist login session across refresh
* Logout clears:

  * Zustand
  * localStorage

---

# 🔔 TOAST NOTIFICATIONS (MANDATORY)

Use shadcn toast system

### Use cases:

* Login success / failure
* Form submission success / error
* API errors

### Rules:

* Success → normal toast
* Error → destructive toast
* Messages must be clear and user-friendly

---

# 🧭 NAVIGATION (MEANINGFUL + REAL CONTENT)

Navbar must include:

* Home
* Find Loans
* How It Works
* For Entrepreneurs
* For MFIs
* About Us
* Contact
* Login

### Rules:

* Every link must lead to meaningful content
* No placeholder pages
* Language must be simple and clear (Bangladesh-friendly)

---

# 🏠 HOMEPAGE (STRICT STRUCTURE)

### ❗ No generic "Register" button

Include: in the navlinks as well as in the hero section

* Register as Entrepreneur
* Register as MFI Institution
* Login

---









# 📦 FORMS

* React Hook Form + Zod
* Inline validation
* Toast on submit result
* File upload support (later step)

---

# ⚡ PERFORMANCE

* Fast load (<1.5s)
* Skeleton loaders (NOT spinners)
* Optimized UI rendering

--