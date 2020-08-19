import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import CustomTerminal from "../components/custom-terminal"

class IndexPage extends React.Component {
  render() {
    console.log(this.props);
    const { data } = this.props //I'm assuming the query is populating the this.props, the {data} is extracting data variable inside this.props
    const siteTitle = data.site.siteMetadata.title;
    console.log(data);
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {/* <img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" />
        <h1>
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>Welcome to your new Gatsby website. You are on your home page.</p>
        <p>
          This starter comes out of the box with styled components and Gatsby's
          default starter blog running on Netlify CMS.
        </p>
        <p>Now go build something great!</p> */}
        <CustomTerminal/>
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
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
        description
        author
      }
    }
  }
`

export default IndexPage
