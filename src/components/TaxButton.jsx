import React from "react";
import styled from "styled-components";

const Button = styled.button`
    display: flex;
    align-items: center;
    padding: 16px 32px;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
    background-color: transparent;
    color: #FFFFFF;
    cursor: pointer;
    font-family: "Lab Grotesque";
    font-size: 12px;
    
    :hover{
      color: #000000;
      background-color: #FFFFFF;
      transition: 0.3s;
    }
    
    @media (min-width: 768px){
        font-size: 16px;
    }
    
    @media (min-width: 1440px){
        font-size: 16px;
    }
`

function TaxButton(props){
    return(
        <Button {...props}>
            Налоговый вычет
        </Button>
    )
}

export default TaxButton