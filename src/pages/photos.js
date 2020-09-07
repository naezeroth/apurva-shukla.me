import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm } from "../utils/typography"
import Button from "../components/button"
import CustomGallery from "../components/custom-gallery"

class Photos extends React.Component {
  render() {
    // console.log(data);
    const { data } = this.props
    console.log(data);
    const siteTitle = data.site.siteMetadata.title
    console.log(data.natural.edges);
    var natural= data.natural.edges.map(({ node }) => ({
      image: {
        src: node.childImageSharp.sizes.src,
        srcSet: node.childImageSharp.sizes.srcSet,
        sizes: node.childImageSharp.sizes.sizes,
        height: 3,
        width: 4,
      },
      data: {
        MakeAndModel: node.childImageSharp.fields.exif.raw.image.Make + " " + node.childImageSharp.fields.exif.raw.image.Model,
        ApertureValue: node.childImageSharp.fields.exif.raw.exif.ApertureValue,
        FNumber: node.childImageSharp.fields.exif.raw.exif.FNumber,
        ShutterSpeedValue: node.childImageSharp.fields.exif.raw.exif.ShutterSpeedValue,
        ISO: node.childImageSharp.fields.exif.raw.exif.ISO,
        DateTimeOriginal: node.childImageSharp.fields.exif.raw.exif.DateTimeOriginal,
      }
    }))
    var built= data.built.edges.map(({ node }) => ({
      image: {
        src: node.childImageSharp.sizes.src,
        srcSet: node.childImageSharp.sizes.srcSet,
        sizes: node.childImageSharp.sizes.sizes,
        height: 3,
        width: 4,
      },
      data: {
        MakeAndModel: node.childImageSharp.fields.exif.raw.image.Make + " " + node.childImageSharp.fields.exif.raw.image.Model,
        ApertureValue: node.childImageSharp.fields.exif.raw.exif.ApertureValue,
        FNumber: node.childImageSharp.fields.exif.raw.exif.FNumber,
        ShutterSpeedValue: node.childImageSharp.fields.exif.raw.exif.ShutterSpeedValue,
        ISO: node.childImageSharp.fields.exif.raw.exif.ISO,
        DateTimeOriginal: node.childImageSharp.fields.exif.raw.exif.DateTimeOriginal,
      }
    }))
    var people= data.people.edges.map(({ node }) => ({
      image: {
        src: node.childImageSharp.sizes.src,
        srcSet: node.childImageSharp.sizes.srcSet,
        sizes: node.childImageSharp.sizes.sizes,
        height: 3,
        width: 4,
      },
      data: {
        MakeAndModel: node.childImageSharp.fields.exif.raw.image.Make + " " + node.childImageSharp.fields.exif.raw.image.Model,
        ApertureValue: node.childImageSharp.fields.exif.raw.exif.ApertureValue,
        FNumber: node.childImageSharp.fields.exif.raw.exif.FNumber,
        ShutterSpeedValue: node.childImageSharp.fields.exif.raw.exif.ShutterSpeedValue,
        ISO: node.childImageSharp.fields.exif.raw.exif.ISO,
        DateTimeOriginal: node.childImageSharp.fields.exif.raw.exif.DateTimeOriginal,
      }
    }))
    var allPhotos = {natural, built, people}
    console.log("all photos is", allPhotos);
  
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <CustomGallery photos={allPhotos}/>
        <Link to="/">
          <Button marginTop="85px">Go Home</Button>
        </Link>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    natural:allFile(filter:{extension:{regex:"/(jpeg|jpg)/"},  sourceInstanceName:{eq:"natural"}}) {
      edges {
        node {
          childImageSharp {
            # originalName
            sizes(maxWidth: 1000) {
               ...GatsbyImageSharpSizes
            }
            fields {
            exif {
              raw {
                image {
                  Make
                  Model
                }
                exif {
                  DateTimeOriginal
                  ISO
                  FNumber
                  ShutterSpeedValue
                  ApertureValue
                }
              }
            }
          }
          }
        }
      }
    }
    built:allFile(filter:{extension:{regex:"/(jpeg|jpg)/"},  sourceInstanceName:{eq:"built"}}) {
      edges {
        node {
          childImageSharp {
            # originalName
            sizes(maxWidth: 1000) {
               ...GatsbyImageSharpSizes
            }
            fields {
            exif {
              raw {
                image {
                  Make
                  Model
                }
                exif {
                  DateTimeOriginal
                  ISO
                  FNumber
                  ShutterSpeedValue
                  ApertureValue
                }
              }
            }
          }
          }
        }
      }
    }
    people:allFile(filter:{extension:{regex:"/(jpeg|jpg)/"},  sourceInstanceName:{eq:"people"}}) {
      edges {
        node {
          childImageSharp {
            # originalName
            sizes(maxWidth: 1000) {
               ...GatsbyImageSharpSizes
            }
            fields {
            exif {
              raw {
                image {
                  Make
                  Model
                }
                exif {
                  DateTimeOriginal
                  ISO
                  FNumber
                  ShutterSpeedValue
                  ApertureValue
                }
              }
            }
          }
          }
        }
      }
    }
  }
`
//https://www.npmjs.com/package/exif //For exif details
// Sub this instead of ...GatsbyImageSharpSizes in igraphql
// fluid(maxWidth: 300) {
//   # base64
//   # aspectRatio
//   src
//   # srcSet
//   # sizes
// }

export default Photos