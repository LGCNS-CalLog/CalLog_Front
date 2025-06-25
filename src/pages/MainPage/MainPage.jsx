import React from "react";
import styled from "styled-components";
import BMICard from "../../components/Main/BMICard";
import BMRCard from "../../components/Main/BMRCard";
import MapCard from "../../components/Main/MapCard";
import { useSelector } from "react-redux"; 

import { FaCalendarAlt, FaHeartbeat, FaChartLine } from 'react-icons/fa'; 
import { ssrImportKey } from "vite/module-runner";


const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* 카드가 넘치면 다음 줄로 */
  justify-content: center; /* 카드들을 가운데 정렬 */
  gap: 25px; /* 카드 사이 간격 */
  width: 100%;
  max-width: 1000px; /* 카드들이 배치될 최대 너비 */
`;



const MainPage = () => {
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);

  return (
    isAuthenticated ? <>    
    <CardsWrapper>
        <MapCard 
            title="나의 식단 캘린더 🍽️"
            description="오늘 섭취한 음식과 영양소를 기록하고, 나의 식단 목표를 관리해보세요!"
            to="/diet" // 이동할 주소
            icon={FaCalendarAlt} />
          <BMICard />
          <BMRCard />
          
    </CardsWrapper>
</>
:
<><h1>hi</h1></>
    
  );
};

export default MainPage;