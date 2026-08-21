import React from "react";
import { getHourlyForecast, weatherIconUrl } from "../utils/weather";

export default function HourlyForecast({ forecast }) {
  const timezone = forecast.city.timezone || 0;
  const hours = getHourlyForecast(forecast.list, timezone);

  return (
    <section className="panel section-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">NEXT 24 HOURS</span>
          <h2>Hourly outlook</h2>
        </div>
        <span className="section-note">3-hour intervals</span>
      </div>

      <div className="hourly-list">
        {hours.map((hour, index) => (
          <div className={`hour-item ${index === 0 ? "active" : ""}`} key={`${hour.time}-${index}`}>
            <span>{index === 0 ? "Now" : hour.time}</span>
            <img src={weatherIconUrl(hour.icon)} alt="" />
            <strong>{Math.round(hour.temp)}°</strong>
            <small>{hour.description}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
