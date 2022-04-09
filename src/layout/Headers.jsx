import React from 'react';
import { Link } from 'react-router-dom';

function Headers({ className }) {
  return (
    <div className={className}>
      <h1><Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>MBTI</Link></h1>
    </div>
  );
}

export default Headers;
