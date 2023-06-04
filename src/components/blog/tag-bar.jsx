import React from 'react';
import { navigate } from 'gatsby';

export function TagBar({ tags, fontSize = '14px' }) {
  return (
    <div>
      {tags.map((tag) => (
        <div
          key={tag}
          onClick={() => {
            if (tag === 'bookshelf') {
              navigate('/blog/bookshelf');
            } else {
              navigate(`/blog/tag/${tag}`);
            }
          }}
          style={{
            fontSize,
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
