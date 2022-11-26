import React from 'react';
import { navigate } from 'gatsby';

export function TagBar({ tags }) {
  return (
    <div>
      {tags.map((tag) => (
        <div
          key={tag}
          onClick={() => {
            navigate(`/blog/tag/${tag}`);
          }}
          style={{
            fontSize: '14px',
            color: 'var(--tagNormal)', // var(--tag-color),
            lineHeight: 1.3,
            borderRadius: '5px',
            padding: '0.25rem',
            display: 'inline-block',
            cursor: 'pointer',
          }}
        >
          #
          {tag}
        </div>
      ))}
    </div>
  );
}
