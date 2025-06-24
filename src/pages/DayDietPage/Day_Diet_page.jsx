import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MealInputBox from "../../components/Day_Diet/MealInputBox";
import DayDietHeader from "../../components/Day_Diet/DayDieteHeader";
import { GetDietByDate } from "../../api/DayDiet/dayDietApi";
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

  border-radius: 12px;
  background: linear-gradient(to bottom, #fdfdfd, #f0f4ff);
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;
const dummyData = [
  {
    id: 1,
    mealType: "BREAKFAST",
    foodId: 12345,
    foodName: "test1",
    amount: 0.5,
    carbohydrate: 42,
    protein: 13,
    fat: 15,
    kcal: 66,
  },
  {
    id: 2,
    mealType: "BREAKFAST",
    foodId: 12345,
    foodName: "test2",
    amount: 2,
    carbohydrate: 76.56,
    protein: 25,
    fat: 18.7,
    kcal: 514,
  },
  {
    id: 5,
    mealType: "LUNCH",
    foodId: 12345,
    foodName: "test3",
    amount: 2,
    carbohydrate: 76.56,
    protein: 25,
    fat: 18.7,
    kcal: 514,
  },
  {
    id: 7,
    mealType: "LUNCH",
    foodId: 12345,
    foodName: "test4",
    amount: 2,
    carbohydrate: 76.56,
    protein: 25,
    fat: 18.7,
    kcal: 514,
  },
  {
    id: 9,
    mealType: "Dinner",
    foodId: 12345,
    foodName: "test5",
    amount: 2,
    carbohydrate: 76.56,
    protein: 25,
    fat: 18.7,
    kcal: 514,
  },
  {
    id: 14,
    mealType: "Dinner",
    foodId: 12345,
    foodName: "test6",
    amount: 2,
    carbohydrate: 76.56,
    protein: 25,
    fat: 18.7,
    kcal: 514,
  },
  {
    id: 16,
    mealType: "Dinner",
    foodId: 12345,
    foodName: "test7",
    amount: 2,
    carbohydrate: 76.56,
    protein: 25,
    fat: 18.7,
    kcal: 514,
  },
  {
    id: 19,
    mealType: "BREAKFAST",
    foodId: 12345,
    foodName: "test8",
    amount: 2,
    carbohydrate: 76.56,
    protein: 25,
    fat: 18.7,
    kcal: 514,
  },
];
const DayDietPage = () => {
  const { date } = useParams(); // ex: 2025-06-21
  const [mealData, setMealData] = useState({
    BREAKFAST: [],
    LUNCH: [],
    DINNER: [],
  });
  const [nutritionData, setNutritionData] = useState([]);
  const [currentCalories, setCurrentCalories] = useState(0);
  useEffect(() => {
    const grouped = {
      BREAKFAST: [],
      LUNCH: [],
      DINNER: [],
    };
    let carb = 0,
      protein = 0,
      fat = 0,
      kcal = 0;

    dummyData.forEach((item) => {
      const type = item.mealType.toUpperCase();
      grouped[type].push(item);
      carb += item.carbohydrate;
      protein += item.protein;
      fat += item.fat;
      kcal += item.kcal;
    });

    setMealData(grouped);
    setCurrentCalories(kcal);
    setNutritionData([
      { nutrient: "탄수화물", value: carb },
      { nutrient: "단백질", value: protein },
      { nutrient: "지방", value: fat },
    ]);
  }, [date]);

  const grouped = {
    BREAKFAST: [],
    LUNCH: [],
    DINNER: [],
  };
  dummyData.forEach((item) => {
    grouped[item.mealType]?.push(item);
  });
  const targetCalories = 2000;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await GetDietByDate({ date });
  //       const grouped = {
  //         BREAKFAST: [],
  //         LUNCH: [],
  //         DINNER: [],
  //       };
  //       response.data.forEach((item) => {
  //         grouped[item.mealType]?.push(item);
  //       });
  //       setMealData(grouped);
  //     } catch (e) {
  //       console.error("식단 불러오기 실패:", e.message);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // const currentCalories = 1450;
  // const targetCalories = 2000;

  // const nutritionData = [
  //   { nutrient: "탄수화물", value: 60 },
  //   { nutrient: "단백질", value: 70 },
  //   { nutrient: "지방", value: 50 },
  //   { nutrient: "식이섬유", value: 40 },
  //   { nutrient: "당류", value: 30 },
  // ];

  return (
    <PageWrapper>
      <DayDietHeader currentDate={date} />
      <MealInputBox currentDate={date} mealData={mealData} />
      <ChartSection
        current={currentCalories}
        target={targetCalories}
        nutritionData={nutritionData}
      />
    </PageWrapper>
  );
};

export default DayDietPage;
