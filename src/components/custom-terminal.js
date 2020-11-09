import React from "react"
import Terminal from "terminal-in-react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import WelcomeBio from "./welcome-bio"
import { StaticQuery, graphql } from "gatsby"
import { IconLink } from "./link"
import { Github, Linkedin, Email } from "./social-icons"

var social
class CustomTerminal extends React.Component {
  componentDidMount() {
    console.log("TERMINAL IS MOUNTED")
  }
  render() {
    return (
      <StaticQuery
        query={terminalQuery}
        render={data => {
          const { publicURL } = data.resume
          social = data.site.siteMetadata.social
          return (
            <TerminalWrapper>
              <Terminal
                startState="maximised"
                promptSymbol="$"
                allowTabs={false}
                outputColor="#93a1a1"
                prompt="#d33682"
                color="#657b83"
                backgroundColor="#073642"
                barColor="black"
                style={{ fontSize: "1.75em", lineHeight: "1.8em" }}
                actionHandlers={{
                  handleClose: () => {},
                  handleMaximise: () => {},
                  handleMinimise: () => {},
                }}
                commandPassThrough={cmd => {
                  // do something async
                  return (
                    <span>
                      -bash:${cmd}: command not found, please type{" "}
                      <b style={{ color: "#d33682" }}>help</b> to see all legal
                      commands
                    </span>
                  )
                }}
                commands={{
                  whoami: whoamiCommand,
                  Whoami: whoamiCommand,
                  blog: () => window.open("/blog", "_self"),
                  Blog: () => window.open("/blog", "_self"),
                  // 'projects': () => {return("Projects here")},
                  // 'Projects': () => {return("Projects here")},
                  photos: () => window.open("/photos", "_self"),
                  Photos: () => window.open("/photos", "_self"),
                  resume: () => window.open(publicURL, "_self"),
                  Resume: () => window.open(publicURL, "_self"),
                  Help: helpCommand,
                  help: helpCommand,
                  show: () => {
                    return <WelcomeBio />
                  },
                }}
              />
            </TerminalWrapper>
          )
        }}
      />
    )
  }
}

//Some specific CSS modifications to Terminal
const TerminalWrapper = styled.div`
  .terminal-base .sc-bxivhb {
    max-width: 100% !important;
    height: ${rhythm(1.2)} !important;
    border-radius: 20px 20px 0px 0px;
  }
  .terminal-base .sc-EHOje {
    max-width: 100% !important;
    overflow-y: auto !important;
    height: ${rhythm(28)} !important;
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;
  }
  .sc-htoDjs {
    padding-top: 0px;
  }
  .sc-dnqmqq {
    padding: 0px 10px 0px 0px;
  }
  .sc-bxivhb {
    line-height: normal;
  }
`
const terminalQuery = graphql`
  query terminalQuery {
    resume: file(
      extension: { eq: "pdf" }
      name: { eq: "ApurvaShukla_Resume" }
    ) {
      publicURL
    }
    site {
      siteMetadata {
        social {
          linkedin
          mail
          github
        }
      }
    }
  }
`

const helpCommand = () => {
  return (
    <span>
      <p style={{ color: "#268bd2" }}>
        To use this terminal, simply type any of the commands listed below.
      </p>
      <p>
        <b style={{ color: "#b58900" }}>whoami</b> - get to know me + how to
        contact me
      </p>
      <p>
        <b style={{ color: "#b58900" }}>blog</b> - checkout my blog
      </p>
      <p>
        <b style={{ color: "#b58900" }}>photos</b> - checkout my photography
        portfolio
      </p>
      <b style={{ color: "#b58900" }}>resume</b> - check out my resume
    </span>
  )
}

const whoamiCommand = () => {
  return (
    <span>
      <p style={{ color: "#cb4b16" }}>
        Hey there! Welcome to my website, thanks for taking the time to get to
        know me.
      </p>
      <p>
        I'm currently in my final year of computer science at UNSW, and am in
        love with technology; more specifically, how technology can be a force
        for improving the global quality of life - for humans and nature alike.
      </p>
      <p>
        When I'm not typing away on my keyboard, you can find me reading books
        (please shoot through any recommendations!), trying my hand at
        photography, or simply being{" "}
        <a
          href="https://zenhabits.net/be-still/"
          target="_blank"
          rel="noopener noreferrer"
        >
          still
        </a>
        .
      </p>
      You can find me on {""}
      <IconLink href={social.github}>
        <Github />
      </IconLink>
      , {""}
      <IconLink href={social.linkedin}>
        <Linkedin />
      </IconLink>
      {""} or {""}
      <IconLink href={social.mail}>
        <Email />
      </IconLink>
      .
    </span>
  )
}

export default CustomTerminal
