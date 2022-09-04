import React from 'react'
import Styled from "styled-components";

// Components
import Header from "./header";

//Style
const Container = Styled.div`
    height: 90vh;
`;

const Main = Styled.main `
  background: #fafafa;
  padding: 30px;
  overflow: hidden;
`

function Layout({ children }) {
  return (
    <>
      <Header />
      <Container>
        <Main>{children}</Main>
      </Container>
    </>
  );
}

export default React.memo(Layout)