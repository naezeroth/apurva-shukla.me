import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/shared/layout';
import { Header } from '../components/header/header';

function NotFoundPage(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={props.location} title={siteTitle}>
      <h1>Not Found</h1>
      <p>
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </Layout>
  );
}

export default NotFoundPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

export function Head({ location }) {
  return <Header pathName={location.pathName} title="404: Not Found" />;
}
