import React from "react";
import { FiCommand } from "react-icons/fi";
import "../../style/LoadingSpinner.css";

const Loader = () => {
  return (
    <div className="loader">
      <FiCommand className="loading-icon" />
    </div>
  );
};

export default Loader;
