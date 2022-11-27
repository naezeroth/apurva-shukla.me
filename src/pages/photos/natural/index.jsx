import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import Gallery from 'react-photo-gallery';
import Lightbox from 'yet-another-react-lightbox';
// eslint-disable-next-line import/no-unresolved
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Bio from '../../../components/shared/bio';
import Layout from '../../../components/shared/layout';
import Button from '../../../components/shared/button';
import { Header } from '../../../components/header/header';
import { transformExif } from '../../../utils/transformExif';
import Photo from '../../../components/photos/photo';
import { Back } from '../../../components/shared/social-icons';
import { transformSlides } from '../../../utils/transformSlides';

function Photos(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;
  const natural = data.natural.edges.map(({ node }) => transformExif(node));
  const [openIndex, setOpenIndex] = useState(-1);
  const slides = transformSlides(natural);

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
            photos={natural}
            renderImage={Photo}
            onClick={(_, { index }) => setOpenIndex(index)}
        />
      </div>
      <Lightbox
        slides={slides}
        open={openIndex >= 0}
        index={openIndex}
        close={() => setOpenIndex(-1)}
        plugins={[Captions]}
      />
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
                        gatsbyImageData(
                            layout: CONSTRAINED
                        )
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
