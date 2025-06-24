import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

import {
  faBookmark as faSolidBookmark,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"; // 스크랩 아이콘

import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CardWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 20px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// 뉴스 썸네일 이미지를 감싸는 컨테이너 (크기 지정)
const ThumbnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; // 이미지가 래퍼를 벗어나지 않도록
  padding: 30px;

  @media (min-width: 768px) {
    width: 280px;
    min-width: 280px;
  }
`;

const ThumbnailIcon = styled.div`
  font-size: 4rem; // 아이콘 크기 조정
  color: #5a6fd8; // 기본 아이콘 색상
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 뉴스 내용 영역 (제목, 설명, 날짜, 버튼)
const ContentArea = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1; // 남은 공간을 모두 차지
  box-sizing: border-box;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 28px;
  }
`;

// 뉴스 제목
const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  b {
    font-weight: inherit;
    color: #5a6fd8;
  }

  @media (min-width: 768px) {
    font-size: 1.6rem;
    margin: 0 0 16px 0;
  }
`;

// 뉴스 설명
const Description = styled.p`
  font-size: 0.95rem;
  color: #555555;
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;

  b {
    font-weight: inherit;
    color: #5a6fd8;
  }

  @media (min-width: 768px) {
    -webkit-line-clamp: 4;
    font-size: 1rem;
    margin: 0 0 20px 0;
  }
`;

const ModalMessage = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const ModalTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: inline-block;
  width: 100%;
`;

const ErrorBanner = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  text-align: center;
  font-size: 1rem;
  border-radius: 5px;
  margin: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

const FoodInfoCard = ({ foodItem }) => {
  const { id, name, defaultAmount, carbohydrate, protein, fat, kcal } =
    foodItem;
  const [isScrapped, setIsScrapped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    icon: null,
    iconColor: "",
    onConfirm: null,
    confirmText: "",
    cancelText: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  const location = useLocation();

  const handleCardClick = (e) => {
    e.stopPropagation();
    const plainTitle = title.replace(/<\/?b>/g, "");
    if (isScrapped) {
      setModalContent({
        title: "수정하기",
        message: (
          <div>
            <ModalTitle>{plainTitle}</ModalTitle>
            <br />
            <span>해당 음식을 수정하시겠습니까?</span>
          </div>
        ),
        icon: faExclamationTriangle,
        iconColor: "#f0ad4e",
        onConfirm: () => confirmScrapAction(false, plainTitle),
        confirmText: "제외하기",
        cancelText: "수정하기",
      });
    } else {
      setModalContent({
        title: "추가하기",
        message: (
          <div>
            <ModalTitle>{plainTitle}</ModalTitle>
            <br />
            <span>음식을 넣으시겠습니까?</span>
          </div>
        ),
        icon: faSolidBookmark,
        iconColor: "#5a6fd8",
        onConfirm: () => confirmScrapAction(true, plainTitle),
        confirmText: "넣기",
        cancelText: "닫기",
      });
    }
    setIsModalOpen(true);
  };

  const confirmScrapAction = (scrapStatus, plainTitle) => {
    setIsScrapped(scrapStatus);
    setIsModalOpen(false);
    setErrorMessage("");
    const body = {
      title: getPlainText(title),
    };
    // 스크랩 관련 처리 예시 (API 호출 등)
  };

  const title = foodItem.name || "음식 이름";
  const description = `열량: ${kcal}kcal : 탄수화물: ${carbohydrate}g / 단백질: ${protein}g / 지방: ${fat}g `;

  return (
    <>
      <ErrorBanner visible={errorMessage !== ""}>{errorMessage}</ErrorBanner>

      <CardWrapper onClick={handleCardClick} style={{ cursor: "pointer" }}>
        <ThumbnailWrapper>
          <ThumbnailIcon>
            {isScrapped ? (
              <FontAwesomeIcon icon={faUtensils} style={{ color: "#5a6fd8" }} />
            ) : (
              <FontAwesomeIcon icon={faUtensils} style={{ color: "#888888" }} />
            )}
          </ThumbnailIcon>
        </ThumbnailWrapper>
        <ContentArea>
          <div>
            <Title dangerouslySetInnerHTML={{ __html: title }} />
            <Description dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </ContentArea>
      </CardWrapper>

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
        <ModalMessage>{modalContent.message}</ModalMessage>
      </Modal>
    </>
  );
};

export { FoodInfoCard };
