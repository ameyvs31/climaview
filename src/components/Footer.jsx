import React from "react";
import { Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <strong>ClimaView</strong>

          <p>
            A weather intelligence dashboard built
            with React and the OpenWeather API.
          </p>
        </div>

        <div className="footer-links">
          <a
            href="https://github.com/ameyvs31"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} />
            GitHub
          </a>

          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={15} />
            OpenWeather
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} ClimaView
        </span>

        <span>
          Built with React
        </span>
      </div>
    </footer>
  );
}