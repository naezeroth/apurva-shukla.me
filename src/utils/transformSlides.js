import { getImage } from 'gatsby-plugin-image';

export const transformSlides = (toTransform) => toTransform.map((img, idx) => {
  const {
    title, description,
  } = img;
  const image = getImage(img);
  return {
    src: image.images.fallback.src,
    key: idx,
    width: image.height,
    height: image.height,
    title,
    description,
  };
});
