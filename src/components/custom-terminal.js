import React from "react"
import Terminal from 'terminal-in-react';
import styled from "styled-components"
import { rhythm } from "../utils/typography"

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
          // hideTopBar={true}
          // showActions ={false} //{False} 
          prompt='#d33682'
          color='#657b83'
          backgroundColor='#073642'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1.5em",  }}
          commandPassThrough={(cmd, print) => {
            console.log(cmd);
            // do something async
            // if(cmd[0] === 'blog'){
            //   console.log('HELOO BLOG????')
            // }
            print(`-PassedThrough:${cmd}: command not found`);
          }}
          commands={{
            // 'help': () => {return('')},
            'blog': () => window.open('/blog', "_self"),
            // 'open-google': () => window.open('/blog', "_self"),
            'test': () => {return("TESTING")}, //console.log("TESTING"),
            'showmsg': console.log('Hello World'),
            popup: () => alert('Terminal in React'),
            'type-text': (args, print, runCommand) => {
              const text = args.slice(1).join(' ');
              print(<span><div style={{background: 'blue'}}>"TEST"</div></span>);
              for (let i = 0; i < text.length; i += 1) {
                setTimeout(() => {
                  runCommand(`edit-line ${text.slice(0, i + 1)}`);
                }, 100 * i);
              }
            },
          }}
          descriptions={{
            'blog': 'see my blog',
            showmsg: 'shows a message',
            alert: 'alert', 
            popup: 'alert',
            show: false,
            help: false,
            clear: false,
          }}
          msg='Hello, my name is Apurva Shukla. Here you can find my blog, photographs and projects. Type help to get started.'
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
  .sc-dnqmqq {
    padding: 0px 10px 0px 0px;
  }
`

export default CustomTerminal