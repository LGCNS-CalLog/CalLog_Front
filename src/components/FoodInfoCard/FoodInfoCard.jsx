// components/FoodInfoCard/FoodInfoCard.jsx
import React, { useState } from "react";
import styled from "styled-components";
import {
  faBookmark as faSolidBookmark,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";

const SquareCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1; /* 정사각형 유지 */
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
  const { name, carbohydrate, protein, fat, kcal } = foodItem;
  const [isScrapped, setIsScrapped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);

  const handleCardClick = () => {
    setModalContent({
      title: isScrapped ? "수정하기" : "추가하기",
      message: `${name}을(를) ${
        isScrapped ? "수정하시겠습니까?" : "넣으시겠습니까?"
      }`,
      icon: isScrapped ? faExclamationTriangle : faSolidBookmark,
      iconColor: isScrapped ? "#f0ad4e" : "#5a6fd8",
      onConfirm: () => confirmScrapAction(!isScrapped),
      confirmText: isScrapped ? "제외하기" : "넣기",
      cancelText: isScrapped ? "수정하기" : "닫기",
    });
    setIsModalOpen(true);
  };

  const confirmScrapAction = (scrapStatus) => {
    setIsScrapped(scrapStatus);
    setIsModalOpen(false);
    setErrorMessage("");
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
          탄수화물:{carbohydrate}g 단백질:{protein}g 지방:{fat}g
        </Nutrition>
        {isScrapped && <SelectedMark>✔ 선택됨</SelectedMark>}
      </SquareCard>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalContent.onConfirm}
        title={modalContent.title}
        confirmText={modalContent.confirmText}
        cancelText={modalContent.cancelText}
        icon={modalContent.icon}
        iconColor={modalContent.iconColor}
      >
        <div>{modalContent.message}</div>
      </Modal>
    </>
  );
}
