import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가
import Logo from "../../assets/calog.png";

const HEADER_HEIGHT = "68px";

// Styled Components 정의
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: ${HEADER_HEIGHT};
  padding: 0 1rem; /* 양 옆 패딩 */
`;

const Container = styled.div`
  max-width: 1280px; /* 최대 너비 */
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  img {
    height: ${HEADER_HEIGHT};
  }
  background-color: white;
  color: #1f2937; // text-gray-800
  &:hover {
    color: #3b82f6; // hover:text-blue-600 (예시)
  }
`;

const LogoText = styled.span`
  font-size: 1.25rem; // text-xl
  font-weight: bold;
`;

// Header 컴포넌트
const Header = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogoClick = () => {
    navigate("/"); // 로고 클릭 시 홈 페이지로 이동
  };

  return (
    <HeaderWrapper>
      <Container>
        <LogoLink onClick={handleLogoClick}>
          <img src={Logo} alt="logo" />
          <LogoText>Calog</LogoText>
        </LogoLink>
      </Container>
    </HeaderWrapper>
  );
};

export { HEADER_HEIGHT };
export default Header;
