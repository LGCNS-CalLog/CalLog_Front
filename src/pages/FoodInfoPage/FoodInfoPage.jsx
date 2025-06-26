import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import useMobileDetect from "../../hook/useMobileDetect";
import { useParams, useNavigate } from "react-router-dom";
import InfiniteScrollController from "../../components/InfiniteScrollController/InfiniteScrollController";
import MainSearchInput from "../../components/MainSearchInput/MainSearchInput";
import { resetFoodInfoState } from "../../redux/foodInfo/foodInfoSlice";
import { FoodInfoCard } from "../../components/FoodInfoCard/FoodInfoCard";

import { setKeyword, clearKeyword } from "../../redux/keyword/keywordSlice";

import StickyMemo from "../../components/StickyMemo/StickyMemo";

const LayoutWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  padding: 0 20px;
`;

const LeftColumn = styled.div`
  width: 80%;
`;

const RightColumn = styled.div`
  width: 20%;
  position: sticky;
  top: 80px;
  height: fit-content;
  align-self: flex-start;
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 584px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const ViewNewsPageWrapper = styled.div`
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - ${"68px"} /* 헤더 높이 제외 */);
`;

const FoodInfoPage = () => {
  const navigate = useNavigate();
  const isMobile = useMobileDetect();
  const { keyword: urlKeyword } = useParams();

  const mealInput = useSelector((state) => state.mealInput);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/foodInfo/${trimmedQuery}`);
    }
  };

  // Effect 1: urlKeyword 변경에 따른 Redux 상태 동기화 및 UI 업데이트
  useEffect(() => {
    window.scrollTo(0, 0);
    if (urlKeyword) {
      dispatch(resetFoodInfoState());
      dispatch(setKeyword(urlKeyword));
      setLocalSearchTerm(urlKeyword);
    } else {
      dispatch(clearKeyword());
      dispatch(resetFoodInfoState());
      setLocalSearchTerm("");
    }
  }, [dispatch, urlKeyword]);

  // Effect 2: 컴포넌트 언마운트 시 전역 키워드 정리
  useEffect(() => {
    return () => {
      dispatch(clearKeyword());
    };
  }, [dispatch]);
  const handleInputChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleMoveToDietPage = () => {
    navigate(`/day/diet/${mealInput.selectedDate}`);
  };

  const [localSearchTerm, setLocalSearchTerm] = useState(urlKeyword || "");

  return (
    <ViewNewsPageWrapper>
      <BackButton onClick={handleMoveToDietPage}>← 뒤로 가기</BackButton>
      <LayoutWrapper>
        <LeftColumn>
          <SearchInputWrapper>
            <MainSearchInput
              value={localSearchTerm}
              onChange={handleInputChange}
              onSearch={handleSearch}
              placeholder="음식을 검색하세요"
            />
          </SearchInputWrapper>
          <InfiniteScrollController />
        </LeftColumn>

        <RightColumn>
          <StickyMemo />
        </RightColumn>
      </LayoutWrapper>
    </ViewNewsPageWrapper>
  );
};

export default FoodInfoPage;
