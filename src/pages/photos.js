import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Button from '../components/button';
import CustomGallery from '../components/custom-gallery';

class Photos extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;
        let natural = data.natural.edges.map(({ node }) => ({
            fluid: {
                ...node.childImageSharp.fluid,
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
        }));
        let built = data.built.edges.map(({ node }) => ({
            fluid: {
                ...node.childImageSharp.fluid,
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
        }));
        let people = data.people.edges.map(({ node }) => ({
            fluid: {
                ...node.childImageSharp.fluid,
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
        }));
        let allPhotos = { natural: natural, built: built, people: people };

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="All posts" />
                <Bio />
                <CustomGallery photos={allPhotos} />
                <Link to="/">
                    <Button marginTop="75px">Go Home</Button>
                </Link>
            </Layout>
        );
    }
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        natural: allFile(
            filter: {
                extension: { regex: "/(jpeg|jpg)/" }
                sourceInstanceName: { eq: "natural" }
            }
            sort: { fields: [name], order: ASC }
        ) {
            edges {
                node {
                    name
                    childImageSharp {
                        fluid(maxWidth: 2048) {
                            ...GatsbyImageSharpFluid
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
        built: allFile(
            filter: {
                extension: { regex: "/(jpeg|jpg)/" }
                sourceInstanceName: { eq: "built" }
            }
            sort: { fields: [name], order: ASC }
        ) {
            edges {
                node {
                    name
                    childImageSharp {
                        fluid(maxWidth: 2048) {
                            ...GatsbyImageSharpFluid
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
        people: allFile(
            filter: {
                extension: { regex: "/(jpeg|jpg)/" }
                sourceInstanceName: { eq: "people" }
            }
            sort: { fields: [name], order: ASC }
        ) {
            edges {
                node {
                    name
                    childImageSharp {
                        fluid(maxWidth: 2048) {
                            ...GatsbyImageSharpFluid
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
`;
// https://www.npmjs.com/package/exif //For exif details
// Sub this instead of ...GatsbyImageSharpSizes in igraphql
// fluid(maxWidth: 300) {
//   # base64
//   # aspectRatio
//   src
//   # srcSet
//   # sizes
// }

export default Photos;
