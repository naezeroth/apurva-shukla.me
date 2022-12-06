import React from 'react';
import { Link } from 'gatsby';

export function PageNumber({ text, link }) {
  return (
    <div
      style={{
        marginInline: '10px',
        fontSize: '32px',
      }}
    >
      <Link to={link}>{text}</Link>
    </div>
  );
}
