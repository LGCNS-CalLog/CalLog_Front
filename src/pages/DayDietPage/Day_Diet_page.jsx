import styled from "styled-components";
import MealInputBox from "../../components/Day_Diet/MealInputBox";
import DayDietHeader from "../../components/Day_Diet/DayDieteHeader";
import { HEADER_HEIGHT } from "../../components/Header/Header";
import ChartSection from "../../components/Day_Diet/ChartSectionWrapper"; // 📊 차트 통합 컴포넌트

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  margin: 0 auto;
  padding: 24px 16px;
  box-sizing: border-box;

  min-height: calc(100vh - ${HEADER_HEIGHT});
  border-radius: 12px;
  background: linear-gradient(to bottom, #fdfdfd, #f0f4ff);
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

const DayDietPage = () => {
  // 예시 데이터
  const currentCalories = 1450;
  const targetCalories = 2000;

  const nutritionData = [
    { nutrient: "탄수화물", value: 60 },
    { nutrient: "단백질", value: 70 },
    { nutrient: "지방", value: 50 },
    { nutrient: "식이섬유", value: 40 },
    { nutrient: "당류", value: 30 },
  ];

  return (
    <PageWrapper>
      <DayDietHeader />
      <MealInputBox />
      <ChartSection
        current={currentCalories}
        target={targetCalories}
        nutritionData={nutritionData}
      />
    </PageWrapper>
  );
};

export default DayDietPage;
