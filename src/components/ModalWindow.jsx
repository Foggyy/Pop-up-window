import React from 'react';
import styled from "styled-components";

const ModalContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.active ? 1 : 0};
    pointer-events: ${props => props.active ? 'all' : 'none'};
    transition: 0.5s;
`

const ModalContentContainer = styled.div`
    padding: 32px 32px 32px 32px;
    width: 60vw;
    max-height: 90vh;
    max-width: 600px;
    position: relative;
    border-radius: 30px;
    color: #000000;
    background-color: #FFFFFF;
    transform: ${props => props.active ? 'scale(1)' : 'scale(0.5)'};
    transition: 0.4s all;
    overflow-y: auto;
    ::-webkit-scrollbar { display:none }
    scrollbar-width: none;
    
    @media (max-width: 560px){
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      border-radius: unset;
      padding: 32px 16px 32px 16px;
    }
`

function ModalWindow(props){

    const {active, children} = props;

    return(
        <ModalContainer active={active}>
            <ModalContentContainer active={active}>
                {children}
            </ModalContentContainer>
        </ModalContainer>
    )
}

export default ModalWindow