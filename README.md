# finBridge Client

![finBridge Banner](/public/banner.png) *(Add banner image if applicable)*

**finBridge** is a modern, full-stack Microfinance Platform designed to bridge the gap between ambitious Entrepreneurs and Microfinance Institutions (MFIs). This repository houses the complete front-end Next.js application, featuring dynamic role-based dashboards, deeply integrated analytics, and a premium user interface.

## 🌟 Key Features

finBridge offers distinct portals tailored to three different user roles:

### 1. Platform Administrators (Super Admin)
- **Global Overview Dashboard:** Real-time analytics tracking Total Users, Active MFIs, Revenue, and Active Subscriptions.
- **Scale Analysis Visualizations:** Recharts-powered Bar and Pie charts breaking down platform health.
- **Financial Analytics:** Dedicated Revenue Reports with 7-day trend analysis (Area Charts).
- **MFI Ledger:** Comprehensive registry tracking the onboarding status of all partner MFIs.
- **Global Application Ledger:** Searchable oversight of every loan request on the platform.

### 2. Microfinance Institutions (MFI Admins)
- **Application Pipeline Management:** Accept or Reject incoming loan applications via fluid, modal-based workflows.
- **Detailed Applicant Reviews:** Access deep borrower data and view attached NID/Tax documents via secure URLs.
- **Loan Product Management:** Create, update, and toggle the active status of loan offerings, including Minimum/Maximum amount constraints.
- **Billing & Subscriptions:** View subscription payment history, analyze internal spend, and generate printable invoice documents.

### 3. Entrepreneurs (Borrowers)
- **Marketplace Discovery:** Browse and filter available loan products from verified MFIs.
- **Application Tracking:** Monitor the real-time status of loan applications (Pending, Approved, Rejected).
- **Visual Trajectory:** Dashboard visualizations mapping out the entrepreneur's historical requested loan amounts over time.

---

## 💻 Technology Stack

The client is built using modern, bleeding-edge web technologies to ensure a scalable, fast, and secure user experience:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI Primitives)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v20 or higher recommended)
- npm or yarn
- **Backend API:** This project requires the [finBridge API](https://github.com/Sabuj-Chowdhury/finBridge-api) (built with Laravel) to be running.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sabuj-Chowdhury/finBridge-client.git
   cd finBridge-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and configure your backend API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```
   *(Ensure your backend server is running and accessible at this URL)*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

The project utilizes the Next.js App Router paradigm. Key directories include:

```
finBridge-client/
├── app/                  # Next.js App Router pages and layouts
│   ├── (public)/         # Publicly accessible routes (Landing, Login, Register)
│   ├── admin/            # Platform Administrator secure routes
│   ├── mfi/              # Microfinance Institution secure routes
│   └── entrepreneur/     # Entrepreneur secure routes
├── components/           # Reusable UI components
│   ├── ui/               # shadcn/ui generic primitives (Cards, Buttons, etc.)
│   ├── shared/           # Cross-platform components (Navbar, DashboardLayout)
│   └── home/             # Landing page specific sections
├── lib/                  # Utilities and core configurations
│   ├── api.ts            # Centralized Axios interceptor for JWT auth
│   └── utils.ts          # Tailwind CSS merge utilities (cn)
├── store/                # Zustand state management
│   ├── auth.store.ts     # Global Authentication State
│   └── app.store.ts      # Global UI State (Sidebar toggles)
└── public/               # Static assets
```

---

## 🔐 Authentication & Security

finBridge uses **JSON Web Tokens (JWT)** for authentication. 
- The JWT is stored securely in `localStorage` upon successful login.
- The global `api.ts` Axios instance automatically intercepts outgoing requests and attaches the `Authorization: Bearer <token>` header.
- On the server side, requests are validated to ensure strict Role-Based Access Control (RBAC).

---

## 🤝 Contributing

We welcome contributions to finBridge! 

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying of this project, via any medium, is strictly prohibited.

*Built with passion for financial inclusion.*
