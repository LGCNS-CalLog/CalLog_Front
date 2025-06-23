import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

import { FoodInfoCard } from "../FoodInfoCard/FoodInfoCard";
import FoodInfoCardSkeleton from "../FoodInfoCardSkeleton/FoodInfoCardSkeleton";
import { useSelector, useDispatch } from "react-redux";

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: 0 auto;
`;

const NEWS_START_INDEX = 1;
const NEWS_DISPLAY_INDEX = 10;
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

  const [start, setStart] = useState(NEWS_START_INDEX);
  const dispatch = useDispatch();
  const prevKeywordRef = useRef(null);
  const keywordFetchTimeoutRef = useRef(null);

  const fetchNewsData = async (isKeywordSearch = false) => {
    if (!currentKeywordFromStore) {
      return;
    }

    if (keywordFetchTimeoutRef.current) {
      clearTimeout(keywordFetchTimeoutRef.current);
    }

    const currentOffset = isKeywordSearch ? NEWS_START_INDEX : start;

    try {
      const newsAction = await dispatch(
        getNewsByParam({
          keyword: currentKeywordFromStore,
          offset: currentOffset,
          limit: NEWS_DISPLAY_INDEX,
        })
      );

      if (getNewsByParam.fulfilled.match(newsAction)) {
        if (isAuthenticated) {
          keywordFetchTimeoutRef.current = setTimeout(() => {
            dispatch(getKeywordList());
            keywordFetchTimeoutRef.current = null;
          }, KEYWORD_FETCH_DELAY);
        } else {
        }
      } else if (getNewsByParam.rejected.match(newsAction)) {
      }
    } catch (error) {}

    if (isKeywordSearch) {
      setStart(NEWS_START_INDEX + NEWS_DISPLAY_INDEX);
    } else {
      setStart((prev) => prev + NEWS_DISPLAY_INDEX);
    }
  };

  useEffect(() => {
    if (
      currentKeywordFromStore &&
      currentKeywordFromStore !== prevKeywordRef.current
    ) {
      dispatch(resetNewsState());
      dispatch(resetKeywordState()); // 추천 키워드 상태 초기화
      setStart(NEWS_START_INDEX);
      fetchNewsData(true);
      prevKeywordRef.current = currentKeywordFromStore;
    } else if (!currentKeywordFromStore && prevKeywordRef.current) {
      dispatch(resetNewsState());
      dispatch(resetKeywordState()); // 추천 키워드 상태 초기화
      prevKeywordRef.current = null;
      setStart(NEWS_START_INDEX);
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
      fetchNewsData(false);
    }
  };

  // 이 컴포넌트의 로더는 뉴스 로딩에만 관여
  const showNewsLoader = foodInfoStatus === "loading";

  return (
    <>
      <InfiniteScroll
        dataLength={foodList.length}
        next={loadMoreNews}
        hasMore={foodInfoHasMore}
        loader={
          <CardsContainer>
            <>
              {[...Array(3)].map((_, index) => (
                <FoodInfoCardSkeleton key={`news-skeleton-${index}`} />
              ))}
            </>
          </CardsContainer>
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
        <CardsContainer>
          {foodList.map((item, index) => (
            <FoodInfoCard key={index} newsItem={item} />
          ))}
        </CardsContainer>
      </InfiniteScroll>
    </>
  );
};

export default InfiniteScrollController;
