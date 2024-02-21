import React from 'react';
import { graphql } from 'gatsby';
import { Header } from '../components/header/header';
import CommonBlogComponent from '../components/blog/list-of-posts';

const Bookshelf = ({ data, pageContext, location }) => (
  <CommonBlogComponent
    data={data}
    pageContext={pageContext}
    location={location}
    pageTitle="bookshelf"
  />
);

export default Bookshelf;

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip, filter: { frontmatter: { tags: { in: ["bookshelf"] } } }) {
      edges {
        node {
          excerpt
          fields {
            slug
            timeToRead {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
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
      title={`Bookshelf | ${data.site.siteMetadata.title}`}
    />
  );
}
