import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/shared/layout';
import { CustomTerminal } from '../components/home/custom-terminal';
import { Header } from '../components/header/header';

function HomePage(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={props.location} title={siteTitle}>
      <div>
        <CustomTerminal />
      </div>
    </Layout>
  );
}

export default HomePage;

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
                description
                author
            }
        }
        avatar: file(absolutePath: { regex: "/profile.png/" }) {
            childImageSharp {
                original {
                    src
                }
            }
        }
    }
`;

export function Head({ location }) {
  return <Header pathName={location.pathName} />;
}
