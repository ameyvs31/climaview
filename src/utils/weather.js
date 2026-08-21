export const weatherIconUrl = (icon, size = "2x") =>
  `https://openweathermap.org/img/wn/${icon}@${size}.png`;

export const formatTemperature = (value) =>
  `${Math.round(Number(value))}°`;

export const formatTime = (timestamp, timezoneOffset = 0) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit"
  });
};

export const formatDate = (timestamp, timezoneOffset = 0, options = {}) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
    ...options
  });
};

export const capitalize = (value = "") =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const getWindDirection = (degrees = 0) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degrees / 45) % 8];
};

export const getVisibilityKm = (meters = 0) =>
  `${(meters / 1000).toFixed(1)} km`;

export const getForecastDays = (list, timezoneOffset = 0) => {
  const byDay = new Map();

  list.forEach((item) => {
    const date = formatDate(item.dt, timezoneOffset, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    if (!byDay.has(date)) byDay.set(date, []);
    byDay.get(date).push(item);
  });

  return [...byDay.entries()].slice(0, 5).map(([date, items]) => {
    const temps = items.map((item) => item.main.temp);
    const midday =
      items.find((item) => new Date(item.dt * 1000).getUTCHours() === 12) ||
      items[Math.floor(items.length / 2)];

    return {
      date,
      min: Math.min(...temps),
      max: Math.max(...temps),
      icon: midday.weather[0].icon,
      description: midday.weather[0].description
    };
  });
};

export const getHourlyForecast = (list, timezoneOffset = 0) =>
  list.slice(0, 8).map((item) => ({
    time: formatTime(item.dt, timezoneOffset),
    temp: item.main.temp,
    icon: item.weather[0].icon,
    description: item.weather[0].description
  }));
