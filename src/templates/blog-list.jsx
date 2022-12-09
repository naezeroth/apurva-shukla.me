import React from 'react';
import { Link, graphql } from 'gatsby';
import Bio from '../components/shared/bio';
import Layout from '../components/shared/layout';
import { rhythm } from '../utils/typography';
import Button from '../components/shared/button';
import { TagBar } from '../components/blog/tag-bar';
import { RssButton } from '../components/blog/rss';
import { PageNumber } from '../components/blog/page-number';
import { SubscribeButton } from '../components/blog/blog-post/email-button';
import { Header } from '../components/header/header';

function Blog(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <Layout location={props.location} title={siteTitle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Bio style={{ marginBottom: '10px' }} />
        <div>
          <SubscribeButton />
          <RssButton />
        </div>
      </div>
      <div style={{ margin: '20px 0 40px' }}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 6),
                }}
              >
                <Link
                  style={{ boxShadow: 'none' }}
                  to={`/blog${node.fields.slug}`}
                  state={{
                    referringPage: isFirst ? '/blog' : `/blog/${currentPage}`,
                  }}
                >
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                style={{
                  marginBottom: rhythm(1 / 8),
                  marginTop: rhythm(1 / 8),
                }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <small>{node.fields.timeToRead.text}</small>
              {node.frontmatter.tags && <TagBar tags={node.frontmatter.tags} />}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        {!isFirst && <PageNumber text="«" link="/blog" />}
        {!isFirst && <PageNumber text="‹" link={`/blog/${prevPage}`} />}
        <NumberLinks currentPage={currentPage} numPages={numPages} />
        {!isLast && <PageNumber text="›" link={`/blog/${nextPage}`} />}
        {!isLast && <PageNumber text="»" link={`/blog/${numPages}`} />}
      </div>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </Layout>
  );
}

export default Blog;

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
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

const NumberLinks = ({ currentPage, numPages }) => {
  const prev = currentPage - 2 <= 1 ? 1 : currentPage - 2;
  const next = currentPage + 2 >= numPages ? numPages : currentPage + 2;
  const ret = [];
  for (let i = prev; i <= next; i += 1) {
    if (i === 1) {
      ret.push(<PageNumber text={1} link="/blog/" />);
    } else {
      ret.push(<PageNumber text={i} link={`/blog/${i}`} />);
    }
  }
  return ret;
};
