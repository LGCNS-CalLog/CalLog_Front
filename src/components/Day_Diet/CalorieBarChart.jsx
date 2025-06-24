// components/Day_Diet/CalorieBarChart.js
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.09);
    cursor: pointer;
  }
`;

const CalorieBarChart = ({ current, target }) => {
  const data = [
    {
      name: "현재 칼로리",
      kcal: current,
      fill: "#4a90e2",
    },
    {
      name: "권장 칼로리",
      kcal: target,
      fill: "#a0c4ff",
    },
  ];

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="kcal" barSize={50} radius={[4, 4, 0, 0]}>
            <LabelList dataKey="kcal" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CalorieBarChart;
