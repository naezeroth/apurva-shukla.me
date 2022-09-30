import React from 'react';
import mp4Demo from './images/demo.mp4';
import webmDemo from './images/demo.webm';

const DemoVideo = () => (
    <video loop controls style={{ height: '100%', maxWidth: '100%' }}>
        <source src={mp4Demo} type="video/mp4" />
        <source src={webmDemo} type="video/mp4" />
    </video>
);

export default DemoVideo;
