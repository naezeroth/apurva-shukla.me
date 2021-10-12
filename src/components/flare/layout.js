/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import background from './images/background.svg';

import Footer from './footer';
import './default.css';

const Layout = ({ children }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={data => (
            <>
                <div
                    style={{
                        padding: '0 1rem',
                        backgroundImage: `url(${background})`,
                    }}
                >
                    <main>{children}</main>
                    <Footer siteTitle={data.site.siteMetadata.title} />
                </div>
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
