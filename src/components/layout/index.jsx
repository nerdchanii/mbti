import React from "react";
import Headers from "./Headers";
import Footer from "./Footer";
import "./index.scss";

function Layout(props) {
  const { children, className } = props;
  return (
    <div className={className}>
      <Headers className="Header" />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
