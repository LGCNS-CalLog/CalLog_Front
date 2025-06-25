// src/components/Modal/Modal.jsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

// 키프레임 애니메이션 정의
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translate(-50%, -70%); opacity: 0; }
  to { transform: translate(-50%, -50%); opacity: 1; }
`;

// 모달 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); // 반투명 검정 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // 다른 요소들 위에 표시
  animation: ${fadeIn} 0.3s ease-out;
`;

// 모달 컨텐츠 영역 스타일
const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 450px;
  text-align: center;
  position: fixed; // 화면 중앙 고정을 위해 fixed 사용
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${slideIn} 0.4s ease-out;
  z-index: 1001;
`;

// 모달 헤더 (아이콘 + 제목)
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

// 모달 아이콘 (옵션)
const ModalIcon = styled.span`
  font-size: 1.8rem;
  margin-right: 15px;
  color: ${(props) => props.iconColor || "#5a6fd8"}; // 기본 아이콘 색상
`;

// 모달 제목 스타일
const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333333;
  margin: 0;
`;

// 모달 메시지 스타일
const ModalMessage = styled.p`
  font-size: 1rem;
  color: #555555;
  line-height: 1.6;

  white-space: pre-wrap; // 줄바꿈(\n)을 인식하도록 설정
`;

// 버튼 컨테이너 스타일
const ButtonContainer = styled.div`
  display: flex;
  justify-content: Center; // 버튼을 오른쪽으로 정렬
  gap: 15px; // 버튼 사이 간격
`;

// 기본 버튼 스타일 (공통)
const BaseButton = styled.button`
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
  min-width: 100px;

  &:hover {
    opacity: 0.85;
  }
  &:active {
    transform: scale(0.97);
  }
`;

// 확인 버튼 스타일
const ConfirmButton = styled(BaseButton)`
  background-color: #5a6fd8; // 주 색상
  color: white;
  &:hover {
    background-color: #4a5cb0;
  }
`;

// 취소 버튼 스타일
const CancelButton = styled(BaseButton)`
  background-color: #e0e0e0; // 연한 회색
  color: #333333;
  &:hover {
    background-color: #cccccc;
  }
`;

// 닫기 버튼 (X) 스타일
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #aaaaaa;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: #777777;
  }
`;

// 숫자 조절 버튼 스타일
const ControlButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #5a6fd8;
  padding: 20px;
  transition: color 0.3s;

  &:hover {
    color: #4a5cb0;
  }

  &:active {
    color: #3a4a8e;
  }
`;

// 숫자 표시 스타일
const NumberDisplay = styled.span`
  font-size: 1.25rem;
  margin: 0 20px;
  color: #333;
`;

/**
 * 공용 모달 컴포넌트
 * @param {object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {function} props.onClose - 모달 닫기 콜백 함수
 * @param {function} [props.onConfirm] - 확인 버튼 클릭 콜백 함수
 * @param {string} [props.title="알림"] - 모달 제목
 * @param {React.ReactNode} props.children - 모달 내용 (메시지)
 * @param {string} [props.confirmText="확인"] - 확인 버튼 텍스트
 * @param {string} [props.cancelText="취소"] - 취소 버튼 텍스트
 * @param {boolean} [props.showConfirmButton=true] - 확인 버튼 표시 여부
 * @param {boolean} [props.showCancelButton=true] - 취소 버튼 표시 여부
 * @param {React.ComponentType<any>} [props.icon] - FontAwesome 아이콘 컴포넌트 (예: faCheck)
 * @param {string} [props.iconColor] - 아이콘 색상
 */
const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "알림",
  children,
  confirmText = "확인",
  cancelText = "취소",
  showConfirmButton = true,
  showCancelButton = true,
  icon,
  iconColor,
  count, // props로 추가
  setCount, // props로 추가
}) => {
  // 내부 상태 삭제!
  // const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 0.5);
  const decrement = () =>
    setCount((prevCount) => (prevCount > 0 ? prevCount - 0.5 : 0));

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* 이벤트 전파 방지 */}
        <CloseButton onClick={onClose} aria-label="닫기">
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <ModalHeader>
          {icon && (
            <ModalIcon iconColor={iconColor}>
              <FontAwesomeIcon icon={icon} />
            </ModalIcon>
          )}
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalMessage>{children}</ModalMessage>
        {/* 숫자 조정 영역 */}
        <div>
          <ControlButton onClick={decrement}>-</ControlButton>
          <NumberDisplay>{count.toFixed(1)}</NumberDisplay>{" "}
          {/* 소수 첫째 자리까지 표시 */}
          <ControlButton onClick={increment}>+</ControlButton>
        </div>
        <ButtonContainer>
          {showCancelButton && (
            <CancelButton onClick={onClose}>{cancelText}</CancelButton>
          )}
          {showConfirmButton && onConfirm && (
            <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
