import React from 'react';
import { Link } from 'gatsby';

export function TagBar({ tags, fontSize = '14px', location }) {
  return (
    <div>
      {tags.map((tag) => (
        <Link
          key={tag}
          to={(tag === 'bookshelf') ? '/bookshelf/shelf' : `/tag/${tag}`}
          state={{ prevPath: location?.pathname }}
          style={{
            fontSize,
            color: 'var(--tagNormal)', // var(--tag-color),
            lineHeight: 1.3,
            borderRadius: '5px',
            padding: '0.25rem',
            display: 'inline-block',
            cursor: 'pointer',
            boxShadow: 'unset',
          }}
        >
          #
          {tag}
        </Link>
      ))}
    </div>
  );
}
