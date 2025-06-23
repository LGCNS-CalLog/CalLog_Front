import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faBars,
  faSignOutAlt,
  faUserCircle,
  faBookmark,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import Callog from "../../assets/Callog.png";
import { useSelector, useDispatch } from "react-redux";
import useMobileDetect from "../../hook/useMobileDetect";
import { logoutUsingToken } from "../../redux/Token/tokenSlice";

// ================== Constants ==================
const HEADER_HEIGHT = "68px";

// ================== Styled Components ==================
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: ${HEADER_HEIGHT};
  padding: 0 1rem;
`;

const Container = styled.div`
  max-width: 1280px;
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
  color: #1f2937;
  &:hover {
    color: #3b82f6;
  }
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const UserActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  &:hover {
    color: #3b82f6;
    background-color: #f3f4f6;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  width: 200px;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 0.25rem 0;
  border: 1px solid #e5e7eb;
  z-index: 60;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
  svg {
    margin-right: 0.5rem;
  }
`;

const ActionButton = styled.button`
  padding: 0 16px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out, box-shadow 0.25s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  line-height: 1.25;
  min-height: 38px;
  user-select: none;

  ${({ primary }) =>
    primary
      ? `
    background-color: #1A73E8;
    color: white;
    border: 1px solid transparent;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    &:hover {
      background-color: #185ABC;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    &:active {
      background-color: #174EA6;
      box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(26,115,232,0.4);
    }
  `
      : `
    background-color: white;
    color: #1A73E8;
    border: 1px solid #DADCE0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    &:hover {
      background-color: #f8f9fa;
      border-color: #c6c9cc;
    }
    &:active {
      background-color: #f1f3f4;
      border-color: #b0b3b6;
    }
    &:focus-visible {
      border-color: #1A73E8;
      box-shadow: 0 0 0 3px rgba(26,115,232,0.3);
    }
  `}
`;

// ================== Main Component ==================
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const isMobile = useMobileDetect();
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  //const nickname = useSelector((state) => state.auth.nickname);
  const nickname = "형균";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onNavigate = (path) => {
    navigate(path);
  };

  const onLogin = () => {
    navigate("/login");
  };

  const onLogout = () => {
    dispatch(logoutUsingToken());
    navigate("/");
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <HeaderWrapper>
      <Container>
        <LogoLink onClick={() => onNavigate("/")}>
          <img
            src={Callog}
            style={{ width: "30px", height: "30px" }}
            alt="logo"
          />
          <LogoText>CalLog</LogoText>
        </LogoLink>

        <UserActionsWrapper ref={dropdownRef}>
          {isAuthenticated ? (
            <>
              <UserButton onClick={toggleDropdown}>
                {isMobile ? (
                  <FontAwesomeIcon icon={faBars} size="lg" />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUser} />
                    <span>{nickname}님 환영합니다</span>
                  </>
                )}
              </UserButton>

              {isDropdownOpen && (
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      onNavigate("/my-page");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faUserCircle} />
                    마이 페이지
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      onNavigate("/logout");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    로그아웃
                  </DropdownItem>
                </DropdownMenu>
              )}
            </>
          ) : (
            <ActionButton onClick={onLogin}>
              <FontAwesomeIcon icon={faSignInAlt} />
              로그인
            </ActionButton>
          )}
        </UserActionsWrapper>
      </Container>
    </HeaderWrapper>
  );
};

// 헤더 높이 상수도 함께 export (다른 곳에서 레이아웃 계산 시 유용)
export { HEADER_HEIGHT };
export default Header;
