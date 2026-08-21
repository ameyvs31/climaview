import React from "react";

export default function Skeleton() {
  return (
    <div className="skeleton-dashboard" aria-hidden="true">
      <section className="skeleton-card skeleton-current">
        <div className="skeleton-line skeleton-small" />
        <div className="skeleton-line skeleton-large" />
        <div className="skeleton-line skeleton-medium" />

        <div className="skeleton-stats">
          <div className="skeleton-stat" />
          <div className="skeleton-stat" />
          <div className="skeleton-stat" />
          <div className="skeleton-stat" />
        </div>
      </section>

      <section className="skeleton-card">
        <div className="skeleton-line skeleton-medium" />

        <div className="skeleton-hourly">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </section>

      <section className="skeleton-card">
        <div className="skeleton-line skeleton-medium" />

        <div className="skeleton-daily">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </section>
    </div>
  );
}