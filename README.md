# Judix Full-Stack Assignment (Next.js + Express + MongoDB)

Production-ready full-stack app with JWT authentication (stored in httpOnly cookies) and a Tasks CRUD module.

## Tech Stack

- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, Axios, Zustand
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

## Repo Structure

- `backend/` Express API + MongoDB
- `frontend/` Next.js web app
- `postman/` Postman collection
- `docs/` API documentation

## Setup

### 1) Backend

1. Create `backend/.env` (copy from `backend/.env.example`):

   - `MONGODB_URI` Mongo connection string
   - `JWT_SECRET` secret used to sign tokens
   - `NODE_ENV` `development` or `production`
   - `PORT` default `5000`
   - `FRONTEND_URL` default `http://localhost:3000`

2. Install deps and run:

   - `cd backend`
   - `npm install`
   - `npm run dev`

Backend will run at `http://localhost:5000`.

### 2) Frontend

1. Create `frontend/.env.local` (copy from `frontend/.env.local.example`):

   - `NEXT_PUBLIC_API_URL=http://localhost:5000`

2. Install deps and run:

   - `cd frontend`
   - `npm install`
   - `npm run dev`

Frontend will run at `http://localhost:3000`.

## How Authentication Works

- On successful `POST /auth/register` or `POST /auth/login`, the backend:
  - signs a JWT containing `{ userId }`
  - sets the JWT in a `token` httpOnly cookie
- The frontend uses `axios` with `withCredentials: true` so cookies are included automatically.
- Backend protected APIs read and verify the `token` cookie.
- Frontend route protection:
  - Next.js `middleware.ts` blocks `/dashboard/*` if the `token` cookie is missing, and redirects to `/login`.

Notes for production deployments:
- Cookie settings are `sameSite: 'none'` and `secure: true` in production.
- If frontend + backend are deployed on different domains, you must also configure CORS (`FRONTEND_URL`) correctly.

## Scaling Notes

- Frontend and backend are decoupled (separate folders, separate deploys).
- Backend uses modular MVC structure:
  - `src/models`, `src/controllers`, `src/routes`, `src/middleware`
- Adding new entities:
  - Create a new model + controller + route file, then mount the route in `src/server.js`.
- Middleware is centralized and extensible (auth + validation + global error handler).

## Useful Links

- API docs: `docs/API.md`
- Postman collection: `postman/Judix.postman_collection.json`
