// components/Day_Diet/ChartSection.js
import styled from "styled-components";
import CalorieBarChart from "./CalorieBarChart";
import NutritionRadarChart from "./NutritionRadarChart"; // ← 레이더 차트 컴포넌트

const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
`;

const ChartBox = styled.div`
  width: 420px;
  height: 320px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartSection = ({ current, target, nutritionData }) => {
  return (
    <SectionWrapper>
      <ChartBox>
        <CalorieBarChart current={current} target={target} />
      </ChartBox>
      <ChartBox>
        <NutritionRadarChart data={nutritionData} />
      </ChartBox>
    </SectionWrapper>
  );
};

export default ChartSection;
