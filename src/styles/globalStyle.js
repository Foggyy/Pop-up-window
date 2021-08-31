import {createGlobalStyle} from "styled-components";
import "../fonts/style.css"

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        font-family: "Lab Grotesque",serif;
    }
    
    body, html {
        height: 100%;
        background: linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56;
        color: #FFFFFF;
    }
`;

export default GlobalStyle;