import React from "react";
import { Link } from "react-router-dom";

function Headers({ className }) {
  return (
    <div className={className}>
      <h1>
        <Link to={"/"} style={{ color: "black", textDecoration: "none" }}>
          우리들은 같이 <span style={{ color: "orangered" }}>떡볶이</span>를
          먹을 수 있을까
        </Link>
      </h1>
    </div>
  );
}

export default Headers;
