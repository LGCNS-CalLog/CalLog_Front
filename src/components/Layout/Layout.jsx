// Layout.js
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Header, { HEADER_HEIGHT } from "../Header/Header";
import { useParams } from "react-router-dom";
const theme = {
  maxWidth: "1200px",
};
const AppWrapper = styled.div`
  /* min-height: 100vh; */
  padding-top: ${HEADER_HEIGHT};
  margin: 0 auto;
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 1024px) {
    max-width: 960px;
  }
  width: 100%;
`;

const LayoutContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  height: 100%;
`;

const MainContent = styled.main`
  padding: 20px; /* 콘텐츠 내부의 패딩 */
  min-height: calc(100vh - ${HEADER_HEIGHT});
  height: 100%;
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <AppWrapper>
        <LayoutContainer>
          <MainContent>{children}</MainContent>
        </LayoutContainer>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default Layout;
