# ClimaView

ClimaView is a professional weather intelligence dashboard built with React and the OpenWeather API.

It is designed as a portfolio-grade frontend project demonstrating:

- React component architecture
- REST API integration
- Asynchronous data fetching
- Browser Geolocation API
- Loading, error and empty states
- Responsive interface design
- Environment variables
- Data transformation and presentation
- Local persistence with localStorage

## Features

- Search weather by city
- Use current browser location
- Current temperature and feels-like temperature
- High/low temperature
- Humidity
- Wind speed and direction
- Atmospheric pressure
- Visibility
- Sunrise and sunset
- 3-hour interval forecast
- 5-day forecast
- Responsive desktop and mobile layouts
- Persistent last searched city
- Graceful API error handling
- Loading skeleton UI

## Tech stack

- React
- Vite
- JavaScript
- CSS
- OpenWeather API
- REST API
- Geolocation API
- localStorage
- Lucide React

## Run locally

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/climaview.git
cd climaview
```

### 2. Install

```bash
npm install
```

### 3. Configure API key

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then add your OpenWeather API key:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Start

```bash
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deployment

For Vercel:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Framework preset: Vite.
4. Add the environment variable:
   `VITE_OPENWEATHER_API_KEY`
5. Deploy.

For Netlify, use:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_OPENWEATHER_API_KEY`

## API

Weather data is provided by OpenWeather.

https://openweathermap.org/api

## Portfolio description

> ClimaView is a responsive weather intelligence dashboard built with React and REST APIs. It provides real-time weather conditions, hourly outlooks and a five-day forecast with city search, geolocation, reusable components, loading states and API error handling.

## Resume bullet

> Built a responsive weather intelligence dashboard using React and REST APIs, implementing city search, geolocation, hourly forecasts, multi-day weather data and reusable component architecture.
