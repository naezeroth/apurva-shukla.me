import React from 'react';
import { Link, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';
import Bio from '../components/shared/bio';
import Layout from '../components/shared/layout';
import { Back } from '../components/shared/social-icons';
import { TagBar } from '../components/blog/tag-bar';
import { RssButton } from '../components/blog/rss';
import { SubscribeButton } from '../components/blog/blog-post/email-button';
import { Header } from '../components/header/header';

function Tags(props) {
  const { tag } = props.pageContext;
  const { edges, totalCount } = props.data.allMdx;
  const siteTitle = props.data.site.siteMetadata.title;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;
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
      <div>
        <h1>{tagHeader}</h1>
        <Link to="/blog/">
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
        <ul>
          {edges.map(({ node }) => {
            const { title } = node.frontmatter;
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
                {/* <small>{node.timeToRead} min read</small> */}
                {node.frontmatter.tags && (
                <TagBar tags={node.frontmatter.tags} />
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export default Tags;

export const pageQuery = graphql`
    query ($tag: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMdx(
            sort: { frontmatter: { date: DESC } }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    excerpt
                    fields {
                        slug
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

export function Head({ location }) {
  return <Header pathName={location.pathName} />;
}
