# Note Taking App

A full-stack notes app with an Express API, Supabase (PostgreSQL) backend, and a vanilla HTML/CSS/JS frontend.

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with `users` and `notes` tables

## Local Setup

1. **Navigate to the app directory** (this repo is a monorepo):

   ```bash
   cd Assignments/note_taking_app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in this directory:

   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-anon-or-publishable-key
   JWT_SECRET=your-long-random-secret
   ```

4. **Start the server:**

   ```bash
   node src/server.js
   ```

   The API runs at `http://localhost:3001`. The server also serves the frontend from `public/`.

5. **Open the app:** visit `http://localhost:3001` or open `public/index.html` and set `baseURL` in `public/app.js` to `http://localhost:3001`.

> **Note:** `npm start` uses `nodemon`, which is not listed in dependencies. Use `node src/server.js` for local development unless you install nodemon globally.

## Project Structure

```
note_taking_app/
├── public/          # Frontend (index.html, app.js, style.css)
├── src/
│   ├── server.js    # Express entry point
│   ├── db.js        # Supabase client
│   ├── middleware/
│   │   └── auth.js  # JWT verification
│   └── routes/
│       ├── auth.js  # Register / login
│       └── note.js  # CRUD + search
├── package.json
└── .env             # Not committed — create locally
```

## Authentication

Protected routes require a JWT in the header:

```
Authorization: Bearer <token>
```

Tokens are issued on login and expire after 5 days. Each user can only access their own notes (`user_id` is taken from the token).

## API Endpoints

Base URL (local): `http://localhost:3001`

All JSON request bodies must include `Content-Type: application/json`.

### Auth

#### Register

```
POST /auth/user/register
```

**Body:**
```json
{ "username": "alice", "password": "secret123" }
```

**Success (201):**
```json
{ "message": "User registered successfully" }
```

**Error (500):**
```json
{ "error": "..." }
```

#### Login

```
POST /auth/user/login
```

**Body:**
```json
{ "username": "alice", "password": "secret123" }
```

**Success (200):**
```json
{ "message": "User logged in successfully", "token": "<jwt>" }
```

**Error (401):**
```json
{ "error": "Invalid username or password" }
```
or
```json
{ "error": "Invalid password" }
```

### Notes (all require `Authorization: Bearer <token>`)

#### List notes

```
GET /note/get
```

**Success (200):**
```json
{ "notes": [{ "id": 1, "title": "...", "body": "...", "user_id": "..." }] }
```

#### Get note by ID

```
GET /note/:id
```

**Success (200):**
```json
{ "note": { "id": 1, "title": "...", "body": "...", "user_id": "..." } }
```

#### Create note

```
POST /note/create
```

**Body:**
```json
{ "title": "My note", "body": "Note content" }
```

**Success (201):**
```json
{ "message": "Note created successfully", "note": [{ "id": 1, "title": "...", "body": "...", "user_id": "..." }] }
```

> `note` is an **array** (Supabase `.select()` result). Use `note[0]` for the created row.

#### Update note

```
PATCH /note/:id
```

**Body** (either or both fields):
```json
{ "title": "Updated title", "body": "Updated body" }
```

**Success (200):**
```json
{ "message": "Note updated successfully", "note": [{ "...": "..." }] }
```

#### Delete note

```
DELETE /note/delete/:id
```

**Success (200):**
```json
{ "message": "Note deleted successfully" }
```

#### Search notes

```
GET /note/search?query_text=keyword
```

Case-insensitive match on `title` or `body`. URL-encode special characters (e.g. spaces, non-ASCII).

**Success (200):**
```json
{ "notes": [{ "...": "..." }] }
```

### Common errors

| Status | Meaning |
|--------|---------|
| 401 | Missing/invalid token, or bad login credentials |
| 500 | Server or Supabase error — `{ "error": "message" }` |

## Database Schema (Supabase)

**`users`**
- `id` — primary key
- `username` — unique
- `password_hash` — bcrypt hash

**`notes`**
- `id` — primary key
- `title`, `body` — text
- `user_id` — foreign key to `users.id`

## CORS

The API sets `Access-Control-Allow-Origin: *` so the frontend can be hosted separately (e.g. GitHub Pages) while calling a remote API.

## Deployment

| Component | Platform | Notes |
|-----------|----------|-------|
| Backend | [Render](https://render.com) Web Service | Root directory: `Assignments/note_taking_app`. Start: `node src/server.js`. Set env vars in the dashboard. |
| Frontend | GitHub Pages | Update `baseURL` in `public/app.js` to your Render URL (HTTPS, no trailing slash). |

## Contributing

- Keep API changes in sync with `public/app.js`.
- Do not commit `.env` or secrets.
- Avoid cross-importing files from other folders in this monorepo (e.g. `4-Backend-Dev/`).
- Use `node src/server.js` to verify the server starts before pushing.
