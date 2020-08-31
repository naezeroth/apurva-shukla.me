import React from "react"
import Terminal from 'terminal-in-react';
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import WelcomeBio from "./welcome-bio"
import { StaticQuery, graphql } from "gatsby"
import { IconLink } from "./link"
import { Github, Linkedin, Email } from "./social-icons"

class CustomTerminal extends React.Component {
  componentDidMount() {
    console.log("TERMINAL IS MOUNTED");
  }
  render() {
    return (
      <StaticQuery
        query={terminalQuery}
        render = {data => {
          const { publicURL } = data.resume
          const { social } = data.site.siteMetadata
          return (
            <TerminalWrapper>
              <Terminal
                startState='maximised'
                promptSymbol="$"
                allowTabs={false}
                outputColor='#93a1a1'
                prompt='#d33682'
                color='#657b83'
                backgroundColor='#073642'
                barColor='black'
                style={{ fontWeight: "bold", fontSize: "1.5em",  }}
                commandPassThrough={(cmd, print) => {
                  console.log(cmd);
                  // do something async
                  print(`-bash:${cmd}: command not found, please type help to see all legal commands`);
                }}
                commands={{
                  'whoami': () => {return(<span><p>
                    Hey there! Welcome to my website. My name is Apurva Shukla and 
                    here you can find my <a href={'/blog/'} style={{color: '#859900'}}>blog</a>, photographs and projects. 
                    Type help to get started. You can find me on {""}     
                    <IconLink href={social.github}><Github/></IconLink>
                    , {""}
                    <IconLink href={social.linkedin}><Linkedin/></IconLink>
                    {""} or {""}
                    <IconLink href={social.mail}><Email/></IconLink>
                    .
                    </p>
                    </span>)},       
                  'blog': () => window.open('/blog', "_self"),
                  'projects': () => {return("Projects here")},
                  'photos': () => {return("Photos here")},
                  'resume': () => window.open(publicURL, "_self"),
                  'Help': (args, print, runCommand) => {
                    runCommand('help');
                  },
                  'test': () => console.log(this),
                  // 'help': () => {return('')}, //Add custom colours etc to this by looping through commands
                  show: () => {return(<WelcomeBio/>)}
                }}
                descriptions={{
                  'blog': 'see my blog',
                  showmsg: 'shows a message',
                  popup: 'alert',
                  show: false,
                  help: false,
                  clear: false,
                  Help: false,
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
    height: ${rhythm(20)} !important;
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;
  }
  .sc-htoDjs {
    padding-top: 0px;
  }
  .sc-dnqmqq {
    padding: 0px 10px 0px 0px;
  }
`
const terminalQuery = graphql`
  query terminalQuery {
    resume: file(
      extension: {eq: "pdf"},
      name: {eq: "ApurvaShukla_Resume"}
      
    ){
      publicURL
    } 
    site {
      siteMetadata {
        social {
          twitter,
          linkedin, 
          mail, 
          github,
        }
      }
    } 
  }
`
export default CustomTerminal