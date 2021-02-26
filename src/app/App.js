import styled from 'styled-components'
import React from 'react'

const AppContainer = styled.div`
  background-color: #eee8e1;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  font-family: 'Arvo', Arial, sans-serif;
`
const App = () => (
  <AppContainer>
    <h1>Gestion contrat</h1>
  </AppContainer>
)

export default App
