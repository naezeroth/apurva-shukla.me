import React from 'react';
import { Link, graphql, navigate } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import Button from '../components/button';
import { TagBar } from '../components/tag-bar';
import { Rss } from '../components/social-icons';
import { RssButton } from '../components/rss';
class Blog extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;
        const posts = data.allMdx.edges;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="All posts" />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Bio />
                    <RssButton />
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
                                <small>{node.timeToRead} min read</small>
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

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
                    timeToRead
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
export default Blog;
