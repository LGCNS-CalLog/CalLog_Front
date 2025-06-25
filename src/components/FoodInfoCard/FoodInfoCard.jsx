import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  faBookmark as faSolidBookmark,
  faExclamationTriangle,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal/Modal";
import { createMeal, updateMeal, deleteMeal } from "../../api/Meal/mealApi";
import { GetDietByDate } from "../../api/DayDiet/dayDietApi";
import { setMealInputContext } from "../../redux/mealInput/mealInputSlice";

const SquareCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${({ selected }) => (selected ? "#dbeafe" : "#ffffff")};
  border: 2px solid ${({ selected }) => (selected ? "#3b82f6" : "#e5e7eb")};
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin: 0.25rem 0;
`;

const Nutrition = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  line-height: 1.4;
`;

const SelectedMark = styled.p`
  color: #3b82f6;
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

export function FoodInfoCard({ foodItem }) {
  const { name, carbohydrate, protein, fat, kcal, id } = foodItem;
  const dispatch = useDispatch();
  const mealInput = useSelector((state) => state.mealInput);
  const selectedMealList = mealInput.mealData[mealInput.selectedMealType] || [];

  // Redux 상태로부터 현재 포함 여부 및 정보 가져오기
  const mealEntry = useMemo(
    () => selectedMealList.find((meal) => meal.foodId === foodItem.id),
    [selectedMealList, foodItem.id]
  );

  const isScrapped = !!mealEntry;
  const mealId = mealEntry?.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(1); // Modal에서 조절할 수량

  const handleCardClick = () => {
    setCount(mealEntry?.amount || 1);

    setModalContent({
      title: isScrapped ? "수정하기" : "추가하기",
      message: `${name}을(를) ${
        isScrapped ? "수정하시겠습니까?" : "추가하시겠습니까?"
      }`,
      icon: isScrapped ? faExclamationTriangle : faSolidBookmark,
      iconColor: isScrapped ? "#f0ad4e" : "#5a6fd8",
      onConfirm: () => {
        // 여기서 최신 count 값을 사용하도록 onConfirm 콜백 재정의
        confirmScrapAction(!isScrapped, count);
        console.log(count);
      },
      confirmText: isScrapped ? "제외하기" : "넣기",
      cancelText: isScrapped ? "수정하기" : "닫기",
    });

    setIsModalOpen(true);
  };

  const updateReduxMealData = async () => {
    const updatedMealList = await GetDietByDate(mealInput.selectedDate);
    const grouped = { BREAKFAST: [], LUNCH: [], DINNER: [] };
    updatedMealList.forEach((item) => {
      const type = item.mealType.toUpperCase();
      grouped[type].push(item);
    });

    dispatch(
      setMealInputContext({
        date: mealInput.selectedDate,
        mealType: mealInput.selectedMealType,
        mealInfo: grouped[mealInput.selectedMealType],
      })
    );
  };

  const confirmScrapAction = async (scrapStatus, amount) => {
    try {
      if (scrapStatus) {
        // amount 사용
        await createMeal({
          date: mealInput.selectedDate,
          mealType: mealInput.selectedMealType,
          foodId: foodItem.id,
          amount: count,
        });
      } else {
        await deleteMeal(mealId);
        setCount(1);
      }

      await updateReduxMealData();
      setIsModalOpen(false);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("음식 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <SquareCard onClick={handleCardClick} selected={isScrapped}>
        <IconWrapper>
          <FontAwesomeIcon
            icon={faUtensils}
            color={isScrapped ? "#5a6fd8" : "#9ca3af"}
          />
        </IconWrapper>
        <Title>{name}</Title>
        <Nutrition>
          {kcal}kcal
          <br />
          탄수화물: {carbohydrate}g 단백질: {protein}g 지방: {fat}g
        </Nutrition>
        {isScrapped && <SelectedMark>✔ 선택됨</SelectedMark>}
      </SquareCard>

      <Modal
        isOpen={isModalOpen}
        onClose={async () => {
          if (modalContent.cancelText === "수정하기") {
            try {
              await updateMeal({ id: mealId, amount: count });
              await updateReduxMealData();
            } catch (err) {
              setErrorMessage("수정 중 오류 발생");
            }
          }
          setIsModalOpen(false);
        }}
        onConfirm={modalContent.onConfirm}
        title={modalContent.title}
        confirmText={modalContent.confirmText}
        cancelText={modalContent.cancelText}
        icon={modalContent.icon}
        iconColor={modalContent.iconColor}
        count={count}
        setCount={setCount}
      >
        <div>{modalContent.message}</div>
      </Modal>
    </>
  );
}
