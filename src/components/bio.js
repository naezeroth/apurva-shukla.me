import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import { rhythm } from '../utils/typography';

function Bio() {
    return (
        <StaticQuery
            query={bioQuery}
            render={data => {
                const { author } = data.site.siteMetadata;
                return (
                    <Container>
                        <Image
                            fixed={data.avatar.childImageSharp.fixed}
                            alt={author}
                            style={{
                                // eslint-disable-next-line no-magic-numbers
                                marginRight: rhythm(1 / 2),
                                // marginBottom: '50px',
                                minWidth: 100,

                                borderRadius: '50%',
                            }}
                            imgStyle={{
                                borderRadius: '25%',
                            }}
                        />
                        <br />
                        <p style={{ marginTop: '35px' }}>
                            Created by <strong>{author}</strong>.{' '}
                        </p>
                    </Container>
                );
            }}
        />
    );
}

const bioQuery = graphql`
    query BioQuery {
        avatar: file(absolutePath: { regex: "/profile.png/" }) {
            childImageSharp {
                fixed(width: 100, height: 100) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        site {
            siteMetadata {
                author
            }
        }
    }
`;

const Container = styled.div`
    display: flex;
`;

export default Bio;
