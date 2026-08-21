import React, { useState } from "react";
import { Search, LocateFixed } from "lucide-react";

function SearchBar({
  onSearch,
  onLocation,
  loading = false,
}) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedCity =
      typeof city === "string"
        ? city.trim()
        : "";

    if (!trimmedCity) {
      return;
    }

    if (typeof onSearch === "function") {
      onSearch(trimmedCity);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value || "");
  };

  const handleLocation = () => {
    if (typeof onLocation === "function") {
      onLocation();
    }
  };

  return (
    <div className="search-wrapper">

      <form
        className="search-bar"
        onSubmit={handleSubmit}
      >
        <Search size={20} />

        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Search for a city..."
          disabled={loading}
          aria-label="Search for a city"
        />

        <button
          type="submit"
          className="search-button"
          disabled={
            loading ||
            !city.trim()
          }
        >
          <Search size={16} />
          Search
        </button>
      </form>

      <button
        type="button"
        className="location-button"
        onClick={handleLocation}
        disabled={loading}
        aria-label="Use my location"
      >
        <LocateFixed size={18} />

        <span>
          Use my location
        </span>
      </button>

    </div>
  );
}

export default SearchBar;