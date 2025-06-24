import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const RadarContainer = styled.div`
  width: 100%;
  height: 280px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.09);
    cursor: pointer;
  }
`;

const NutritionRadarChart = ({ data }) => {
  return (
    <RadarContainer>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="nutrient" />
          <PolarRadiusAxis angle={30} domain={[0, 1000]} />
          <Radar
            name="섭취량"
            dataKey="value"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </RadarContainer>
  );
};

export default NutritionRadarChart;
