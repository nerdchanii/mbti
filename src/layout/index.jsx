import React from 'react';
import Headers from './Headers';
import './index.scss';
import Footer from './footer';

function Layout(props) {
  const { children, className } = props;
  return (
    <div className={className}>
      <Headers className="Header"/>
      {children}
      <Footer/>
    </div>
  );
}

export default Layout;
