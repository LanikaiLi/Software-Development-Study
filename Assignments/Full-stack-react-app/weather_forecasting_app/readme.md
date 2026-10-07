# Weather Forecasting App

A full-stack weather app built with **React** and **Express**. Search any city to see the current weather and a 5-day forecast, switch between °C and °F, and create an account to save your favorite cities.

**Live demo:** https://weather-forecasting-app-v9ui.onrender.com/

**Demo account:** `demo@test.com` / `demo1234`

---

## Features

| Feature | Description |
|---|---|
| City search | Enter a city name to get the current weather |
| Current weather | Temperature, description, humidity and wind speed |
| 5-day forecast | One forecast card per day (taken at 12:00 each day) |
| °C / °F toggle | Converts every temperature on the page at once |
| Sign up / Log in | Accounts with hashed passwords and JWT tokens |
| Favorite cities | Save, open and delete favorite cities (saved in MongoDB, per user) |
| Error handling | Clear messages for empty input, unknown cities, wrong passwords and failed requests |

Users who are not logged in can still search the weather. The favorites section and the ☆ Save button stay visible and show a "Log in or sign up to use this feature" message, so every feature is easy to discover.

---

## Tech Stack

| Part | Tools |
|---|---|
| Frontend | React 19, Vite, React Router |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas (official `mongodb` driver) |
| Authentication | `bcrypt` (password hashing), `jsonwebtoken` (JWT) |
| Weather data | [OpenWeatherMap API](https://openweathermap.org/api) (Current Weather + 5 Day / 3 Hour Forecast) |
| Config | `dotenv` |

**Why Vite instead of create-react-app:** create-react-app is no longer maintained by the React team. Vite is the tool the React documentation now recommends, and it starts and reloads much faster.

---

## Getting Started

### 1. Prerequisites

- Node.js 20.19 or newer
- A free [OpenWeatherMap API key](https://home.openweathermap.org/api_keys) (new keys can take 1–2 hours to activate)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster and its connection string

### 2. Clone and install

```bash
git clone <repository-url>
cd weather_forecasting_app

cd server
npm install

cd ../client
npm install
```

### 3. Add environment variables

Create a file named `server/.env`:

```
OPENWEATHER_API_KEY=your_openweathermap_api_key
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_long_random_string
```

You can generate a random `JWT_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The `.env` file is listed in `.gitignore`, so secrets are never committed.

### 4. Run the app

The app needs **two terminals**, one for the backend and one for the frontend.

```bash
# Terminal 1: backend (http://localhost:3000)
cd server
npm run dev
```

```bash
# Terminal 2: frontend (http://localhost:5173)
cd client
npm run dev
```

Open **http://localhost:5173** in your browser.

During development, Vite forwards every request that starts with `/api` to the backend on port 3000 (see `client/vite.config.js`), so the frontend and backend work together without extra setup.

---

## Project Structure

```
weather_forecasting_app/
├── server/                     # Backend (Express)
│   ├── index.js                # Starts the server after the database connects
│   ├── db.js                   # MongoDB connection (connectDB, getDB)
│   ├── middleware/
│   │   └── requireAuth.js      # Checks the JWT and adds req.userId
│   └── routes/
│       ├── weather.js          # Weather + forecast (proxy to OpenWeatherMap)
│       ├── auth.js             # Register, log in, current user
│       └── favorites.js        # Favorite cities (protected)
│
└── client/                     # Frontend (React + Vite)
    └── src/
        ├── main.jsx            # Wraps the app in BrowserRouter and the context providers
        ├── App.jsx             # Routes: "/" and "/login"
        ├── context/
        │   ├── AuthContext.jsx # Token, current user email, login, logout
        │   └── UnitContext.jsx # °C / °F setting and temperature formatting
        ├── pages/
        │   ├── HomePage.jsx    # Search, weather, forecast, favorites
        │   └── AuthPage.jsx    # Log in / Sign up form
        └── components/
            ├── Header.jsx
            ├── SearchBar.jsx
            ├── CurrentWeather.jsx
            ├── Forecast.jsx
            └── FavoritesList.jsx
```

**Rule used throughout:** one file has one job. `pages/` holds one component per URL, and `components/` holds the smaller parts used inside the pages.

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/weather?city=Paris` | — | Current weather for a city |
| GET | `/api/forecast?city=Paris` | — | 5-day / 3-hour forecast for a city |
| POST | `/api/auth/register` | — | Create an account (`{ email, password }`) |
| POST | `/api/auth/login` | — | Log in and receive a JWT (`{ email, password }`) |
| GET | `/api/auth/me` | ✅ | Email of the logged-in user |
| GET | `/api/favorites` | ✅ | The user's favorite cities |
| POST | `/api/favorites` | ✅ | Add a favorite city (`{ city }`) |
| DELETE | `/api/favorites/:id` | ✅ | Delete a favorite city |

✅ = send the token in the header: `Authorization: Bearer <token>`

---

## How the Code Works

### Why the app has a backend

The OpenWeatherMap API key must stay secret. If the frontend called OpenWeatherMap directly, anyone could see the key in the browser. Instead, the frontend calls our own backend, and the backend adds the key and calls OpenWeatherMap:

```
Browser  →  /api/weather?city=Paris  →  Express server  →  OpenWeatherMap (with the API key)
```

The backend also stores users and favorite cities in MongoDB.

### State management (React hooks)

| Hook | Where | Why |
|---|---|---|
| `useState` | `SearchBar`, `AuthPage`, `CurrentWeather` | Simple values: input text, log in / sign up mode, error messages |
| `useReducer` | `HomePage` | The weather request has several values that always change together (`status`, `currentWeather`, `forecast`, `error`). A reducer keeps every change in one place: `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR` |
| `useContext` | `AuthContext`, `UnitContext` | Many components need the login state and the °C / °F setting, so they are shared without passing props through every level |
| `useEffect` | `AuthContext`, `HomePage` | When the token changes, load the user's email and favorites automatically |

The `favorites` state lives in `HomePage` because two sibling components use it: `FavoritesList` shows it, and `CurrentWeather` uses it to show ☆ Save or ★ Saved.

### Error handling

| Situation | What the user sees |
|---|---|
| Empty search | "Please enter a city name." |
| Unknown city | `City "abcxyz" not found. Please check the spelling.` |
| OpenWeatherMap unavailable | "Weather service is not available. Please try again later." |
| Wrong email or password | "Invalid email or password" |
| Email already registered | "Email already registered" |
| Expired or invalid token | The user is logged out automatically |

The backend always returns the correct HTTP status code (400, 401, 404, 409, 500, 502) with an `{ error }` message. The frontend checks `res.ok`, and the reducer moves to the `error` state so the message is shown on the page.

### Security

- Passwords are hashed with `bcrypt`. The database never stores the real password.
- Login errors use the same message for a wrong email and a wrong password, so the app does not reveal which emails are registered.
- Every favorites route checks the JWT, and every database query includes the user's id, so users can only see and delete their own favorites.
- All secrets (API key, database URI, JWT secret) are stored in `.env` and are not committed.

---

## Future Improvements

- Store the token in an `httpOnly` cookie instead of `localStorage` for stronger protection against XSS.
- Search by the user's current location (browser geolocation).
- Show an hourly forecast chart.
- Add automated tests for the API routes.

---

## Notes for the Evaluator

- Use the demo account above to test the favorites feature without signing up.
- The assignment did not require a backend or database. They were added to practice full-stack development: user accounts, protected routes and saved data.
- The app uses Vite instead of create-react-app (see [Tech Stack](#tech-stack)).