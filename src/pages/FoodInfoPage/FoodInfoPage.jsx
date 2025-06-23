import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import useMobileDetect from "../../hook/useMobileDetect";
import { useParams, useNavigate } from "react-router-dom";
import InfiniteScrollController from "../../components/InfiniteScrollController/InfiniteScrollController";
import MainSearchInput from "../../components/MainSearchInput/MainSearchInput";

import { FoodInfoCard } from "../../components/FoodInfoCard/FoodInfoCard";

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
  const handleInputChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };
  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/foodInfo/${trimmedQuery}`);
    }
  };
  const [localSearchTerm, setLocalSearchTerm] = useState(urlKeyword || "");

  // 예시로 foodItem을 상태로 정의
  const foodItem = {
    title: "음식 이름",
    description: "총 칼로리: 10kcal, 단백질: 10g, 지방: 10g, 탄수화물: 10g",
  };

  return (
    <>
      <ViewNewsPageWrapper>
        <SearchInputWrapper>
          <MainSearchInput
            value={localSearchTerm}
            onChange={handleInputChange}
            onSearch={handleSearch}
            placeholder="음식을 검색하세요"
          />
        </SearchInputWrapper>

        <FoodInfoCard foodItem={foodItem} />
        <FoodInfoCard foodItem={foodItem} />
        <FoodInfoCard foodItem={foodItem} />

        <InfiniteScrollController />
      </ViewNewsPageWrapper>
    </>
  );
};

export default FoodInfoPage;
