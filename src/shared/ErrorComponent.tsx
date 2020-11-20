import {
  faArrowLeft,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { ErrorProps } from "../services/models/types/ErrorProps";
import "./ErrorComponent.scss";

export default function ErrorComponent({ error }: ErrorProps) {
  return (
    <>
      <div className="error">
        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
        <h3>{error}</h3>

        <Link to="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} />
          Go back to PokedexMD
        </Link>
      </div>
    </>
  );
}
