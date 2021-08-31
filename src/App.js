import React, { useState } from "react";
import TaxButton from "./components/TaxButton";
import ModalWindow from "./components/ModalWindow";
import styled from "styled-components";
import GlobalStyle from "./styles/globalStyle";
import ModalContent from "./components/ModalContent";

const WelcomeWindow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`

function App() {
  const [modalWindowActive, setModalWindowActive] = useState(false);

  return (
      <div>
          <GlobalStyle/>
          <WelcomeWindow>
              <TaxButton onClick={() => setModalWindowActive(true)}/>
              <ModalWindow active={modalWindowActive} onClick={() => setModalWindowActive(false)}>
                  <ModalContent onClick={() => setModalWindowActive(false)}/>
              </ModalWindow>
          </WelcomeWindow>
      </div>
  );
}

export default App;
