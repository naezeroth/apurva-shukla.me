import React from 'react';
import SEO from './seo';

export function Header(props) {
  return (
    <>
      <SEO {...props} />
      <script defer src="https://umami.apurva-shukla.me/script.js" data-website-id="a8490dd9-2e57-45e0-b40f-3d0a1e0078a4" />
    </>
  );
}
