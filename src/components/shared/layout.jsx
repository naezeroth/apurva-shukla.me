import React, { useState, useEffect, useRef } from 'react';
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

const HeaderRoot = styled.div`
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const TitleWrap = styled.div`
  min-width: 0;
  flex: 1 1 auto;
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

const ThemeToggle = ({ size = '2.25rem', ariaLabel }) => (
  <ThemeToggler>
    {({ theme, toggleTheme }) => {
      // gatsby-plugin-dark-mode renders nothing meaningful for `theme`
      // until after hydration. Hide the icon until then to prevent flicker
      // and an incorrect first-click direction.
      if (typeof theme === 'undefined' || theme === null) {
        return (
          <span
            aria-hidden="true"
            style={{ display: 'inline-block', width: size, height: size }}
          />
        );
      }
      const isDark = theme === 'dark';
      const iconClass = isDark ? 'fa fa-sun-o' : 'fa fa-moon-o';
      const label = ariaLabel || (isDark ? 'Switch to light mode' : 'Switch to dark mode');
      return (
        <button
          type="button"
          aria-label={label}
          onClick={(e) => {
            toggleTheme(isDark ? 'light' : 'dark');
            e.currentTarget.blur();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            color: 'inherit',
            padding: '0.25rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className={iconClass} style={{ fontSize: size }} />
        </button>
      );
    }}
  </ThemeToggler>
);

const NAV_LINKS = [
  { to: '/blog', label: 'Blog' },
  { to: '/bookshelf', label: 'Bookshelf' },
];

const MeatballMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'inherit',
          padding: '0.25rem 0.5rem',
          fontSize: '1.75rem',
          lineHeight: 1,
          letterSpacing: '0.1em',
        }}
      >
        ⋯
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.4rem)',
            right: 0,
            background: 'var(--bg)',
            border: '1px solid var(--commentBorder)',
            borderRadius: '10px',
            boxShadow: 'var(--formShadow)',
            padding: '0.2rem',
            zIndex: 50,
            lineHeight: 1.2,
            width: 'max-content',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '0.35rem 0.6rem',
                margin: 0,
                color: 'inherit',
                textDecoration: 'none',
                boxShadow: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                lineHeight: 1.2,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '0.15rem 0.4rem',
              lineHeight: 1,
            }}
          >
            <ThemeToggle size="1.1rem" />
          </div>
        </div>
      )}
    </div>
  );
};

const Header = ({ title }) => (
  <HeaderRoot>
    <TitleWrap>
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
    </TitleWrap>

    {/* Wide screens: inline links + theme toggle */}
    <DesktopNav>
      {NAV_LINKS.map((link) => (
        <Subtitle key={link.to}>
          <Link style={{ color: 'inherit' }} to={link.to}>
            {link.label}
          </Link>
        </Subtitle>
      ))}
      <ThemeToggle />
    </DesktopNav>

    {/* Narrow screens: meatball menu */}
    <MobileNav>
      <MeatballMenu />
    </MobileNav>
  </HeaderRoot>
);

const Title = ({ children }) => (
  <TitleHeading>{children}</TitleHeading>
);

const TitleHeading = styled.h1`
  display: inline;
  margin-top: 0;
  font-size: ${scale(1.5).fontSize};
  line-height: ${scale(1.5).lineHeight};

  @media (max-width: 600px) {
    font-size: ${scale(0.6).fontSize};
    line-height: ${scale(0.6).lineHeight};
  }
`;

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
