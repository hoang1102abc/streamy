import React from "react";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="ui menu" style={{ marginTop: "20px" }}>
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};
