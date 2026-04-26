Enhance the existing Microfinance frontend with a **complete Loan Application Flow** integrated with backend API.

---

# 🎯 CORE FEATURE: LOAN APPLY FLOW

Implement the **“Apply Loan” behavior** for loan products with strict role-based logic.

---

# 🧠 APPLY BUTTON LOGIC (CRITICAL)

Every loan product card must have an **Apply button**.

### Behavior:

#### 1. If user NOT logged in:

* Clicking “Apply” →
  Redirect to: **Entrepreneur Registration Page**

---

#### 2. If user logged in AND role = entrepreneur:

* Clicking “Apply” →
  Redirect to: **Loan Application Form Page**

---

#### 3. If user logged in BUT role ≠ entrepreneur:

* Disable Apply button
* Show tooltip:
  “Only entrepreneurs can apply for loans”

---

# 📄 LOAN APPLICATION FORM PAGE

Create a dedicated page:
`/apply-loan`

---

## 🧩 Form Fields

### Hidden (auto-filled):

* mfi_id (from selected product)
* loan_product_id (from selected product)

---

### User Inputs:

* amount (number)
* duration_months (number)
* purpose (textarea)

---

### File Uploads:

* nid (REQUIRED)
* tax (OPTIONAL)
* tin (OPTIONAL)

---

## ⚠️ VALIDATION RULES

* amount > 0
* duration_months ≥ 1
* nid file REQUIRED
* Accept file types:

  * jpg, jpeg, png, pdf
* Max file size: 2MB

---

# 🌐 API INTEGRATION

### Endpoint:

POST /loan/apply

---

## 🔥 IMPORTANT: REQUEST FORMAT

Must send as:
**multipart/form-data**

---

## 📦 Payload Structure

Use FormData:

* data → JSON string:

```json
{
  "mfi_id": "...",
  "loan_product_id": "...",
  "amount": 20000,
  "duration_months": 6,
  "purpose": "Small business expansion"
}
```

* nid → file (required)
* tax → file (optional)
* tin → file (optional)

---

## ⚙️ Axios Implementation Rules

* Use FormData()
* Append:

  * data (stringified JSON)
  * files individually
* Include header:
  Authorization: Bearer <token>

---

# 🔔 TOAST BEHAVIOR

### On success:

* Show toast:
  “Loan application submitted successfully”

---

### On error:

Handle backend responses:

* “Only entrepreneurs can apply”
* “You have already applied”
* “Invalid loan product”
* “Application failed”

Display as destructive toast

---

# 🔄 UI STATES

* Submit button:

  * Show loading state while submitting
* Disable form during submission
* Reset form on success

---

# 🧭 NAVIGATION FLOW

### From Loan Card:

* Pass:

  * mfi_id
  * loan_product_id

Use:

* URL params OR state (preferred: URL query)

Example:
`/apply-loan?mfi_id=xxx&loan_product_id=yyy`

---

# 🎨 UI/UX REQUIREMENTS

* Use shadcn form components
* Clean layout
* Mobile-friendly
* Clear labels

---

# ✨ ANIMATIONS

Use Framer Motion:

* Page entry animation
* Form fade-in
* Button hover effects

Keep animations subtle and fast

---

# 🔐 SECURITY / ROLE CHECK

* Double-check role before rendering form
* If not entrepreneur:

  * Redirect OR block UI

---

# 🧠 EDGE CASES (MANDATORY)

* If user manually enters /apply-loan without login:
  → Redirect to login

* If missing query params:
  → Redirect back to loan listing

---

# ⚡ PERFORMANCE

* No unnecessary re-renders
* Efficient file handling
* Clean state management via Zustand

---

# 🎯 FINAL GOAL

Deliver a **robust loan application experience** that:

* Enforces role-based access strictly
* Handles file uploads correctly
* Integrates perfectly with backend controller
* Provides clear user feedback via toast
* Works smoothly on mobile devices

---
