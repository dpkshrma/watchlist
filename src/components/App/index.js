import React from 'react';
import styled from 'styled-components';
import 'react-select/dist/react-select.css';
import bg from './bg.jpg';

const BackgroundLayer = styled.div`
  background: url(${bg});
`;

const Overlay = styled.div`
  background: rgba(0,0,0,0.8);
`

const App = ({ children }) => {
  return (
    <BackgroundLayer>
      <Overlay>
        {children}
      </Overlay>
    </BackgroundLayer>
  )
};

export default App;
