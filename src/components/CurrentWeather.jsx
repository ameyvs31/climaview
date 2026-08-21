import React from "react";
import {
  Droplets,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Wind
} from "lucide-react";
import StatCard from "./StatCard";
import {
  capitalize,
  formatTemperature,
  formatTime,
  getVisibilityKm,
  getWindDirection,
  weatherIconUrl
} from "../utils/weather";

export default function CurrentWeather({ weather }) {
  const condition = weather.weather[0];
  const timezone = weather.timezone || 0;

  return (
    <>
      <section className="hero-weather panel">
        <div className="hero-copy">
          <div className="eyebrow">CURRENT CONDITIONS</div>
          <h1>{weather.name}</h1>
          <p className="location-line">
            {weather.sys.country} · {capitalize(condition.description)}
          </p>

          <div className="temperature-row">
            <span className="temperature">
              {formatTemperature(weather.main.temp)}
            </span>
            <div className="temperature-meta">
              <span>Feels like {formatTemperature(weather.main.feels_like)}</span>
              <span>H: {formatTemperature(weather.main.temp_max)} · L: {formatTemperature(weather.main.temp_min)}</span>
            </div>
          </div>
        </div>

        <div className="weather-visual">
          <div className="weather-orbit" />
          <img
            src={weatherIconUrl(condition.icon, "4x")}
            alt={condition.description}
          />
          <span>{capitalize(condition.main)}</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard
          icon={Droplets}
          label="Humidity"
          value={`${weather.main.humidity}%`}
          detail="Relative humidity"
        />
        <StatCard
          icon={Wind}
          label="Wind"
          value={`${Math.round(weather.wind.speed)} m/s`}
          detail={`${getWindDirection(weather.wind.deg)} direction`}
        />
        <StatCard
          icon={Gauge}
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
          detail="Sea-level pressure"
        />
        <StatCard
          icon={Eye}
          label="Visibility"
          value={getVisibilityKm(weather.visibility)}
          detail="Horizontal visibility"
        />
        <StatCard
          icon={Sunrise}
          label="Sunrise"
          value={formatTime(weather.sys.sunrise, timezone)}
          detail="Local time"
        />
        <StatCard
          icon={Sunset}
          label="Sunset"
          value={formatTime(weather.sys.sunset, timezone)}
          detail="Local time"
        />
      </section>
    </>
  );
}
