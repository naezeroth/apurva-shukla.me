import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import Terminal from 'terminal-in-react';
import styled from "styled-components"


class IndexPage extends React.Component {
  render() {
    console.log(this.props);
    // console.log("QUERY IS", query);
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
        <TerminalWrapper>
          <Terminal
            startState='maximised'
            promptSymbol="$ "
            allowTabs={false}
            outputColor='#93a1a1'
            // hideTopBar={true}
            // showActions ={false} //{False} 
            prompt='#d33682'
            color='#657b83'
            backgroundColor='#073642'
            barColor='black'
            style={{ fontWeight: "bold", fontSize: "1.5em",  }}
            commands={{
              'open-google': () => window.open('https://www.google.com/', '_blank'),
              'test': () => {return("TESTING")}, //console.log("TESTING"),
              'showmsg': console.log('Hello World'),
              popup: () => alert('Terminal in React')
            }}
            descriptions={{
              'open-google': 'opens google.com',
              showmsg: 'shows a message',
              alert: 'alert', popup: 'alert',
              show: false,
            }}
            msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
          />
        </TerminalWrapper>
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

//Some specific CSS modifications to Terminal
const TerminalWrapper = styled.div`
  .terminal-base .sc-bxivhb { 
    max-width: 100% !important
    height: 35px !important
  }
  .terminal-base .sc-EHOje {
    max-width: 100% !important;
    overflow-y: auto !important;
    max-height: 600px !important
    height: 600px !important;
  }
`

export default IndexPage
