# RSVPly Frontend

RSVPly Frontend is the user-facing web application for **RSVPly**, an event management and RSVP platform.
It is built with **Next.js App Router**, **TypeScript**, and a modern UI stack focused on **performance**, **accessibility**, and **clean UX**.

---

## ✨ Features

### 🔐 Authentication

* Login & Register flows
* JWT-based session persistence
* Auto-login on refresh
* Protected routes
* Automatic logout on token expiry

### 📅 Events

* View all available events
* Join / Leave events
* Real-time seat availability
* Prevent invalid actions (full / closed / already joined)

### 📊 Dashboard

* View events you created
* View events you joined
* Dashboard statistics:

  * Created events
  * Joined events
  * Upcoming events

### 🎨 UI / UX

* Responsive design
* Dark / Light mode toggle
* Status badges (Joined, Full, Closed)
* Disabled states for invalid actions
* Shadcn dialogs & components

---

## 🏗 Tech Stack

* **Next.js 14** (App Router)
* **React 18**
* **TypeScript**
* **Tailwind CSS v3**
* **shadcn/ui**
* **TanStack Query (React Query v5)**
* **Zustand** (auth state)
* **Axios**
* **Zod** (form validation)
* **React Hook Form**

---

## 🧠 Architecture Principles

### Feature-Based Structure

* Logic grouped by **feature**, not by type
* Easier to scale and maintain
* Clear ownership boundaries

### Separation of Concerns

* UI components are stateless where possible
* Data fetching via React Query
* Auth state via Zustand
* API access centralized in `services/`

---

## 🔐 Authentication Flow

1. User logs in / registers
2. Backend returns JWT
3. Token stored in Zustand (persisted)
4. Axios attaches token automatically
5. Protected layouts guard routes
6. Token expiry → auto logout

---

## 🔄 Data Fetching Strategy

* **TanStack Query v5**
* Cached responses
* Optimistic updates
* Minimal refetching

### Example

```ts
useQuery({
  queryKey: ["events"],
  staleTime: 60_000,
  refetchOnWindowFocus: false,
});
```

---

## 🎛 State Management

### Zustand (Auth Only)

* User info
* JWT token
* Auth status
* Hydration state

All server state is handled by **React Query**.

---

## 🎨 Styling & Theming

* Tailwind CSS utility-first styling
* shadcn/ui for accessible components
* CSS variables for theme tokens
* Dark / Light mode toggle

---

## 🧩 Forms & Validation

* **React Hook Form**
* **Zod** schemas
* Client-side validation
* Disabled submit during loading

---

## 🌍 Environment Variables

### (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 🧪 Error Handling

* Axios interceptors for 401 handling
* Toast notifications for API errors
* Disabled UI states during mutations

---

## 🧠 Best Practices Followed

* No `any` usage
* Strict TypeScript
* No prop drilling
* No redundant API calls
* Hydration-safe routing
* Accessible UI components

---

## 🧩 Future Improvements

* Event pagination
* Event detail page
* Calendar view
* Email notifications
* PWA support
