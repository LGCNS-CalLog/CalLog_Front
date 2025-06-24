import React from "react";
import styled from "styled-components";
import BMICard from "../../components/Main/BMICard";
import BMRCard from "../../components/Main/BMRCard";

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* 카드가 넘치면 다음 줄로 */
  justify-content: center; /* 카드들을 가운데 정렬 */
  gap: 25px; /* 카드 사이 간격 */
  width: 100%;
  max-width: 1000px; /* 카드들이 배치될 최대 너비 */
`;



const MainPage = () => {

  return (
    <CardsWrapper>
          <BMICard />
          <BMRCard />
    </CardsWrapper>
  );
};

export default MainPage;