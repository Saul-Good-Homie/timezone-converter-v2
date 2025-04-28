# Timezone Converter

A simple, responsive web app that allows users to select cities from around the world and view their current local time and date, updated live.
Built using **React**, **Luxon** for time management, and **pure CSS** for styling.

## Features

- 🕒 Live time updates every minute
- 🏙️ Searchable city list with easy-to-read formatting
- 📱 Fully responsive: mobile-first design
- 🗑️ Add and remove cities dynamically
- 🎨 Light UI with simple palette switching (customizable)

## Tech Stack

- **React** (no frameworks like Next.js)
- **Luxon** (`luxon` npm package)
- **Basic CSS** (no Tailwind, no Bootstrap)

## Project Structure

/src
  ├── components/
  │    └── TimezoneCard.js
  ├── data/
  │    └── cityTimezoneMap.js
  ├── pages/
  │    └── Home.js
  ├── styles/
  │    └── main.css
  ├── App.js
  └── index.js

## Future Enhancements ✨

- Custom City Entry: Allow users to enter any city, not just the pre-defined list.
- Sort by Current Time: Dynamically sort cities based on where it's currently daytime or nighttime.
- Save Preferences: Persist selected cities across sessions with localStorage.
- Dark Mode: Add a toggle for light/dark themes.
