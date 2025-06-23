// src/components/Common/ReusableModal.jsx
import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 30px 40px;
  border-radius: 12px;
  text-align: center;
  width: 320px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a047;
  }
`;

const ReusableModal = ({ message, buttonText = "확인", onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalBox>
        <ModalMessage>{message}</ModalMessage>
        <ConfirmButton onClick={onConfirm}>{buttonText}</ConfirmButton>
      </ModalBox>
    </ModalOverlay>
  );
};

export default ReusableModal;
