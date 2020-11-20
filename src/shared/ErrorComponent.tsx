import {
  faArrowLeft,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./ErrorComponent.scss";

export default function ErrorComponent() {
  return (
    <>
      <div className="error">
        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
        <h3>We are sorry! We found an error while loading Pokemon data.</h3>

        <Link to="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} />
          Go back to PokedexMD
        </Link>
      </div>
    </>
  );
}
