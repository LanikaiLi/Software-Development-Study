# Weather Forecasting App

A full-stack weather app built with **React** and **Express**. Search any city to see the current weather and a 5-day forecast, switch between °C and °F, and create an account to save your favorite cities.

**Live demo:** _[add the deployed URL here]_

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
