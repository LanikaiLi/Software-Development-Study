# Megaphone Server

Express + MongoDB API for the megaphone microblog project.

## Local setup

1. `npm install`
2. Create a `.env` file in this folder (see below).
3. `node server.js` (or add a `"start"` script in `package.json` and run `npm start`).

### `.env` file

Store secrets locally only — `.env` is listed in `.gitignore` and is **not** pushed to GitHub.

```env
# Full-line comments are OK (lines starting with #)
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/?appName=...
```

- The server reads **`MONGODB_URI`** (see `server.js`).
- Use **`#` on its own line** for notes; avoid inline `#` after a value unless the value is quoted.
- `.env` is like a private config file: good for secrets. `package.json` is shared project config, not for passwords.

### Initial project setup (reference)

If starting from scratch:

1. `npm init`
2. `npm install express`
3. `npm install dotenv`
4. `touch .env`
5. `npm install mongodb`
6. save your mongo db connection string in the .env file
7. create the server.js fileusing mongodb's full code sample for connection string
8. change the uri var to `const uri = process.env.MONGODB_URI` in the server.js file
9. add `'require('dotenv').config();'` on the beginning of the server.js file
10. create gitignore file with: `'node_modules/* .env'`
11. add `const express = require ("express")` , `const app = express()`, `app.use(express.json())` in server.js

> **Tip:** env file is kind of like config file, but different, config files are public shared within a team, package.json is more like a config file

## Deploy on Render (monorepo)

This app lives inside the **Software-Development-Study** repo. On Render, connect that repo and point Render at this subfolder.

### Service settings

| Field | Value |
|--------|--------|
| **Source** | GitHub repo `Software-Development-Study`, branch `main` |
| **Root Directory** | `4-Backend-Dev/megaphone-server` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Auto-Deploy** | On (deploys when commits touch this root directory) |

**Root Directory must be a repo path, not a URL.** Do not paste a GitHub link like `https://github.com/.../tree/main/4-Backend-Dev/megaphone-server`.

**Commands must be plain shell commands only.** Do not include the folder path or a `$` prompt in Build/Start — Render already runs inside Root Directory.

- **Pre-Deploy Command:** leave empty unless you have a real script.
- **Start Command:** `node server.js` (this `package.json` has no `"start"` script unless you add one).

### Environment variables on Render

Add in the Render dashboard (**Environment**), not in a committed `.env`:

| Key | Value |
|-----|--------|
| `MONGODB_URI` | Your MongoDB Atlas connection string (same as local) |

Render does not use your local `.env` file from the repo.

### MongoDB Atlas

Allow Render to reach your cluster: in Atlas → **Network Access**, add **`0.0.0.0/0`** (or Render’s egress IPs if you restrict access).

### Port (important for Render)

Render sets **`PORT`** (often `10000`). The server must listen on `process.env.PORT`, not a hardcoded port only.

If deploy fails or the service never becomes healthy, update `server.js` to use something like:

```js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
```

### After deploy

- Public URL: `https://<your-service-name>.onrender.com`
- The default `onrender.com` hostname is chosen when the service is **first created**; renaming the service in the dashboard does not always change that URL.
- Point the frontend `baseUrl` at your Render URL (not `localhost`) when testing production.
- If a push does not update the live app: check **Events** for failed deploys; fix Build/Start commands; use **Manual Deploy → Clear build cache & deploy**.

### Helper scripts (local)

From this folder:

- `node add-seed-data.js` — insert sample posts (uses `MONGODB_URI`, database `megaphone`)
- `node delete-all-posts.js` — delete all posts in `megaphone.posts`

Run `npm install` here before using these scripts.

## Troubleshooting Render deployment

### `MongoServerSelectionError` with SSL/TLS errors

**Problem:** Deploy fails when connecting to MongoDB with errors like:
```
tlsv1 alert internal error
MongoServerSelectionError: 007DA34ED67D0000:error:0A000438:...
```

**Root cause:** Render's outbound IPs are not allowed in MongoDB Atlas Network Access.

**Solution:**

1. Open [MongoDB Atlas](https://cloud.mongodb.com) → your project → **Network Access**.
2. **Add IP Access List Entry** Open [IP Access List in your project](https://cloud.mongodb.com/v2/69f143cce50085881245acc3#/security/network/accessList) and enter **`0.0.0.0/0`** (allow all IPs).
3. Click **Confirm** and wait **1–2 minutes** for the change to propagate.
4. On Render, **Manual Deploy → Clear build cache & deploy**.

> **Security note:** `0.0.0.0/0` allows connections from any IP. For production, restrict to Render's specific egress IPs (available in Render documentation or support).

### Connection string format issues

**Problem:** SSL/connection errors even with the right IP whitelist.

**Common mistakes:**
- Spaces in the URI (especially around `@` or `/`)
- Special characters in the password not URL-encoded
- Missing `@` before the cluster hostname
- Using a direct `mongodb://` instead of `mongodb+srv://` for Atlas

**Solution:**
1. Generate a fresh connection string from Atlas → **Connect** → **Drivers** → **Node.js**.
2. Copy the **entire** connection string as one line.
3. If your password has special characters (`@`, `#`, `%`, `/`, etc.), Atlas should auto-encode them, but if the string looks odd, consider setting a **temporary simple password** (letters + numbers only) for testing.
4. Paste into Render → **Environment** → `MONGODB_URI`, exactly as provided.

### `PORT` mismatch

**Problem:** App runs but health checks fail; Render says the service is not responding.

**Root cause:** App listens on hardcoded port (e.g., `3000`) but Render forwards traffic to a different port (e.g., `10000`).

**Solution:** Ensure `server.js` uses:
```js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
```

Render automatically sets `PORT` in the environment; your code just needs to read it.

### `injected env (0) from .env` — Is this a problem?

**No.** This message means dotenv found **zero variables** in a `.env` file on the server (normal — `.env` is gitignored). Render env vars (set in the dashboard) are injected separately and do not appear in this message. If `MONGODB_URI` is set in Render → **Environment** and shows up in a subsequent connection error, the env var is present; the issue is elsewhere (usually Atlas network access or URI format).

### Deploy succeeds but service won't start

Check Render → **Logs** for the full error output. Common causes:
- `MONGODB_URI` missing or invalid (check **Environment** on the service)
- MongoDB user credentials wrong (test locally with the same URI)
- Atlas cluster is paused (wake it up in Atlas dashboard)
- Node.js version incompatibility (try setting `NODE_VERSION=20.11.0` in **Environment** if using Node 24)
