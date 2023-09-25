// components/Search.tsx

import { Link, navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';

export function Search({ initialQuery, numResults }) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await navigate(`/blog/?q=${encodeURI(query)}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: '5px' }}>
      <form onSubmit={onSubmit} style={{ marginBottom: 'auto' }}>
        <input
          type="text"
          placeholder="Search blogs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!!initialQuery && (
          <Link to="/blog" style={{ boxShadow: 'none', paddingLeft: '5px' }}>
            &#10005;
          </Link>
        )}
        {initialQuery && (
          <div style={{ boxShadow: 'none', paddingTop: '5px' }}>
            Found
            {' '}
            {numResults}
            {' '}
            matching article
            {numResults === 1 ? '' : 's'}
            .
          </div>
        )}
      </form>
    </div>
  );
}
