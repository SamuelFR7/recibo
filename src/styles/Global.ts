import styled, { createGlobalStyle } from 'styled-components'
import { theme } from './Theme'

const GlobalStyle = createGlobalStyle`
    *, #__next {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%
        }
        @media (max-width: 720px) {
            font-size: 87.5%
        }
    }

    body {
        background-color: ${theme.colors.bg};
        color: ${theme.colors.text}
    }

    body, input, textarea, button, select {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
        color: black;
    }

    .react-modal-overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content {
        width: 100%;
        max-width: 576px;
        background: #F0F2F5;
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;
    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.8);
        }
    }
`

const Container = styled.div`
  display: flex;
  height: 100vh;
  margin: 0 auto;
`

export { GlobalStyle, Container }
