import React from 'react';
import styled from 'styled-components';

function Button(props) {
  return <ButtonWrapper props={props}>{props.children}</ButtonWrapper>;
}

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

    background: ${(props) => props.props.background || 'var(--button)'};
    color: ${(props) => props.props.color || 'var(--bg)'};
    font-size: ${(props) => props.props.fontSize || '15px'};
    font-weight: ${(props) => props.props.fontWeight || '600'};
    border-radius: ${(props) => props.props.radius || '6px'};
    margin-top: ${(props) => props.props.marginTop};
    margin-bottom: ${(props) => props.props.marginBottom};
    margin-right: ${(props) => props.props.marginRight};

    &:hover {
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.25);
    }
`;

export default Button;
