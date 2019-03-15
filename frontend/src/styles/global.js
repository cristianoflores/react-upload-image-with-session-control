/*
    Estilizações globais da aplicação
*/

import { createGlobalStyle } from 'styled-components';

import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle `
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        background: #7159c1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothig: antialiased;
    }

    html, border-style, #root {
        height: 100%;
    }
`;