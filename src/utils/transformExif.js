export const transformExif = (node) => ({
  fluid: {
    ...node.childImageSharp.gatsbyImageData,
    height: 3,
    width: 4,
  },
  data: {
    MakeAndModel: `${node.childImageSharp.fields.exif.raw.image.Make} ${node.childImageSharp.fields.exif.raw.image.Model}`,
    ApertureValue:
        node.childImageSharp.fields.exif.raw.exif.ApertureValue,
    FNumber: node.childImageSharp.fields.exif.raw.exif.FNumber,
    ShutterSpeedValue:
        node.childImageSharp.fields.exif.raw.exif.ShutterSpeedValue,
    ISO: node.childImageSharp.fields.exif.raw.exif.ISO,
    DateTimeOriginal:
        node.childImageSharp.fields.exif.raw.exif.DateTimeOriginal,
  },
});
