import React from 'react';
import Terminal from 'terminal-in-react';
import styled from 'styled-components';
import {
  useStaticQuery, graphql, navigate, Link,
} from 'gatsby';
import { rhythm } from '../../utils/typography';
import WelcomeBio from './welcome-bio';
import { IconLink } from '../shared/link';
import { Github, Linkedin, Email } from '../shared/social-icons';

export function CustomTerminal() {
  const data = useStaticQuery(terminalQuery);
  const resumeUrl = data.resume.publicURL;
  const { social } = data.site.siteMetadata;

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
        style={{
          fontFamily: 'Fira Code',
          fontSize: '1.25em',
          fontWeight: '400',
          fontVariantLigatures: 'contextual',
        }}
        actionHandlers={{
          handleClose: () => {},
          handleMaximise: () => {},
          handleMinimise: () => {},
        }}
        commandPassThrough={(cmd) => passThroughCommand(cmd)}
        commands={{
          whoami: () => whoamiCommand(social),
          Whoami: () => whoamiCommand(social),
          blog: () => navigate('/blog'),
          Blog: () => navigate('/blog'),
          // 'projects': () => {return("Projects here")},
          // 'Projects': () => {return("Projects here")},
          photos: () => navigate('/photos'),
          Photos: () => navigate('/photos'),
          resume: () => navigate(resumeUrl),
          Resume: () => navigate(resumeUrl),
          Help: helpCommand,
          help: helpCommand,
          show: showCommand,
        }}
      />
    </TerminalWrapper>
  );
}

export default CustomTerminal;

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
`;

// Some specific CSS modifications to Terminal
const TerminalWrapper = styled.div`
    .terminal-base .sc-bxivhb {
        max-width: 100% !important;
        height: ${rhythm(1.2)} !important;
        border-radius: 20px 20px 0px 0px;
    }
    .terminal-base .sc-EHOje {
        max-width: 100% !important;
        overflow-y: auto !important;
        border-radius: 0px 0px 20px 20px;
        overflow: hidden;
        flex: 1 1 auto;
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
    display: flex;
    height: ${rhythm(28)} !important;

`;

const helpCommand = () => (
  <span style={{ fontFamily: 'Fira Code' }}>
    <p style={{ color: '#268bd2', fontWeight: 'bold' }}>
      To use this terminal, simply type any of the commands listed below.
    </p>
    <p>
      <b style={{ color: '#b58900' }}>whoami</b>
      {' '}
      - get to know me + how to
      contact me
    </p>
    <p>
      <b style={{ color: '#b58900' }}>blog</b>
      {' '}
      - checkout my blog
    </p>
    <p>
      <b style={{ color: '#b58900' }}>photos</b>
      {' '}
      - checkout my photography
      portfolio
    </p>
    <b style={{ color: '#b58900' }}>resume</b>
    {' '}
    - check out my resume
  </span>
);

const whoamiCommand = (social) => (
  <span
    style={{
      fontFamily: 'Fira Code',
      fontWeight: '500',
      fontSize: '1em',
      lineHeight: '1.5em',
    }}
  >
    <p style={{ color: '#cb4b16', fontWeight: '500' }}>
      Hey there! Welcome to my website, thanks for taking the time to get
      to know me.
    </p>
    <p>
      I'm a software engineer by trade, and am in love with technology;
      more specifically, how technology can be a force for improving the
      global quality of life - for humans and nature alike.
    </p>
    <p>
      When I'm not typing away on my keyboard, you can find me
      {' '}
      <Link to="/blog/bookshelf">
        reading books
      </Link>
      {' '}
      (please shoot through any recommendations!), trying my hand at
      photography, or simply being
      {' '}
      <a
        href="https://zenhabits.net/be-still/"
        target="_blank"
        rel="noopener noreferrer"
      >
        still
      </a>
      .
    </p>
    You can find me on
    {' '}
    <IconLink href={social.github}>
      <Github />
    </IconLink>
    ,
    {' '}
    <IconLink href={social.linkedin}>
      <Linkedin />
    </IconLink>
    {' '}
    or
    {' '}
    <IconLink href={social.mail}>
      <Email />
    </IconLink>
    .
  </span>
);

const passThroughCommand = (cmd) => (
  <span style={{ fontFamily: 'Fira Code' }}>
    -bash:$
    {cmd}
    : command not found, please type
    {' '}
    <b style={{ color: '#d33682' }}>help</b>
    {' '}
    to see all legal commands
  </span>
);

const showCommand = () => (
  <WelcomeBio />
);
