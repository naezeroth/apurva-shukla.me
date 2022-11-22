import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { rhythm } from '../../utils/typography';

const bioQuery = graphql`query BioQuery {
  avatar: file(absolutePath: {regex: "/profile.png/"}) {
    childImageSharp {
      gatsbyImageData(width: 100, height: 100, layout: FIXED)
    }
  }
  site {
    siteMetadata {
      author
    }
  }
}`;

function Bio(props) {
  const { style } = props;

  const data = useStaticQuery(bioQuery);
  const { author } = data.site.siteMetadata;

  return (

    <Container style={{ ...style }}>
      <GatsbyImage
        image={data.avatar.childImageSharp.gatsbyImageData}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          minWidth: 100,

          borderRadius: '50%',
        }}
        imgStyle={{
          borderRadius: '25%',
        }}
      />
      <br />
      <p style={{ marginTop: '35px' }}>
        Created by
        {' '}
        <strong>{author}</strong>
        .
        {' '}
      </p>
    </Container>

  );
}

const Container = styled.div`
    display: flex;
`;

export default Bio;
