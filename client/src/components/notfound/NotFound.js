import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center my-3">
      <h1 className="display-2 mb-0">Error 404</h1>
      <h3 className="font-weight-light mt-0">
        The page you're looking for does not exist
      </h3>
      <Link to="/" className="btn btn-success mt-3">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
