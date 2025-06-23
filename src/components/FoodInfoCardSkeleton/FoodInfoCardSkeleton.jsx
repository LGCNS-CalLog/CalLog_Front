import React from "react";
import styled, { keyframes } from "styled-components";

// shimmer 애니메이션
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// 공통 스켈레톤 스타일
const SkeletonElement = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

// 카드 래퍼
const SkeletonCardWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  margin-top: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// 썸네일 영역
const SkeletonThumbnailWrapper = styled(SkeletonElement)`
  width: 100%;
  height: 200px;
  border-radius: 16px 16px 0 0;

  @media (min-width: 768px) {
    width: 280px;
    min-width: 280px;
    height: 100%;
    border-radius: 16px 0 0 16px;
  }
`;

// 본문 영역
const SkeletonContentArea = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 28px;
  }
`;

// 제목 스켈레톤
const SkeletonTitle = styled(SkeletonElement)`
  width: 80%;
  height: 1.4rem;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    height: 1.6rem;
    margin-bottom: 16px;
  }
`;

// 설명 스켈레톤 줄
const SkeletonDescriptionLine = styled(SkeletonElement)`
  height: 0.95rem;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    height: 1rem;
  }
`;

const SkeletonDescription = styled.div`
  .desktop-only {
    display: none;
  }

  @media (min-width: 768px) {
    .desktop-only {
      display: block;
    }
  }
`;

// 날짜 / 스크랩 버튼 있는 하단
const SkeletonFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: 20px;
  }
`;

const SkeletonPublishDate = styled(SkeletonElement)`
  width: 30%;
  height: 0.8rem;

  @media (min-width: 768px) {
    height: 0.85rem;
  }
`;

const SkeletonScrapButton = styled(SkeletonElement)`
  width: 80px;
  height: 36px;
  border-radius: 20px;

  @media (min-width: 768px) {
    width: 100px;
    height: 44px;
  }
`;

const FoodInfoCardSkeleton = () => {
  return (
    <SkeletonCardWrapper>
      <SkeletonThumbnailWrapper />
      <SkeletonContentArea>
        <div>
          <SkeletonTitle />
          <SkeletonDescription>
            <SkeletonDescriptionLine style={{ width: "100%" }} />
            <SkeletonDescriptionLine style={{ width: "90%" }} />
            <SkeletonDescriptionLine style={{ width: "70%" }} />
            <SkeletonDescriptionLine
              className="desktop-only"
              style={{ width: "60%" }}
            />
          </SkeletonDescription>
        </div>
      </SkeletonContentArea>
    </SkeletonCardWrapper>
  );
};

export default FoodInfoCardSkeleton;
