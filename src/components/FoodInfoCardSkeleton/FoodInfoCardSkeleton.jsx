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

const SkeletonElement = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

// 정사각형 카드 스타일
const SquareSkeletonCard = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #ffffff;
  border-radius: 1rem;
  border: 2px solid #e5e7eb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// 아이콘 영역
const SkeletonIcon = styled(SkeletonElement)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 0.75rem;
`;

// 제목
const SkeletonTitle = styled(SkeletonElement)`
  width: 60%;
  height: 1rem;
  margin-bottom: 0.5rem;
`;

// 설명 텍스트
const SkeletonText = styled(SkeletonElement)`
  width: 80%;
  height: 0.75rem;
  margin-bottom: 0.25rem;
`;

const FoodInfoCardSkeleton = () => {
  return (
    <SquareSkeletonCard>
      <SkeletonIcon />
      <SkeletonTitle />
      <SkeletonText />
      <SkeletonText style={{ width: "70%" }} />
    </SquareSkeletonCard>
  );
};

export default FoodInfoCardSkeleton;
