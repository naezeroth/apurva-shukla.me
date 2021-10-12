import React from 'react';

import { COLORS, BORDER_RADIUS, GRADIENT } from './constants';
import './button.css';

const Button = ({ children }) => (
    <button
        style={{
            padding: '.5rem 2.5rem',
            color: COLORS.lightWhite,
            fontWeight: 700,
            background: GRADIENT,
            borderRadius: BORDER_RADIUS,
            borderWidth: 0,
            cursor: 'pointer',
        }}
    >
        {children}
    </button>
);

export default Button;
