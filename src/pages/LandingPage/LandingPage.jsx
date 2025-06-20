import React from "react";
import styled from "styled-components";
import Callog from "../../assets/Callog.png";

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  padding: 20px;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    padding: 10px;
  }
`;

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <StyledImage src={Callog} alt="Callog Logo" />
    </LandingPageContainer>
  );
};

export default LandingPage;
