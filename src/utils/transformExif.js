export const transformExif = (node) => ({
  ...node,
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
  width: 4,
  height: 3,
});
