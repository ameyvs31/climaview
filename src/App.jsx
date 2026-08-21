import React, { useEffect, useState } from "react";
import { CloudSun, Github, MapPin } from "lucide-react";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import Skeleton from "./components/Skeleton";
import ErrorState from "./components/ErrorState";
import Footer from "./components/Footer";

import { getLastCity, useWeather } from "./hooks/useWeather";

export default function App() {
  const {
    weather,
    forecast,
    loading,
    error,
    loadWeather,
    loadByCoordinates,
  } = useWeather();

  const [lastSearch, setLastSearch] = useState(getLastCity());

  useEffect(() => {
    loadWeather(lastSearch);
  }, [loadWeather, lastSearch]);

  const handleSearch = (city) => {
    const cleanCity = city.trim();

    if (!cleanCity) {
      return;
    }

    setLastSearch(cleanCity);
    loadWeather(cleanCity);
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      loadWeather(lastSearch);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        loadByCoordinates(coords.latitude, coords.longitude);
      },
      () => {
        loadWeather(lastSearch);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
      }
    );
  };

  const handleRetry = () => {
    loadWeather(lastSearch);
  };

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="site-header">
        <a
          className="brand"
          href="/"
          aria-label="ClimaView home"
        >
          <span className="brand-mark">
            <CloudSun
              size={21}
              strokeWidth={1.8}
            />
          </span>

          <span>
            <strong>ClimaView</strong>
            <small>WEATHER INTELLIGENCE</small>
          </span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#dashboard">
            Dashboard
          </a>

          <a href="#forecast">
            Forecast
          </a>

          <a
            href="https://github.com/ameyvs31"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <Github size={18} />
          </a>
        </nav>
      </header>

      {/* Main content */}
      <main
        id="dashboard"
        className="container"
      >
        {/* Introduction */}
        <section className="intro">
          <div>
          <span className="eyebrow">WEATHER INTELLIGENCE</span>

<h1>Weather intelligence, at a glance.</h1>

<p>
  Real-time conditions, hourly trends, and multi-day forecasts
  in a focused weather dashboard.
</p>
          </div>

          <div className="data-source">
            <span className="status-dot" />
            Live data
          </div>
        </section>

        {/* Search */}
        <SearchBar
          onSearch={handleSearch}
          onLocate={handleLocate}
          loading={loading}
        />

        {/* Loading state */}
        {loading && !weather && (
          <Skeleton />
        )}

        {/* Error state */}
        {error && !loading && (
          <ErrorState
            message={error}
            onRetry={handleRetry}
          />
        )}

        {/* Weather dashboard */}
        {weather &&
          forecast &&
          !loading && (
            <>
              {/* Current weather */}
              <CurrentWeather
                weather={weather}
              />

              {/* Forecast sections */}
              <div
                id="forecast"
                className="forecast-layout"
              >
                <HourlyForecast
                  forecast={forecast}
                />

                <DailyForecast
                  forecast={forecast}
                />
              </div>

              {/* Location information */}
              <section className="location-strip panel">
                <div className="location-icon">
                  <MapPin size={18} />
                </div>

                <div>
                  <strong>
                    {weather.name},{" "}
                    {weather.sys.country}
                  </strong>

                  <span>
                    Coordinates{" "}
                    {weather.coord.lat.toFixed(2)},{" "}
                    {weather.coord.lon.toFixed(2)}
                  </span>
                </div>

                <span className="updated">
                  Updated just now
                </span>
              </section>
            </>
          )}

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}