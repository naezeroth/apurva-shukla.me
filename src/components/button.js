import React from 'react';
import styled from 'styled-components';

const Button = props => {
    return <ButtonWrapper props={props}>{props.children}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
    display: block;
    border: none;
    text-align: center;
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px 25px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;

    background: ${props => {
        return props.props.background || 'var(--button)';
    }};
    color: ${props => {
        return props.props.color || 'var(--bg)';
    }};
    font-size: ${props => {
        return props.props.fontSize || '15px';
    }};
    font-weight: ${props => {
        return props.props.fontWeight || '600';
    }};
    border-radius: ${props => {
        return props.props.radius || '6px';
    }};
    margin-top: ${props => {
        return props.props.marginTop;
    }};
    margin-bottom: ${props => {
        return props.props.marginBottom;
    }};
    margin-right: ${props => {
        return props.props.marginRight;
    }};

    &:hover {
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.25);
    }
`;

export default Button;
