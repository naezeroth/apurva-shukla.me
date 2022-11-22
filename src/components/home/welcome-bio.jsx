import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { rhythm } from '../../utils/typography';

function WelcomeBio() {
  const data = useStaticQuery(NewbioQuery);
  const { author } = data.site.siteMetadata;

  return (
    <Container
      style={{
        fontFamily: 'Fira Code',
        fontVariantLigatures: 'contextual',
        lineHeight: '1.5em',
      }}
    >
      <GatsbyImage
        image={data.avatar.childImageSharp.gatsbyImageData}
        alt={author}
        style={{
          marginRight: rhythm(2 / 3),
          marginBottom: 0,
          minWidth: 100,
        }}
        imgStyle={{
          borderRadius: '20%',
        }}
      />
      <p style={{ fontWeight: '500' }}>
        Hey there! Welcome to my website. My name is Apurva
        Shukla and here you can find my
        {' '}
        <Link to="/blog/" style={{ color: '#859900' }}>
          blog
        </Link>
        ,
        {' '}

        <Link to="/photos/" style={{ color: '#859900' }}>
          photographs
        </Link>
        {' '}
        and projects. Type
        {' '}
        <b style={{ color: '#d33682' }}>help</b>
        {' '}
        to get
        started.
      </p>
    </Container>
  );
}

const NewbioQuery = graphql`query NewbioQuery {
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

const Container = styled.div`
    display: flex;
`;

export default WelcomeBio;
