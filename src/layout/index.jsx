import React from "react";
import Headers from "./Headers";
import "./index.scss";

function Layout(props) {
  const { children, className } = props;
  return (
    <div className={className}>
      <Headers className="Header" />
      {children}
    </div>
  );
}

export default Layout;
