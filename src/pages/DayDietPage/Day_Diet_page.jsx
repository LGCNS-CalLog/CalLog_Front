import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MealInputBox from "../../components/Day_Diet/MealInputBox";
import DayDietHeader from "../../components/Day_Diet/DayDieteHeader";
import ChartSection from "../../components/Day_Diet/ChartSectionWrapper";
import { GetDietByDate } from "../../api/DayDiet/dayDietApi";
import dayjs from "dayjs";
import styled from "styled-components";
import { useSelector } from "react-redux";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  width: 100%;
  box-sizing: border-box;
`;

const DayDietPage = () => {
  const { date: urlDate } = useParams();
  const [selectedDate, setSelectedDate] = useState(
    urlDate || dayjs().format("YYYY-MM-DD")
  );
  const authSlice = useSelector((state) => state.auth);
  const userBmr = authSlice.bmr;
  console.log(userBmr);
  const [mealData, setMealData] = useState({
    BREAKFAST: [],
    LUNCH: [],
    DINNER: [],
  });
  const [nutritionData, setNutritionData] = useState([]);
  const [currentCalories, setCurrentCalories] = useState(0);

  useEffect(() => {
    let carb = 0,
      protein = 0,
      fat = 0,
      sugar = 0,
      fiber = 0,
      kcal = 0;
    console.log("데이터 불러오기");
    const fetchData = async () => {
      try {
        const mealList = await GetDietByDate(selectedDate);
        console.log("mealList", mealList);
        const grouped = { BREAKFAST: [], LUNCH: [], DINNER: [] };

        mealList.forEach((item) => {
          const type = item.mealType.toUpperCase();
          grouped[type].push(item);
          carb += item.carbohydrate ?? 0;
          protein += item.protein ?? 0;
          fat += item.fat ?? 0;
          sugar += item.sugar ?? 0;
          fiber += item.fiber ?? 0;
          kcal += item.kcal ?? 0;
        });

        setMealData(grouped);
        setCurrentCalories(kcal);
        setNutritionData([
          { nutrient: "탄수화물", value: carb },
          { nutrient: "단백질", value: protein },
          { nutrient: "지방", value: fat },
          { nutrient: "식이섬유", value: fiber },
          { nutrient: "당류", value: sugar },
        ]);
      } catch (err) {
        console.error("식단 데이터를 불러오지 못했습니다:", err);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <PageWrapper>
      <DayDietHeader
        currentDate={selectedDate}
        onChangeDate={setSelectedDate}
      />
      <MealInputBox currentDate={selectedDate} mealData={mealData} />
      <ChartSection
        current={currentCalories}
        target={userBmr}
        nutritionData={nutritionData}
      />
    </PageWrapper>
  );
};

export default DayDietPage;
