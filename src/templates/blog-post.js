import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import { Back } from '../components/social-icons';
import Comments from '../components/comments';
import Button from '../components/button';

class BlogPostTemplate extends React.Component {
    render() {
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
                <MDXRenderer>{post.body}</MDXRenderer>
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
            body
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
            sort: { fields: [date], order: ASC }
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

const SubscribeForm = () => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: rhythm(1),
        }}
    >
        <div
            style={{
                boxShadow: 'var(--formShadow)',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: 'var(--subscribeBackground)',
            }}
        >
            <form
                method="post"
                action="https://listmonk.apurva-shukla.me/subscription/form"
            >
                <div>
                    <h3>Subscribe to my newsletter</h3>
                    <p>
                        I'll occasionally send you my writing, and things I've
                        found interesting
                    </p>
                    <p>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            required
                            style={{
                                padding: '8px',
                                borderColor: 'rgb(227, 227, 227)',
                                borderRadius: '4px',
                            }}
                        />
                    </p>
                    <p>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            required
                            style={{
                                padding: '8px',
                                borderColor: 'rgb(227, 227, 227)',
                                borderRadius: '4px',
                            }}
                        />
                    </p>
                    <input
                        id="9ed94"
                        type="hidden"
                        name="l"
                        checked
                        value="9ed94b7c-8e2f-4e62-be2c-3dc2e3c5f5e3"
                        readOnly
                    />
                    <Button marginRight="25px">Subscribe</Button>
                </div>
            </form>
        </div>
    </div>
);
