import React from 'react';
import PropTypes from 'prop-types';

import { COLORS } from './constants';

const Footer = ({ siteTitle }) => (
    <footer
        style={{
            padding: '1rem',
            // backgroundColor: COLORS.lightGray,
        }}
    >
        <div
            style={{
                display: 'grid',
                alignItems: 'center',
                justifyContent: 'space-between',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 240px))',
                padding: '1rem 2rem',
                fontSize: '.85rem',
            }}
        >
            <div style={{ color: COLORS.blue, fontWeight: 700 }}>
                <a
                    style={{ textDecoration: 'none', boxShadow: 'none' }}
                    href="mailto:flare@apurva-shukla.me"
                >
                    Contact Us
                </a>
            </div>
            <div style={{ color: COLORS.blue, fontWeight: 700 }}>
                <a
                    style={{ textDecoration: 'none', boxShadow: 'none' }}
                    href="/"
                >
                    © {new Date().getFullYear()} {siteTitle}
                </a>
            </div>
        </div>
    </footer>
);

Footer.propTypes = {
    siteTitle: PropTypes.string,
};

Footer.defaultProps = {
    siteTitle: '',
};

export default Footer;
