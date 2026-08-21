import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <section className="error-state panel" role="alert">
      <div className="error-icon">
        <AlertCircle size={22} />
      </div>

      <div className="error-content">
        <h2>Unable to load weather</h2>

        <p>
          {message ||
            "Something went wrong while fetching the latest weather data."}
        </p>

        <button
          type="button"
          className="retry-button"
          onClick={onRetry}
        >
          <RotateCcw size={16} />
          Try again
        </button>
      </div>
    </section>
  );
}