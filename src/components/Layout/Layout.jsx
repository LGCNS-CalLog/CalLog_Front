// Layout.js
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Header, { HEADER_HEIGHT } from "../Header/Header";
import { useParams } from "react-router-dom";
const theme = {
  maxWidth: "1200px",
};

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${HEADER_HEIGHT};
  margin: 0 auto;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 840px;
  }

  @media (min-width: 1024px) {
    max-width: 1140px;
  }

  @media (min-width: 1440px) {
    max-width: 1280px;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  height: 100%;
  width: 100%;
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  height: 100%;
  width: 100%;
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
