import React from 'react';
import { Link, graphql } from 'gatsby';
import Bio from '../components/shared/bio';
import Layout from '../components/shared/layout';
import Button from '../components/shared/button';
import CustomGallery from '../components/photos/custom-gallery';
import { Header } from '../components/header/header';
import { transformExif } from '../utils/transformExif';

function Photos(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  const natural = data.natural.edges.map(({ node }) => (transformExif(node)));
  const built = data.built.edges.map(({ node }) => (transformExif(node)));
  const people = data.people.edges.map(({ node }) => (transformExif(node)));

  const allPhotos = { natural, built, people };

  return (
    <Layout location={props.location} title={siteTitle}>
      <Bio />
      <CustomGallery photos={allPhotos} />
      <Link to="/">
        <Button marginTop="75px">Go Home</Button>
      </Link>
    </Layout>
  );
}

export default Photos;

export const query = graphql`
    {
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
            sort: { name: ASC }
        ) {
            edges {
                node {
                    name
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH)
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
            sort: { name: ASC }
        ) {
            edges {
                node {
                    name
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH)
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
            sort: { name: ASC }
        ) {
            edges {
                node {
                    name
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH)
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

export function Head({ location, data }) {
  return <Header pathName={location.pathName} title={`Photos | ${data.site.siteMetadata.title}`} />;
}
