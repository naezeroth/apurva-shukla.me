import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import './layout.css';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { rhythm, scale } from '../../utils/typography';
import 'font-awesome/css/font-awesome.min.css';

function Layout(props) {
  const { title, children } = props;

  return (
    <Wrapper
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--textNormal)',
        transition: 'color 0.1s ease-out, background 0.1s ease-out',
      }}
    >
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(36),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)} 0 ${rhythm(3 / 4)}`,
        }}
      >
        <header>
          <Header title={title} />
        </header>
        <main>{children}</main>
      </div>
      <Footer
        style={{
          marginTop: '35px',
        }}
      >
        {'     '}
        ©
        {' '}
        {new Date().getFullYear()}
        , Built with ❤️ on
        {' '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        {'     '}
      </Footer>
    </Wrapper>
  );
}

export default Layout;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`;

const ThemeToggle = () => (
  <ThemeToggler>
    {({ theme, toggleTheme }) => {
      let iconClass;
      if (!theme) {
        iconClass = 'fa fa-moon-o fa-2x';
      } else {
        iconClass = theme === 'light' ? 'fa fa-moon-o fa-2x' : 'fa fa-sun-o fa-2x';
      }
      return (
        <div
          style={{
            transitionProperty: 'all',
            transitionTimingFunction: 'ease',
            transitionDuration: '2s',
            marginLeft: '1rem',
            minWidth: '3rem',
          }}
        >
          <i
            className={iconClass}
            style={{
              fontSize: '3rem',
            }}
            onClick={() => {
              const nextTheme = theme === 'light' ? 'dark' : 'light';
              toggleTheme(nextTheme);
            }}
          />
        </div>
      );
    }}
  </ThemeToggler>
);

const Header = ({ title }) => (
  <div
    style={{
      marginBottom: '1.75rem',
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <Title>
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit',
          }}
          to="/"
        >
          {title}
        </Link>
      </Title>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Subtitle>
        <Link
          style={{
            color: 'inherit',
          }}
          to="/blog"
        >
          Blog
        </Link>
      </Subtitle>
      <Subtitle>
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://photos.apurva-shukla.me"
          aria-label="Photography Portfolio"
          rel="noreferrer"
        >
          Photos
        </a>
      </Subtitle>
      <ThemeToggle />
    </div>
  </div>
);

const Title = ({ children }) => (
  <h1
      style={{
        display: 'inline',
        ...scale(1.5),
        marginTop: 0,
      }}
  >
    {children}
  </h1>
);

const Subtitle = ({ children }) => (
  <h3
      style={{
        marginBlock: 'auto',
        marginInline: '10px',
      }}
  >
    {children}
  </h3>
);
