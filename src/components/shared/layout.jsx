import React from 'react';
import { Link, withPrefix } from 'gatsby';
import styled from 'styled-components';
import './layout.css';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { rhythm, scale } from '../../utils/typography';
import 'font-awesome/css/font-awesome.min.css';
// eslint-disable-next-line import/no-unresolved
import 'yet-another-react-lightbox/styles.css';
// eslint-disable-next-line import/no-unresolved
import 'yet-another-react-lightbox/plugins/captions.css';

function Layout(props) {
  const { location, title, children } = props;
  const homePath = withPrefix('/');
  const blogPath = withPrefix('/blog/');

  const isDefault = location.pathname === homePath
    || location.pathname === blogPath
    || location.pathname.includes(blogPath); // For all other /blog/ combinations

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
          <HeaderGenerator title={title} isDefault={isDefault} />
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

const ThemeTogglerUtil = (isPhoto) => (
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
              fontSize: isPhoto ? '2rem' : '3rem',
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

const HeaderGenerator = ({ title, isDefault }) => (
  <div
    style={{
      marginBottom: '1.75rem',
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <Title isDefault={isDefault}>
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
      <Subtitle isDefault={isDefault}>
        <Link
          style={{
            color: 'inherit',
          }}
          to="/blog"
        >
          Blog
        </Link>
      </Subtitle>
      <Subtitle isDefault={isDefault}>
        <Link
          style={{
            color: 'inherit',
          }}
          to="/photos"
        >
          Photos
        </Link>
      </Subtitle>
      {ThemeTogglerUtil(false)}
    </div>
  </div>
);

const Title = ({ isDefault, children }) => (isDefault ? (
  <h1
      style={{
        display: 'inline',
        ...scale(1.5),
        marginTop: 0,
      }}
  >
    {children}
  </h1>
) : (
  <h3
      style={{
        marginTop: 0,
      }}
  >
    {children}
  </h3>
));

const Subtitle = ({ isDefault, children }) => (isDefault ? (
  <h3
      style={{
        marginBlock: 'auto',
        marginInline: '10px',
      }}
  >
    {children}
  </h3>
) : (
  <h4
      style={{
        marginBlock: 'auto',
        marginInline: '10px',
      }}
  >
    {children}
  </h4>
));
