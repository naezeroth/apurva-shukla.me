import React from 'react';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

function SEO({
  title, description, pathName, children, image, keywords,
}) {
  const {
    title: defaultTitle,
    description: defaultDescription,
    author,
    image: defaultImage,
    siteUrl,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathName || ''}`,
    author,
    keywords,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="og:type" content="website" />
      <meta name="image" content={seo.image} />
      <meta name="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      {children}
    </>
  );
}

export default SEO;
