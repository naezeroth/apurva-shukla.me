import React from "react"
import PropTypes from "prop-types"
import { rhythm } from "../utils/typography"
import Bio from "../components/bio"
import Layout from "../components/layout"
import { Back } from "../components/social-icons"
import { Link, graphql, navigate } from "gatsby"

const Tags = (props) => {
    const { tag, siteTitle } = props.pageContext
    const { edges, totalCount } = props.data.allMdx
    // const siteTitle = props.data.site.siteMetadata.title
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
        } tagged with "${tag}"`
    return (
        <Layout location={props.location} title={siteTitle}>
             <Link to="/blog">
          <div
            style={{
              textDecoration: `none !important`,
              boxShadow: "none !important",
            }}
          >
            <Back />
          </div>
        </Link>
        <div>
            <h1>{tagHeader}</h1>
            <ul>
                {edges.map(({ node }) => {
                    const { slug } = node.fields
                    const { title } = node.frontmatter
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
                        // <article key={node.fields.slug}>
                        //     <header>
                        //         <h3
                        //             style={{
                        //                 marginBottom: rhythm(1 / 4),
                        //             }}
                        //         >
                        //             <Link style={{ boxShadow: `none` }} to={`/blog${node.fields.slug}`}>
                        //                 {title}
                        //             </Link>
                        //         </h3>
                        //     </header>
                        //     <section>
                        //         <p
                        //             dangerouslySetInnerHTML={{
                        //                 __html: node.frontmatter.description || node.excerpt,
                        //             }}
                        //         />
                        //     </section>
                        // </article>
                    )
                })}
            </ul>
        </div>
        </Layout>
    )
}
Tags.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
        // siteTitle: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                title: PropTypes.string.isRequired
            })
        })
    }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
        siteMetadata {
          title
        }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }  
    ) {
      totalCount
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