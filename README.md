
# Explore Pakistan

The repository contains two Vite/React applications and an Express/MongoDB API:

- `user/` — public website
- `admin/` — administration portal
- `server/` — API, authentication, and persistence

## Local development

Use three terminals from the repository root:

```powershell
cd server
npm install
npm run dev
```

Configure `server/.env` using [server/.env.example](./server/.env.example). A
MongoDB connection string and a strong `JWT_SECRET` are required. To create an
administrator account, configure a private `ADMIN_SIGNUP_KEY`, open the admin
app's `/signup` page, and provide that key. Do not put it in either Vite
application's environment or source code.

```powershell
cd user
npm install
npm run dev
```

```powershell
cd admin
npm install
npm run dev
```

The Vite applications default to the configured hosted API. For local API
development, set `VITE_API_URL=http://localhost:5000/api/v1` in each app's
untracked `.env.local` file before starting Vite. Set `VITE_UPLOADS_URL` to
`http://localhost:5000/uploads` when using local uploads.

## Checks

Run `npm run lint` and `npm run build` from both `user/` and `admin/`.
The server currently has no automated test suite; `npm test` is only a
placeholder. MongoDB-backed integration and authentication workflows require
valid server environment configuration.
