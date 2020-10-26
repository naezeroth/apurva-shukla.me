import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { Back } from "../components/social-icons"
import axios from "axios";

class BlogPostTemplate extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      msg: '',
      email: '',
      loading: false,
    };
    this.onChange = this.onChange.bind(this); 
    this.onSubmit = this.onSubmit.bind(this); 
  }

  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({loading: true});
    const { name, email, msg } = this.state;

    const formdata = new FormData();
    formdata.set('fields[name]', name);
    formdata.set('fields[email]', email);
    formdata.set('fields[message]', msg);
    formdata.set('options[slug]', this.props.pageContext.slug);
    formdata.set('options[redirect]', "https://apurva-shukla.me/blog"+this.props.pageContext.slug);

    const json = {}
    formdata.forEach((value, prop) => (json[prop] = value))
    const formBody = Object.keys(json)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
      .join('&')

    console.log("IN SUBMIT", formBody);

    axios.post('https://staticman-aus.herokuapp.com/v2/entry/naezeroth/personal-website/master/comments', 
    {data: formBody}, 
    {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      .then((result) => {
        console.log(result, "SUCCESS!!!!");
        //access the results here..1
        this.setState({loading: false});
      })
      .catch((result) => {
        //Deal with error..
        console.log(result, "FAILURE!!!!");
        this.setState({loading: false});
      });
  }


  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          meta={{
            property: `og:image`,
            content: `https://apurva-shukla.me${post.frontmatter.featuredimage.childImageSharp.original.src}`
          }}
        />
        <Link to='/blog'>
          <div style={{textDecoration: `none !important`, boxShadow: 'none !important'}}>
              <Back/>
          </div>
        </Link>
        <h1 style={{marginTop: rhythm(1)}}>{post.frontmatter.title}</h1>
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

        <form>
          {/* <input name="options[redirect]" type="hidden" value="https://apurva-shukla.me"/>
          <input name="options[slug]" type="hidden" value="{{ this.props.pageContext.slug }}"/> */}
          <label><input name="name" type="text" onChange={this.onChange}/>Name</label>
          <label><input name="email" type="email" onChange={this.onChange}/>E-mail</label>
          <label><textarea name="msg" onChange={this.onChange}></textarea>Message</label>
          <button onClick={this.onSubmit} type="submit">Go!</button>
        </form>
        {/* <Link to="/">
          <Button marginTop="35px">Go Home</Button>
        </Link> */}
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
  }
`
