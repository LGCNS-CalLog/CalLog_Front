import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { FoodInfoCard } from "../FoodInfoCard/FoodInfoCard";
import FoodInfoCardSkeleton from "../FoodInfoCardSkeleton/FoodInfoCardSkeleton";
import { useSelector, useDispatch } from "react-redux";

import {
  getfoodInfoByParam,
  resetFoodInfoState,
} from "../../redux/foodInfo/foodInfoSlice";

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 한 줄에 3개
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const INFO_START_INDEX = 1;
const INFO_DISPLAY_INDEX = 10;
const KEYWORD_FETCH_DELAY = 1750; // 1.75초 지연

const InfiniteScrollController = () => {
  const currentKeywordFromStore = useSelector(
    (state) => state.keyword.searchText
  );

  // newsSlice의 status와 hasMore를 newsStatus, newsHasMore로 명확히 구분
  const {
    foodList,
    status: foodInfoStatus,
    hasMore: foodInfoHasMore,
  } = useSelector((state) => state.foodInfo);
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);

  const [start, setStart] = useState(INFO_START_INDEX);
  const dispatch = useDispatch();
  const prevKeywordRef = useRef(null);
  const keywordFetchTimeoutRef = useRef(null);

  const fetchFoodData = async (isKeywordSearch = false) => {
    if (!currentKeywordFromStore) {
      return;
    }

    if (keywordFetchTimeoutRef.current) {
      clearTimeout(keywordFetchTimeoutRef.current);
    }

    const currentOffset = isKeywordSearch ? INFO_START_INDEX : start;

    try {
      const infoAction = await dispatch(
        getfoodInfoByParam({
          keyword: currentKeywordFromStore,
          offset: currentOffset,
          limit: INFO_DISPLAY_INDEX,
        })
      );

      if (getfoodInfoByParam.fulfilled.match(infoAction)) {
        if (isAuthenticated) {
          keywordFetchTimeoutRef.current = setTimeout(() => {
            dispatch(getKeywordList());
            keywordFetchTimeoutRef.current = null;
          }, KEYWORD_FETCH_DELAY);
        } else {
        }
      } else if (getfoodInfoByParam.rejected.match(infoAction)) {
      }
    } catch (error) {}

    if (isKeywordSearch) {
      setStart(INFO_START_INDEX + INFO_DISPLAY_INDEX);
    } else {
      setStart((prev) => prev + INFO_DISPLAY_INDEX);
    }
  };

  useEffect(() => {
    if (
      currentKeywordFromStore &&
      currentKeywordFromStore !== prevKeywordRef.current
    ) {
      if (keywordFetchTimeoutRef.current) {
        clearTimeout(keywordFetchTimeoutRef.current);
      }
      keywordFetchTimeoutRef.current = setTimeout(() => {
        dispatch(resetFoodInfoState());
        setStart(INFO_START_INDEX);
        fetchFoodData(true);
        prevKeywordRef.current = currentKeywordFromStore;
      }, KEYWORD_FETCH_DELAY);
    } else if (!currentKeywordFromStore && prevKeywordRef.current) {
      dispatch(resetFoodInfoState());
      prevKeywordRef.current = null;
      setStart(INFO_START_INDEX);
      if (keywordFetchTimeoutRef.current) {
        clearTimeout(keywordFetchTimeoutRef.current);
        keywordFetchTimeoutRef.current = null;
      }
    }

    return () => {
      if (keywordFetchTimeoutRef.current) {
        clearTimeout(keywordFetchTimeoutRef.current);
      }
    };
  }, [currentKeywordFromStore, dispatch]);

  const loadMoreNews = () => {
    if (foodInfoStatus !== "loading" && foodInfoHasMore) {
      fetchFoodData(false);
    }
  };

  // 이 컴포넌트의 로더는 로딩에만 관여
  const showNewsLoader = foodInfoStatus === "loading";

  return (
    <>
      <InfiniteScroll
        dataLength={foodList.length}
        next={loadMoreNews}
        hasMore={foodInfoHasMore}
        loader={
          <CardsGrid>
            {[...Array(9)].map((_, index) => (
              <FoodInfoCardSkeleton key={`news-skeleton-${index}`} />
            ))}
          </CardsGrid>
        }
        endMessage={
          foodList.length > 0 &&
          !foodInfoHasMore &&
          foodInfoStatus !== "loading" ? (
            <p style={{ textAlign: "center" }}>
              <b>더 이상 음식 정보가 없습니다.</b>
            </p>
          ) : null
        }
        scrollThreshold={"70%"}
      >
        <CardsGrid>
          {foodList.map((item, index) => (
            <FoodInfoCard key={index} foodItem={item} />
          ))}
        </CardsGrid>
      </InfiniteScroll>
    </>
  );
};

export default InfiniteScrollController;
