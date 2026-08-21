import React from "react";
import { Search, MapPin, Crosshair } from "lucide-react";

function SearchBar({ city, setCity, onSearch, onLocation, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch();
  };

  return (
    <form className="search-wrapper" onSubmit={handleSubmit}>
      <div className="search-bar">
        <Search className="search-icon" size={20} />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          aria-label="Search for a city"
        />

        <button
          type="submit"
          className="search-button"
          disabled={loading}
        >
          <Search size={16} />
          <span>{loading ? "Searching..." : "Search"}</span>
        </button>
      </div>

      <button
        type="button"
        className="location-button"
        onClick={onLocation}
        disabled={loading}
      >
        <Crosshair size={18} />
        <span>Use my location</span>
      </button>
    </form>
  );
}

export default SearchBar;