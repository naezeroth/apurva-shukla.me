import React from 'react';
import { graphql } from 'gatsby';
import { Header } from '../components/header/header';
import CommonBlogComponent from '../components/blog/list-of-posts';

const Blog = ({ data, pageContext, location }) => (
  <CommonBlogComponent
    data={data}
    pageContext={pageContext}
    location={location}
    pageTitle="blog"
  />
);

export default Blog;

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip, filter: { frontmatter: { tags: { nin: ["bookshelf"] } } }) {
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
      title={`Blog | ${data.site.siteMetadata.title}`}
    />
  );
}
