import React from "react"
import Terminal from 'terminal-in-react';
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import WelcomeBio from "./welcome-bio"

class CustomTerminal extends React.Component {
  componentDidMount() {
    console.log("TERMINAL IS MOUNTED");
  }
  render() {
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
            'whoami': () => {return(<p>
              Hey there! Welcome to my website. My name is Apurva Shukla and 
              here you can find my <a href={'/blog/'}>blog</a>, photographs and projects. 
              Type help to get started.
              </p>)}, //Add social icons like github, etc. in this            
            'blog': () => window.open('/blog', "_self"),
            'projects': () => {return("Projects here")},
            'photos': () => {return("Photos here")},
            'resume': () => {return("RESUME ??? open")},
            // 'help': () => {return('')}, //Add custom colours etc to this by looping through commands
            showmsg: () => console.log('Hello World'),
            show: () => {return(<WelcomeBio/>)}
          }}
          descriptions={{
            'blog': 'see my blog',
            showmsg: 'shows a message',
            popup: 'alert',
            show: false,
            help: false,
            clear: false,
          }}
        />
      </TerminalWrapper>
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

export default CustomTerminal