import React from "react";
import { getForecastDays, weatherIconUrl } from "../utils/weather";

export default function DailyForecast({ forecast }) {
  const timezone = forecast.city.timezone || 0;
  const days = getForecastDays(forecast.list, timezone);

  return (
    <section className="panel section-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">5-DAY FORECAST</span>
          <h2>Daily outlook</h2>
        </div>
        <span className="section-note">Updated with live API data</span>
      </div>

      <div className="daily-list">
        {days.map((day, index) => (
          <div className="daily-row" key={day.date}>
            <div className="daily-date">
              <strong>{index === 0 ? "Today" : day.date.split(",")[0]}</strong>
              <span>{index === 0 ? day.date : day.date.split(",").slice(1).join(",")}</span>
            </div>
            <img src={weatherIconUrl(day.icon)} alt={day.description} />
            <span className="daily-description">{day.description}</span>
            <div className="daily-range">
              <strong>{Math.round(day.max)}°</strong>
              <span>{Math.round(day.min)}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
