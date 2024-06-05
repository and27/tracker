import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="text-center flex flex-col">
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry for the inconvenience. Please try again later.</p>
      <Link
        to="/"
        className="p-5 bg-slate-500 hover:bg-slate-700 text-slate-100"
      >
        Go back to the homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
