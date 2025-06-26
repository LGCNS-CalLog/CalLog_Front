import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import { deleteMeal, updateMeal } from "../../api/Meal/mealApi";
import { GetDietByDate } from "../../api/DayDiet/dayDietApi";
import { setMealInputContext } from "../../redux/mealInput/mealInputSlice";

const StickyContainer = styled.div`
  position: sticky;
  top: 80px;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 16px;
  width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #ccc;
  font-size: 16px;
  color: #444;

  &:hover .edit-button {
    opacity: 1;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.2s;

  &.edit-button {
    opacity: 0;
  }
`;

const StickyMemo = () => {
  const dispatch = useDispatch();
  const mealInput = useSelector((state) => state.mealInput);
  const selectedList = mealInput.mealData[mealInput.selectedMealType] || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [count, setCount] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const updateReduxMealData = async () => {
    try {
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
    } catch (err) {
      console.error("Redux 식단 업데이트 실패", err);
    }
  };

  const handleEditClick = (mealItem) => {
    setSelectedMeal(mealItem);
    setCount(mealItem.amount); // 기존 수량 세팅

    setModalContent({
      title: "수정하기",
      message: `${mealItem.foodName}을(를) 수정하시겠습니까?`,
      icon: faExclamationTriangle,
      iconColor: "#f0ad4e",
      onConfirm: async () => {
        try {
          await deleteMeal(mealItem.id);
          await updateReduxMealData();
          setIsModalOpen(false);
        } catch (err) {
          console.error("삭제 오류", err);
        }
      },
      cancelText: "수정",
      confirmText: "제거",
    });

    setIsModalOpen(true);
  };

  return (
    <StickyContainer>
      <Title>선택 식단</Title>
      <ItemList>
        {selectedList.map((item) => (
          <Item key={item.id}>
            <span>
              {item.foodName} (x{item.amount})
            </span>
            <EditButton
              className="edit-button"
              onClick={() => handleEditClick(item)}
            >
              ✎
            </EditButton>
          </Item>
        ))}
      </ItemList>

      <Modal
        isOpen={isModalOpen}
        onClose={async () => {
          if (modalContent.cancelText === "수정" && selectedMeal) {
            try {
              await updateMeal({
                id: selectedMeal.id,
                amount: count,
              });
              await updateReduxMealData();
            } catch (err) {
              console.error("수정 오류", err);
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
    </StickyContainer>
  );
};

export default StickyMemo;
