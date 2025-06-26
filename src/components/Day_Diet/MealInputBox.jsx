import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMealInputContext } from "../../redux/mealInput/mealInputSlice";
import dayjs from "dayjs";

const MealInputBoxWrapper = styled.div`
  width: 100%;
  flex: 8;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7faff;
  padding: 24px 0;
`;

const MealBar = styled.div`
  width: 90%;
  max-width: 640px;
  background-color: #ffffff;
  border-radius: 16px;
  margin: 12px 0;
  display: flex;
  align-items: stretch;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  padding: 14px 16px;
`;

const MealType = styled.div`
  flex: 2;
  background-color: #bcd4f6;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
  color: #1a3c7c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const MealBox = styled.div`
  flex: 6;
  border-radius: 10px;
  padding: 10px 16px;
  background-color: #eef3fb;
  font-size: 0.9rem;
  color: #2a2a2a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  .food-summary {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const PlusBtn = styled.button`
  flex: 0 0 auto;
  align-self: center; /* ✅ 세로 가운데 정렬 */
  margin-left: 12px;
  border: none;
  background-color: #5b9bd5;
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #487eb0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  svg {
    font-size: 0.8rem;
  }
`;

const getKoreanLabel = (mealType) => {
  switch (mealType) {
    case "BREAKFAST":
      return "아침";
    case "LUNCH":
      return "점심";
    case "DINNER":
      return "저녁";
    default:
      return "간식";
  }
};

const MealInputBox = ({ currentDate, mealData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formattedDate = dayjs(currentDate).format("YYYY-MM-DD");

  const handlePlusClick = (mealType, mealList) => {
    dispatch(
      setMealInputContext({
        date: formattedDate,
        mealType,
        mealInfo: mealList,
      })
    );
    navigate("/foodinfo");
  };

  return (
    <MealInputBoxWrapper>
      {["BREAKFAST", "LUNCH", "DINNER"].map((type) => {
        const mealList = mealData[type] || [];
        const totalKcal = mealList.reduce((sum, food) => sum + food.kcal, 0);
        const foodText = mealList
          .map((item) => `${item.foodName} (${item.amount}인분)`)
          .join(", ");

        return (
          <MealBar key={type}>
            <MealType>{getKoreanLabel(type)}</MealType>
            <MealBox>
              <div className="food-summary" title={foodText}>
                {mealList.length > 0 ? foodText : "등록된 음식이 없습니다."}
              </div>
              <div>총칼로리: {totalKcal}kcal</div>
            </MealBox>
            <PlusBtn onClick={() => handlePlusClick(type, mealList)}>
              <FaPlus />
            </PlusBtn>
          </MealBar>
        );
      })}
    </MealInputBoxWrapper>
  );
};

export default MealInputBox;
