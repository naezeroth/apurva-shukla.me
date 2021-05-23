import React from "react"
import { Link, graphql, navigate } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Button from "../components/button"

class Blog extends React.Component {
  render() {
    // console.log(data);
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <div style={{ margin: "20px 0 40px" }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            console.log("node is ", node );
            return (
              <div key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 6),
                  }}
                >
                  <Link
                    style={{ boxShadow: `none` }}
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
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                <small>{node.timeToRead} min read</small>
                {node.frontmatter.tags && node.frontmatter.tags.map(tag => {
                  console.log("inside node.tags map", tag);
                  return [
                    <div
                      key={tag}
                      variant="outlined"
                      onClick={event => { navigate(`/blog/tag/${tag}`) }}
                      style={{
                        marginRight: "2.5%",
                        marginLeft: "2.5%",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <p>{tag}</p>
                    </div>,
                  ]
                })}
              </div>
            )
          })}
        </div>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </Layout>
    )
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
`
export default Blog
