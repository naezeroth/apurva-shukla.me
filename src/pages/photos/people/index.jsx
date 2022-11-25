import React from 'react';
import { Link, graphql } from 'gatsby';
import Gallery from 'react-photo-gallery';
import Bio from '../../../components/shared/bio';
import Layout from '../../../components/shared/layout';
import Button from '../../../components/shared/button';
import { Header } from '../../../components/header/header';
import { transformExif } from '../../../utils/transformExif';
import Photo from '../../../components/photos/photo';
import 'react-image-lightbox/style.css';
import { Back } from '../../../components/shared/social-icons';

function Photos(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  const people = data.people.edges.map(({ node }) => transformExif(node));

  return (
    <Layout location={props.location} title={siteTitle}>
      <Bio />
      <Link to="/photos/">
        <div
            style={{
              textDecoration: 'none !important',
              boxShadow: 'none !important',
              paddingTop: '20px',
            }}
        >
          <Back />
        </div>
      </Link>
      <div style={{ marginTop: '20px', marginInline: 'auto' }}>
        <Gallery
            photos={people}
            renderImage={Photo}
        />
      </div>
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
        title={`Built | ${data.site.siteMetadata.title}`}
    />
  );
}
