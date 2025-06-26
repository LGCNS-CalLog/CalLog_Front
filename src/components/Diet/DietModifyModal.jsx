import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #666;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8rem;
`;

const ModalText = styled.p`
  margin-bottom: 30px;
  font-size: 1.1rem;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 15px;
`;

const ModalButton = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  flex: 1; /* 버튼들이 가로 공간을 동일하게 차지하도록 */

  &:hover {
    transform: translateY(-2px);
  }
`;

const YesButton = styled(ModalButton)`
  background-color: #94bcc0; /* 선택된 날짜 색상과 유사하게 */
  color: white;

  &:hover {
    background-color:rgb(108, 159, 164);
  }
`;

const NoButton = styled(ModalButton)`
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const DietModifyModal = ({ date, onClose, onConfirm, hasRecord }) => {
  // date 객체를 'YYYY년 MM월 DD일' 형식으로 포맷
  const formattedDate = date ? new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long' // 요일도 추가
  }).format(date) : '';

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}> {/* 클릭 이벤트 버블링 방지 */}
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>{formattedDate}</ModalTitle>
        <ModalText>
          {hasRecord ? 
            `해당 날짜에 이미 기록이 있습니다.` : 
            `해당 날짜에 기록이 없습니다.`
          }
          <br />
          {hasRecord ? 
            `수정하시겠습니까?` : 
            `새로운 기록을 추가하시겠습니까?`
          }
        </ModalText>
        <ButtonContainer>
          <YesButton onClick={onConfirm}>예</YesButton>
          <NoButton onClick={onClose}>아니오</NoButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DietModifyModal;