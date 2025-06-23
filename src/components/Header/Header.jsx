import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate 훅 추가
import Logo from "../../assets/calog.png";
import { useSelector, useDispatch } from "react-redux";
import useMobileDetect from "../../hook/useMobileDetect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faBars,
  faFeatherAlt, // 사용되지 않으므로 주석 처리 또는 제거 가능
  faSignOutAlt,
  faUserCircle,
  faBookmark,
  faSignInAlt, // 로그인 아이콘 추가 (필요시 사용)
} from "@fortawesome/free-solid-svg-icons";

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

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem); // 버튼 바로 아래
  width: 200px;
  background-color: white;
  border-radius: 0.375rem; // rounded-md
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05); // shadow-xl
  padding: 0.25rem 0; // py-1
  border: 1px solid #e5e7eb;
  z-index: 60;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem; // px-4 py-2
  font-size: 0.875rem; // text-sm
  color: #374151; // text-gray-700
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6; // hover:bg-gray-100
  }
  svg {
    margin-right: 0.5rem;
  }
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem; // text-sm
  font-weight: 500; // font-medium
  color: #374151; // text-gray-700
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem; // rounded-md
  &:hover {
    color: #3b82f6; // hover:text-blue-600
    background-color: #f3f4f6; // hover:bg-gray-100
  }
`;

const Container = styled.div`
  max-width: 1280px; /* 최대 너비 */
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  padding: 0 16px;
  font-size: 0.875rem; /* 14px */
  font-weight: 600; /* 기존 500 (Medium) -> 600 (Semi-bold) 변경 */
  border-radius: 8px; /* 기존 4px -> 8px 변경으로 좀 더 부드러운 모서리 */
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out, box-shadow 0.25s ease-in-out; /* box-shadow transition 추가 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem; /* 기존 0.5rem -> 0.6rem 아이콘과 텍스트 간격 약간 증가 */
  line-height: 1.25;
  min-height: 38px; /* 기존 36px -> 38px 최소 높이 약간 증가 */
  text-align: center;
  vertical-align: middle;
  user-select: none;
  outline: none; /* 포커스 아웃라인은 focus-visible로 관리 */

  svg {
    font-size: 1.1em; /* 기존 1.125em, 약간의 크기 조정 여지 */
  }

  ${({ primary }) =>
    primary
      ? `
    background-color: #1A73E8; /* Google Blue */
    color: white;
    border: 1px solid transparent;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* 기본 상태에 미세한 그림자 추가 */

    &:hover {
      background-color: #185ABC; /* 호버 시 약간 어둡게 */
      box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1); /* 호버 시 그림자 강화 */
    }
    &:active {
      background-color: #174EA6; /* 클릭 시 더 어둡게 */
      box-shadow: 0 1px 2px rgba(0,0,0,0.15); /* 활성 시 그림자 */
    }
    &:focus-visible { /* 키보드 포커스 시에만 아웃라인 표시 */
      outline: none;
      box-shadow: 0 0 0 3px rgba(26,115,232,0.4); /* Google 스타일 포커스 링 */
    }
  `
      : `
    background-color: white; /* 명시적인 흰색 배경 */
    color: #1A73E8; /* Google Blue 텍스트 */
    border: 1px solid #DADCE0; /* Google의 연회색 테두리 */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03); /* 기본 상태에 매우 미세한 그림자 */

    &:hover {
      background-color: #f8f9fa; /* 호버 시 매우 연한 회색 배경 (Google 스타일) */
      border-color: #c6c9cc; /* 호버 시 테두리 색 약간 진하게 */
      box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07); /* 호버 시 그림자 추가 */
    }
    &:active {
      background-color: #f1f3f4; /* 클릭 시 배경색 */
      border-color: #b0b3b6;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    &:focus-visible { /* 키보드 포커스 시에만 아웃라인 표시 */
      outline: none;
      border-color: #1A73E8; /* 포커스 시 테두리 색 강조 */
      box-shadow: 0 0 0 3px rgba(26,115,232,0.3); /* Google 스타일 포커스 링, 투명도 약간 조정 */
    }
  `}
`;

const UserActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative; /* 드롭다운 기준점 */
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
    color: #94bcc0; // hover:text-blue-600 (예시)
  }
`;

const LogoText = styled.span`
  font-size: 1.25rem; // text-xl
  font-weight: bold;
`;

// Header 컴포넌트
const Header = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const onNavigate = (url) => {
    navigate(url);
  };
  const handleLogoClick = () => {
    navigate("/"); // 로고 클릭 시 홈 페이지로 이동
  };
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  const dropdownRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated); // 이 상태는 isAuthenticated로 대체 가능해 보입니다.
  const isMobile = useMobileDetect();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const onLogin = () => {
    //setIsLoggedIn(true); // 추후 변경

    navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <HeaderWrapper>
      <Container>
        <LogoLink onClick={handleLogoClick}>
          <img src={Logo} alt="logo" />
          <LogoText>CalLog</LogoText>
        </LogoLink>

        <UserActionsWrapper ref={dropdownRef}>
          {isLoggedIn ? ( // isAuthenticated를 직접 사용하는 것이 더 명확할 수 있습니다.
            <>
              <UserButton onClick={toggleDropdown}>
                {isMobile ? (
                  <FontAwesomeIcon icon={faBars} size="lg" />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUser} />
                    <span> 형균님 환영합니다</span>
                    {/* <span> {nickname}님 환영합니다</span> */}
                  </>
                )}
              </UserButton>
              {isDropdownOpen && (
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      onLogout();
                      setIsDropdownOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    로그아웃
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      onNavigate("/my-page");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faUserCircle} />
                    마이 페이지
                  </DropdownItem>
                </DropdownMenu>
              )}
            </>
          ) : (
            <ActionButton onClick={onLogin}>
              {/* <FontAwesomeIcon icon={faSignInAlt} />  로그인 아이콘 추가 예시 */}
              로그인
            </ActionButton>
          )}
        </UserActionsWrapper>
      </Container>
    </HeaderWrapper>
  );
};

export { HEADER_HEIGHT };
export default Header;
