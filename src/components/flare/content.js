import React from 'react';

import feature from './images/feature.png';
import SectionHeader from './section-header';
import { COLORS } from './constants';

const Content = () => (
    <div style={{ padding: '1rem 1rem', textAlign: 'center' }}>
        <SectionHeader
            title="Minimal Features"
            description="Don't spend time ripping out unneeded plugins and bloat."
        />
    </div>
);

export default Content;
