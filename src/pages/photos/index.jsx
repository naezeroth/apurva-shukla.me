/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, graphql, navigate } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Gallery from 'react-photo-gallery';
import styled from 'styled-components';
import Bio from '../../components/shared/bio';
import Layout from '../../components/shared/layout';
import Button from '../../components/shared/button';
import { Header } from '../../components/header/header';
import { transformExif } from '../../utils/transformExif';

function Photos(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  const natural = data.natural.edges.map(({ node }) => transformExif(node));
  const built = data.built.edges.map(({ node }) => transformExif(node));
  const people = data.people.edges.map(({ node }) => transformExif(node));

  const naturalIndex = Math.floor(Math.random() * natural.length);
  const builtIndex = Math.floor(Math.random() * built.length);
  const peopleIndex = Math.floor(Math.random() * people.length);

  return (
    <Layout location={props.location} title={siteTitle}>
      {/* <Bio /> */}
      {/* <div style={{ marginTop: '20px', marginInline: 'auto' }}>
        <Gallery
            photos={[
              { ...natural[naturalIndex], link: '/photos/natural', text: 'Natural' },
              { ...built[builtIndex], link: '/photos/built', text: 'Built' },
              { ...people[peopleIndex], link: '/photos/people', text: 'People' },
            ]}
            direction="row"
            renderImage={({ photo }) => (
              <span style={{ width: '33%', paddingBlock: '1%', paddingInline: '2%' }}>
                <ImageButton
                    onClick={() => navigate(photo.link)}
                >
                  <GatsbyImage image={getImage(photo)} alt="" />
                  <span style={{ display: 'block', paddingTop: '5px' }}>{photo.text}</span>
                </ImageButton>
              </span>
            )}
        />
      </div> */}
      <iframe title="photography" src="https://photos.apurva-shukla.me" frameBorder="0" scrolling="yes" seamless="seamless" style={{ display: 'block', width: '100%', height: '100vh' }} />
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
                        gatsbyImageData(layout: CONSTRAINED)
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
                        gatsbyImageData(layout: CONSTRAINED)
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
                        gatsbyImageData(layout: CONSTRAINED)
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
  return (
    <Header
        pathName={location.pathName}
        title={`Photos | ${data.site.siteMetadata.title}`}
    />
  );
}

const ImageButton = styled.button`
    display: block;
    border: none;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 3px;

    &:hover {
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.25);
    }
`;
