import { useCallback, useState } from "react";
import {
  getForecast,
  getWeatherByCity,
  getWeatherByCoordinates
} from "../services/weatherApi";

const LAST_CITY_KEY = "climaview:last-city";

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWeather = useCallback(async (city) => {
    const cleanCity = city.trim();
    if (!cleanCity) return;

    setLoading(true);
    setError("");

    try {
      const current = await getWeatherByCity(cleanCity);
      const nextForecast = await getForecast(
        current.coord.lat,
        current.coord.lon
      );

      setWeather(current);
      setForecast(nextForecast);
      localStorage.setItem(LAST_CITY_KEY, current.name);
    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadByCoordinates = useCallback(async (lat, lon) => {
    setLoading(true);
    setError("");

    try {
      const current = await getWeatherByCoordinates(lat, lon);
      const nextForecast = await getForecast(lat, lon);

      setWeather(current);
      setForecast(nextForecast);
      localStorage.setItem(LAST_CITY_KEY, current.name);
    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError(err.message || "Unable to load your location.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    loadWeather,
    loadByCoordinates
  };
};

export const getLastCity = () => localStorage.getItem(LAST_CITY_KEY) || "Rajnandgaon";
