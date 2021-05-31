import React from 'react';
import { Rss } from './social-icons';

export const RssButton = () => (
    <a
        style={{
            backgroundColor: '#ff9600',
            display: 'inline-flex',
            border: 'solid 1px #fbc500fa',
            fontWeight: '700',
            boxShadow: 'none',
            borderRadius: '4px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px 5px',
            cursor: 'pointer',
            color: 'var(--rssNormal)',
        }}
        href="https://apurva-shukla.me/rss.xml"
        target="_blank"
        rel="noreferrer"
    >
        <Rss />
        <span
            style={{
                boxShadow: 'none',
                paddingLeft: '5px',
                color: 'var(--rssNormal)',
            }}
        >
            Follow RSS
        </span>
    </a>
);
