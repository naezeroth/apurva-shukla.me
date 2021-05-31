import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import './layout.css';

import { rhythm, scale } from '../utils/typography';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import 'font-awesome/css/font-awesome.min.css';
class Layout extends React.Component {
    render() {
        const { location, title, children } = this.props;
        const rootPath = `${__PATH_PREFIX__}/`;
        const blogPath = `${__PATH_PREFIX__}/blog/`;
        let header;
        console.log(
            'this.props for layout',
            this.props,
            location.pathname.includes(blogPath)
        );
        if (
            location.pathname === rootPath ||
            location.pathname === blogPath ||
            location.pathname.includes(blogPath) // For all other /blog/ combinations
        ) {
            header = (
                <div
                    style={{
                        marginBottom: '1.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <h1
                            style={{
                                display: 'inline',
                                ...scale(1.5),
                                marginTop: 0,
                            }}
                        >
                            <Link
                                style={{
                                    boxShadow: 'none',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                                to={'/'}
                            >
                                {title}
                            </Link>
                        </h1>
                    </div>
                    <ThemeToggler>
                        {({ theme, toggleTheme }) => {
                            let iconClass;
                            if (!theme) {
                                iconClass = 'fa fa-moon-o fa-2x';
                            } else {
                                iconClass =
                                    theme === 'light'
                                        ? 'fa fa-moon-o fa-2x'
                                        : 'fa fa-sun-o fa-2x';
                            }
                            return (
                                <div
                                    style={{
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    <i
                                        className={iconClass}
                                        style={{
                                            fontSize: '3rem',
                                        }}
                                        onClick={() => {
                                            const nextTheme =
                                                theme === 'light'
                                                    ? 'dark'
                                                    : 'light';
                                            toggleTheme(nextTheme);
                                        }}
                                    />
                                </div>
                            );
                        }}
                    </ThemeToggler>
                </div>
            );
        } else {
            header = (
                <div
                    style={{
                        marginBottom: '1.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <h3
                            style={{
                                marginTop: 0,
                            }}
                        >
                            <Link
                                style={{
                                    boxShadow: 'none',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                                to={'/'}
                            >
                                {title}
                            </Link>
                        </h3>
                    </div>
                    <div>
                        <ThemeToggler>
                            {({ theme, toggleTheme }) => {
                                let iconClass;
                                if (!theme) {
                                    iconClass = 'fa fa-moon-o fa-2x';
                                } else {
                                    iconClass =
                                        theme === 'light'
                                            ? 'fa fa-moon-o fa-2x'
                                            : 'fa fa-sun-o fa-2x';
                                }
                                return (
                                    <div>
                                        <i
                                            className={iconClass}
                                            style={{
                                                fontSize: '2rem',
                                            }}
                                            onClick={() => {
                                                const nextTheme =
                                                    theme === 'light'
                                                        ? 'dark'
                                                        : 'light';
                                                toggleTheme(nextTheme);
                                            }}
                                        />
                                    </div>
                                );
                            }}
                        </ThemeToggler>
                    </div>
                </div>
            );
        }
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
                        maxWidth: rhythm(48),
                        padding: `${rhythm(1.5)} ${rhythm(3 / 4)} 0 ${rhythm(
                            3 / 4
                        )}`,
                    }}
                >
                    <header>{header}</header>
                    <script
                        src="//instant.page/5.1.0"
                        type="module"
                        integrity="sha384-by67kQnR+pyfy8yWP4kPO12fHKRLHZPfEsiSXR8u2IKcTdxD805MGUXBzVPnkLHw"
                    ></script>
                    <main>{children}</main>
                </div>
                <Footer
                    style={{
                        marginTop: '35px',
                    }}
                >
                    © {new Date().getFullYear()}, Built with ❤️ on{' '}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                    {'     '}
                </Footer>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    min-height: 100vh;
`;

const Footer = styled.footer`
    text-align: center;
    margin: 24px;
`;

export default Layout;
