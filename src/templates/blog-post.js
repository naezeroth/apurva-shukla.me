import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { Back } from "../components/social-icons"
import axios from "axios"
import Button from "../components/button"

class BlogPostTemplate extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      msg: "",
      email: "",
      loading: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = e => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    this.setState({ loading: true })
    const { name, email, msg } = this.state
    
    const formdata = new FormData()
    formdata.set("fields[name]", name)
    formdata.set("fields[email]", email)
    formdata.set("fields[message]", msg)
    formdata.set("fields[slug]", this.props.pageContext.slug.slice(1, -1)) //necessary for staticman to write files (otherwise "/slug/" will throw GITHUB_WRITING_FILE error)
    formdata.set(
      "options[redirect]",
      "https://apurva-shukla.me/blog" + this.props.pageContext.slug
    )

    const json = {}
    formdata.forEach((value, prop) => (json[prop] = value))
    const formBody = Object.keys(json)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(json[key]))
      .join("&")

    axios
      .post(
        "https://staticman-aus.herokuapp.com/v2/entry/naezeroth/personal-website/master/comments",
        formBody,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(result => {
        console.log(result, "SUCCESS!!!!")
        this.setState({ loading: false, name: "", email: "", msg: "" })
        alert("Your comment has been successfully submitted for moderation");
      })
      .catch(result => {
        console.log(result, "FAILURE!!!!")
        this.setState({ loading: false, name: "", email: "", msg: "" })
        alert("Something went wrong with submitting your comment");
      })
  }

  render() {
    console.log(this.state);
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const comments = this.props.data.comments.edges
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          meta={[
            {
              property: `og:image`,
              content: `https://apurva-shukla.me${post.frontmatter.featuredimage.childImageSharp.original.src}`,
            },
          ]}
        />
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
        <h1 style={{ marginTop: rhythm(1) }}>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
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
        <Bio />
        <br></br>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
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
        <div style={{ margin: "0px 0px 10px 0px", fontSize: "xx-large" }}>
          Add a comment!
        </div>
        <form>
          <label>
            <input
              name="name"
              placeholder="Name"
              type="text"
              onChange={this.onChange}
              value={this.state.name}
              style={{
                height: "50px",
                border: "1px solid #ccc",
                margin: "10px 0px 10px 0px",
                fontWeight: "700",
                borderRadius: "6px",
                padding: "10px",
              }}
            />
          </label>
          <br></br>
          <label>
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              style={{
                height: "50px",
                border: "1px solid #ccc",
                fontWeight: "700",
                borderRadius: "6px",
                padding: "10px",
                margin: "10px 0px 10px 0px",
              }}
            />
          </label>
          <br></br>
          <label>
            <textarea
              name="msg"
              placeholder="Message"
              onChange={this.onChange}
              value={this.state.msg}
              style={{
                height: "50px",
                border: "1px solid #ccc",
                fontWeight: "700",
                borderRadius: "6px",
                padding: "10px",
                margin: "10px 0px 10px 0px",
                width: "75%",
                height: "200px",
              }}
            >{this.state.msg}</textarea>
          </label>
          <br></br>
          <span onClick={this.onSubmit} type="submit" style={{display: "flex"}}>
            <Button marginRight="25px">Go!</Button>
            {this.state.loading && <LoadingSpinner/>}
          </span>
        </form>

        {/* Comment Section */}
        {comments && comments.length > 0 ? (
          comments.map(comment => {
            return (
              <div key={comment.node.id}>
                <p>
                  Name: {comment.node.name}
                  <br />
                  Comment: {comment.node.message}
                  <br />
                  Date: {comment.node.date}
                </p>
              </div>
            )
          })
        ) : (
          <p>No comments yet.</p>
        )}
      </Layout>
    )
  }
}

export default BlogPostTemplate

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
          id
          slug
          name
          date
          message
        }
      }
    }
  }
`
const LoadingSpinner = () => (
  <div>
    <i className="fa fa-spinner fa-spin" style={{fontSize: "42px"}} />
  </div>
);