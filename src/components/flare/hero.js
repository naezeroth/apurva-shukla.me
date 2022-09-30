import React from 'react';
import PropTypes from 'prop-types';
import MockupContent from './video';

const Hero = ({ siteTitle }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '4rem 1rem',
        }}
    >
        <h1 style={{ textAlign: 'center' }}>Flare</h1>
        <h2 style={{ textAlign: 'center' }}>Vocabulary Builder</h2>
        <div
            style={{
                marginBottom: 40,
                marginTop: 20,
                // width: '250px',
                height: '600px',
                position: 'relative',
            }}
        >
            <MockupContent />
        </div>
        <a
            // eslint-disable-next-line max-len
            href="https://play.google.com/store/apps/details?id=me.apurva_shukla.flare&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            style={{
                display: 'inline-block',
                overflow: 'hidden',
                width: 250,
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <img
                alt="Get it on Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                style={{ width: 250 }}
            />
        </a>
        <a
            href="https://apps.apple.com/us/app/flare-vocabulary-builder/id1585958827?itsct=apps_box_badge&amp;itscg=30200"
            style={{
                display: 'inline-block',
                overflow: 'hidden',
                borderRadius: 13,
                width: 220,
                height: 83,
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <img
                // eslint-disable-next-line max-len
                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1633305600&h=bdba220695a62bcd91d5f68cd36c4d57"
                alt="Download on the App Store"
                style={{ borderRadius: 13, width: 250, height: 83 }}
            />
        </a>
    </div>
);

Hero.propTypes = {
    siteTitle: PropTypes.string,
};

Hero.defaultProps = {
    siteTitle: '',
};

export default Hero;
