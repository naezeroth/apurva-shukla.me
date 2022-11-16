import React from 'react';
import { Link, graphql, navigate } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import Button from '../components/button';
import { TagBar } from '../components/tag-bar';
import { RssButton } from '../components/rss';
import { SubscribeButton } from '../components/email-button';

class Blog extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;
        const posts = data.allMdx.edges;

        return (
            <Layout location={this.props.location} title={siteTitle}>
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
                        const title =
                            node.frontmatter.title || node.fields.slug;
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
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            node.frontmatter.description ||
                                            node.excerpt,
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
}

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

export default Blog;

export const Head = ({ location, params, data, pageContext }) => (
    <SEO pathname={location.pathname} title="All Blog Posts" />
);