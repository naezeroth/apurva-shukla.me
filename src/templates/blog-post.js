import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import { Back } from '../components/social-icons';
import Comments from '../components/comments';
import { SubscribeForm } from '../components/subscribe-form';

const BlogPostTemplate = ({
    data: { mdx, site, comments },
    children,
    location,
    pageContext,
}) => {
    const siteTitle = site.siteMetadata.title;
    const { previous, next } = pageContext;
    const allComments = comments.edges;

    return (
        <Layout location={location} title={siteTitle}>
            <Link to="/blog/">
                <div
                    style={{
                        textDecoration: 'none !important',
                        boxShadow: 'none !important',
                    }}
                >
                    <Back />
                </div>
            </Link>
            <h1
                style={{
                    marginTop: rhythm(1 / 2),
                    marginBottom: rhythm(1 / 8),
                }}
            >
                {mdx.frontmatter.title}
            </h1>
            <span
                style={{
                    ...scale(-1 / 5),
                    display: 'block',
                }}
            >
                {mdx.frontmatter.date}
            </span>
            <span
                style={{
                    ...scale(-1 / 5),
                    display: 'block',
                    marginBottom: rhythm(1),
                }}
            >
                <i>{mdx.fields.timeToRead.text}</i>
            </span>
            {children}
            <hr
                style={{
                    marginBottom: rhythm(1),
                }}
            />
            <SubscribeForm />
            <hr
                style={{
                    marginBottom: rhythm(1),
                }}
            />
            <Bio />
            <br></br>
            <ul
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    listStyle: 'none',
                    padding: 0,
                }}
            >
                <li>
                    {previous && (
                        <Link to={`/blog${previous.fields.slug}`} rel="prev">
                            ← {previous.frontmatter.title}
                        </Link>
                    )}
                </li>
                <li>
                    {next && (
                        <Link to={`/blog${next.fields.slug}`} rel="next">
                            {next.frontmatter.title} →
                        </Link>
                    )}
                </li>
            </ul>
            <hr
                style={{
                    marginBottom: rhythm(1),
                }}
            />
            <Comments slug={pageContext.slug} comments={allComments} />
        </Layout>
    );
};
export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!, $slugWithoutSlash: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        mdx(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                featuredimage {
                    childImageSharp {
                        original {
                            src
                        }
                    }
                }
            }
            fields {
                timeToRead {
                    minutes
                    text
                    time
                    words
                }
            }
        }
        comments: allCommentsYaml(
            filter: { slug: { eq: $slugWithoutSlash } }
            sort: { date: ASC }
        ) {
            edges {
                node {
                    _id
                    slug
                    name
                    date
                    message
                    replying_to_uid
                }
            }
        }
    }
`;

export const Head = ({ location, params, data, pageContext }) => (
    <SEO
        title={data.mdx.frontmatter.title}
        pathname={location.pathname}
        description={data.mdx.frontmatter.description || data.mdx.excerpt}
        image={
            data.mdx.frontmatter.featuredimage
                ? data.mdx.frontmatter.featuredimage.childImageSharp.original
                      .src
                : undefined
        }
    />
);