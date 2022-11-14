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

const BlogPostTemplate2 = ({
    data: { mdx, site, comments },
    children,
    location,
    pageContext,
}) => {
    const siteTitle = site.siteMetadata.title;
    const { previous, next } = pageContext;
    const comments2 = comments.edges;

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={mdx.frontmatter.title}
                description={mdx.frontmatter.description || mdx.excerpt}
                meta={[
                    {
                        property: 'og:image',
                        content: `https://apurva-shukla.me${mdx.frontmatter.featuredimage.childImageSharp.original.src}`,
                    },
                ]}
            />
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
            <p
                style={{
                    ...scale(-1 / 5),
                    display: 'block',
                    marginBottom: rhythm(1),
                    // marginTop: rhythm(-1),
                }}
            >
                {mdx.frontmatter.date}
            </p>
            {children}
            {/* {post.body} */}
            {/* <MDXRenderer>{post.body}</MDXRenderer> */}
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
            <Comments slug={pageContext.slug} comments={comments2} />
        </Layout>
    );
};
export default BlogPostTemplate2;

class BlogPostTemplate extends React.Component {
    render() {
        console.log('this', this);
        const post = this.props.data.mdx;
        const siteTitle = this.props.data.site.siteMetadata.title;
        const { previous, next } = this.props.pageContext;
        const comments = this.props.data.comments.edges;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.description || post.excerpt}
                    meta={[
                        {
                            property: 'og:image',
                            content: `https://apurva-shukla.me${post.frontmatter.featuredimage.childImageSharp.original.src}`,
                        },
                    ]}
                />
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
                    {post.frontmatter.title}
                </h1>
                <p
                    style={{
                        ...scale(-1 / 5),
                        display: 'block',
                        marginBottom: rhythm(1),
                        // marginTop: rhythm(-1),
                    }}
                >
                    {post.frontmatter.date}
                </p>
                {this.children}
                {/* {post.body} */}
                {/* <MDXRenderer>{post.body}</MDXRenderer> */}
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
                            <Link
                                to={`/blog${previous.fields.slug}`}
                                rel="prev"
                            >
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
                <Comments
                    slug={this.props.pageContext.slug}
                    comments={comments}
                />
            </Layout>
        );
    }
}

// export default BlogPostTemplate;

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
