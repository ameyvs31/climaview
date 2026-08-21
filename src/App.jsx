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

  const [lastSearch, setLastSearch] = useState(() => {
    const city = getLastCity();

    return typeof city === "string" && city.trim()
      ? city.trim()
      : "Rajnandgaon";
  });

  // Load initial city only once
  useEffect(() => {
    const city = getLastCity();

    if (typeof city === "string" && city.trim()) {
      loadWeather(city.trim());
    } else {
      loadWeather("Rajnandgaon");
    }
  }, []);

  // Search city
  const handleSearch = (value) => {
    // Support both a string and an input event
    const city =
      typeof value === "string"
        ? value
        : value?.target?.value;

    if (typeof city !== "string") {
      return;
    }

    const cleanCity = city.trim();

    if (!cleanCity) {
      return;
    }

    setLastSearch(cleanCity);
    loadWeather(cleanCity);
  };

  // Use current location
  const handleLocate = () => {
    if (!navigator.geolocation) {
      loadWeather(lastSearch || "Rajnandgaon");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        loadByCoordinates(
          coords.latitude,
          coords.longitude
        );
      },
      () => {
        loadWeather(lastSearch || "Rajnandgaon");
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    );
  };

  // Retry
  const handleRetry = () => {
    const city =
      typeof lastSearch === "string" && lastSearch.trim()
        ? lastSearch.trim()
        : "Rajnandgaon";

    loadWeather(city);
  };

  return (
    <div className="app-shell">
      {/* ================= HEADER ================= */}

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
            href="https://github.com/ameyvs31/climaview"
            target="_blank"
            rel="noreferrer"
            aria-label="ClimaView GitHub repository"
          >
            <Github size={18} />
          </a>
        </nav>
      </header>

      {/* ================= MAIN ================= */}

      <main
        id="dashboard"
        className="container"
      >
        {/* ================= INTRO ================= */}

        <section className="intro">
          <div>
            <span className="eyebrow">
              WEATHER INTELLIGENCE
            </span>

            <h1>
              Weather intelligence, at a glance.
            </h1>

            <p>
              Real-time conditions, hourly trends, and
              multi-day forecasts in a focused weather
              dashboard.
            </p>
          </div>

          <div className="data-source">
            <span className="status-dot" />
            Live data
          </div>
        </section>

        {/* ================= SEARCH ================= */}

        <SearchBar
          onSearch={handleSearch}
          onLocate={handleLocate}
          loading={loading}
        />

        {/* ================= LOADING ================= */}

        {loading && !weather && (
          <Skeleton />
        )}

        {/* ================= ERROR ================= */}

        {error && !loading && (
          <ErrorState
            message={error}
            onRetry={handleRetry}
          />
        )}

        {/* ================= WEATHER ================= */}

        {weather && forecast && !loading && (
          <>
            <CurrentWeather
              weather={weather}
            />

            {/* ================= FORECAST ================= */}

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

            {/* ================= LOCATION ================= */}

            <section className="location-strip panel">
              <div className="location-icon">
                <MapPin size={18} />
              </div>

              <div>
                <strong>
                  {weather.name}
                  {weather.sys?.country
                    ? `, ${weather.sys.country}`
                    : ""}
                </strong>

                <span>
                  Coordinates{" "}
                  {typeof weather.coord?.lat === "number"
                    ? weather.coord.lat.toFixed(2)
                    : "--"}
                  ,{" "}
                  {typeof weather.coord?.lon === "number"
                    ? weather.coord.lon.toFixed(2)
                    : "--"}
                </span>
              </div>

              <span className="updated">
                Updated just now
              </span>
            </section>
          </>
        )}

        {/* ================= FOOTER ================= */}

        <Footer />
      </main>
    </div>
  );
}