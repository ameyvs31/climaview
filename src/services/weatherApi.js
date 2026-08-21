const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getApiKey = () => {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error(
      "OpenWeather API key is missing. Add VITE_OPENWEATHER_API_KEY to your .env file."
    );
  }
  return key;
};

const request = async (path, params = {}) => {
  const query = new URLSearchParams({
    ...params,
    appid: getApiKey()
  });

  const response = await fetch(`${BASE_URL}${path}?${query.toString()}`);

  if (!response.ok) {
    let message = "Unable to fetch weather data.";
    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // Keep the default message.
    }
    throw new Error(message);
  }

  return response.json();
};

export const getWeatherByCity = (city) =>
  request("/weather", {
    q: city,
    units: "metric"
  });

export const getForecast = (lat, lon) =>
  request("/forecast", {
    lat,
    lon,
    units: "metric"
  });

export const getWeatherByCoordinates = (lat, lon) =>
  request("/weather", {
    lat,
    lon,
    units: "metric"
  });
