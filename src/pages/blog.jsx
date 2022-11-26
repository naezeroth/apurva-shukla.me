import React from 'react';
import { Link, graphql } from 'gatsby';
import Bio from '../components/shared/bio';
import Layout from '../components/shared/layout';
import { rhythm } from '../utils/typography';
import Button from '../components/shared/button';
import { TagBar } from '../components/blog/tag-bar';
import { RssButton } from '../components/blog/rss';
import { SubscribeButton } from '../components/blog/blog-post/email-button';
import { Header } from '../components/header/header';

function Blog(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

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
                  __html:
                                              node.frontmatter.description
                                              || node.excerpt,
                }}
              />
              <small>{node.fields.timeToRead.text}</small>
              {node.frontmatter.tags && (
              <TagBar tags={node.frontmatter.tags} />
              )}
            </div>
          );
        })}
      </div>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </Layout>
  );
}

export default Blog;

export const query = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMdx(sort: {frontmatter: {date: DESC}}) {
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
}`;

export function Head({ location, data }) {
  return <Header pathName={location.pathName} title={`Blog | ${data.site.siteMetadata.title}`} />;
}
