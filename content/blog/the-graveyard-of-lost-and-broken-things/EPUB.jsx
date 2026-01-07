import React, { useState } from 'react';
import { ReactReader } from 'react-reader';

export const EPUB = () => {
  const [location, setLocation] = useState(0);
  return (
    <div style={{ height: '600px' }}>
      <ReactReader
        url="/graveyard-of-lost-and-broken-things.epub"
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
      />

    </div>
  );
};
