import React from 'react';
import PropTypes from 'prop-types';

import Button from './button';
import headerImage from './images/header.png';
import MockupContent from './image';
import mockupFrame from './images/mockup-frame.png';
import background from './images/background.svg';
import Video from './images/combined.mp4';
import styled from 'styled-components';

const Hero = ({ siteTitle }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '4rem 1rem',
        }}
    >
        <h1 style={{ textAlign: 'center' }}>Flare: Vocabulary Builder</h1>
        <p style={{ textAlign: 'center', maxWidth: 440 }}>
            This landing page looks great on all devices and is minimal in
            design. Add what you want and deploy.
        </p>
        <div
            style={{
                position: 'relative',
                paddingTop: 25,
                // paddingBottom
                // height: 0,
            }}
        >
            <iframe
                width="633"
                height="1020"
                src="https://www.youtube.com/embed/HQmmM_qwG4k"
                frameborder="0"
                allowfullscreen
                style={{
                    boxSizing: 'border-box',
                    background:
                        'url(https://juliamenndez.com/wp-content/uploads/mobile-frame.png) center center no-repeat',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            ></iframe>
        </div>
        <div
            style={{
                marginBottom: 60,
                // width: 500,
                // position: 'absolute',
                // background: 'black',
                alignSelf: 'center',
                // background: `url(${mockupFrame}) no-repeat top left transparent`,
                zIndex: 100,
                // background: `url(https://juliamenndez.com/wp-content/uploads/mobile-frame.png) no-repeat top left transparent`,
            }}
        >
            {/* <img src={mockupFrame} /> */}
            {/* <div style={{ clipPath: 'inset(0% 1% 2% 5%)' }}> */}
            {/* <MockupContent /> */}
            <div
                style={{
                    // borderWidth: 10,
                    // borderColor: 'black',
                    // border: `10px solid black`,
                    // borderBottom: ,
                    borderRadius: 10,
                    height: 530,
                    width: 270,
                }}
            >
                <video
                    src={Video}
                    type="video/mp4"
                    controls
                    autoplay
                    loop
                    width="250"
                    style={{
                        // alignSelf: 'center',
                        // marginLeft: 15,
                        // marginTop: 25,
                        zIndex: -100,
                        // marginRight: 10,
                        // position: 'absolute',
                    }}
                ></video>
            </div>
            {/* </div> */}
            {/* <div
                style={{
                    position: 'absolute',
                    width: '250px',
                    top: 0,
                }}
            >
                <img
                    src={mockupFrame}
                    alt="outlines of shapes and confetti in the background "
                /> */}
            {/* <video src={Video} type="video/mp4" controls></video> */}
            {/* </div> */}
        </div>
        {/* <video src={Video} type="video/mp4" controls></video>
        <video controls>
            <source src={Video} type="video/mp4" style={{}} />
        </video> */}
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

const VideoContainer = styled.div`
    background: url(./images/mockup-frame.png);
`;

export default Hero;
