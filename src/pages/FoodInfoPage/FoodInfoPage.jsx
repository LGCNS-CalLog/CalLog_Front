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
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  width: 100%;
  max-width: 584px;
  padding-bottom: 10px;
  margin: 0 auto;
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

  const [localSearchTerm, setLocalSearchTerm] = useState(urlKeyword || "");
  // const sampleFood = {
  //   id: 1,
  //   name: "닭가슴살",
  //   defaultAmount: 100,
  //   carbohydrate: 0,
  //   protein: 23,
  //   fat: 1.5,
  //   kcal: 110,
  // };

  return (
    <ViewNewsPageWrapper>
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
