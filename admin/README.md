# Explore Pakistan - Admin Panel

Admin dashboard for managing tours, bookings, webpages, and site settings.

The admin UI requires a server account with the `admin` role. Configure
`ADMIN_SIGNUP_KEY` on the server only, then use `/signup` to create an
administrator. All administrator API routes verify the account role on the
server; UI route checks are not the security boundary.

## Tech Stack

- React 19 + Vite
- Tailwind CSS
- Radix UI Components
- React Hook Form
- React Router DOM

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Local API

By default, the app uses the hosted API. To work with the local backend, set
`VITE_API_URL=http://localhost:5000/api/v1` and
`VITE_UPLOADS_URL=http://localhost:5000/uploads` in an untracked `.env.local`
file. See the repository root README for server setup.
