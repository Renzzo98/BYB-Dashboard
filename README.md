# BYB Dashboard

A minimal, retro-styled personal launchpage dashboard to organize your frequently used links and resources. Perfect as a browser homepage.

## Features

- 🌤️ **Live weather display** — Real-time temperature and animated weather icons
- 🔗 **Quick links** — Organized shortcuts to your favorite sites
- 🌓 **Dark mode** — Toggle between light and dark themes with persistent preferences
- 💾 **Local storage** — Saves your theme preference in browser
- 📱 **Responsive design** — Works great on mobile and desktop
- 🎛️ **Retro UI** — Physical button-style design inspired by vintage Walkman devices

## Tech Stack

### Backend
- **Express.js** — Web server framework
- **Pug** — Template engine for server-side rendering

### Frontend
- **Skycons** — Animated weather icon library
- **FontAwesome** — Icon library for social links

### APIs
- **OpenWeatherMap API** — Live weather data
- **Quotable API** — Random quotes (type.fit)

### Development
- **Nodemon** — Auto-restart server on file changes
- **Browser-sync** — Live reload for CSS and template changes

## Getting Started

### Installation
```bash
npm install
```

### Running Locally
```bash
# Start the dev server
npm run dev

# In another terminal, start browser-sync for live reloading
npm run ui
```

The app will be available at `http://localhost:8000`

## Customization

- **Quick links** — Edit `views/index.pug` to add/remove social links
- **Useful links section** — Add more tiles with your favorite resources
- **Theme colors** — Modify CSS variables in `assets/style.css`
- **Weather location** — Update the backend weather API endpoint

## File Structure

```
├── index.js                 # Express server
├── assets/
│   ├── js/
│   │   ├── apiCalls.js     # Weather and quote fetching
│   │   └── darkMode.js     # Dark mode toggle logic
│   └── style.css           # Main styles (light/dark mode)
├── views/
│   ├── layout.pug          # Base template
│   └── index.pug           # Main page
└── package.json
```
