import React from 'react';
import { Email } from './social-icons';

export const SubscribeButton = () => (
    <a
        style={{
            backgroundColor: 'var(--emailButton)',
            display: 'inline-flex',
            border: 'solid 1px var(--emailButton)',
            fontWeight: '700',
            boxShadow: 'none',
            borderRadius: '4px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px 5px',
            cursor: 'pointer',
            color: 'var(--rssNormal)',
            marginRight: '10px',
        }}
        href="https://listmonk.apurva-shukla.me/subscription/form"
        target="_blank"
        rel="noreferrer"
    >
        <Email width="24" height="24" viewBox="0 0 24 24" />
        <span
            style={{
                boxShadow: 'none',
                paddingLeft: '5px',
                color: 'var(--rssNormal)',
            }}
        >
            Subscribe
        </span>
    </a>
);
