// SearchInput.js
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 584px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  box-shadow: none;
  height: 44px;

  &:hover,
  &:focus-within {
    border-color: rgba(223, 225, 229, 0);
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }
`;

const StyledInput = styled.input`
  flex-grow: 1;
  height: 100%;
  padding: 0 20px 0 20px;
  font-size: 16px;
  color: #202124;
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 24px;
  padding-right: 50px;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  border-radius: 0 24px 24px 0;
  color: #70757a;
  &:hover {
    color: #333;
  }
`;

const MainSearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = "검색 또는 URL 입력",
}) => {
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <SearchContainer>
      <StyledInput
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        aria-label="검색"
      />
      <SearchButton onClick={handleSearch} aria-label="검색 실행">
        <FontAwesomeIcon icon={faSearch} /> {/* Font Awesome 아이콘 사용 */}
      </SearchButton>
    </SearchContainer>
  );
};

export default MainSearchInput;
