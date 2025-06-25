import React, { useState } from "react";
import styled from "styled-components";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";

const StickyContainer = styled.div`
  position: sticky;
  top: 80px;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 16px;
  width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: auto; /* 내용에 따라 자동 확장 */
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleEditClick = (itemName, index) => {
    setModalContent({
      title: "수정하기",
      message: `${itemName}을(를) 수정하시겠습니까?`,
      icon: faExclamationTriangle,
      iconColor: "#f0ad4e",
      onConfirm: () => {
        // 🟥 제거 동작
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        setIsModalOpen(false);
      },
      onCancel: () => {
        // 🟦 수정 버튼 클릭 시 동작
        setEditIndex(index);
        setEditedValue(itemName);
        setIsModalOpen(false);
      },
      confirmText: "제거",
      cancelText: "수정",
    });

    setIsModalOpen(true);
  };

  const [items, setItems] = useState([
    "닭가슴살",
    "계란",
    "라면",
    "dd",
    "sdasd",
  ]);

  return (
    <StickyContainer>
      <Title>선택 식단</Title>
      <ItemList>
        {items.map((item, index) => (
          <Item key={index}>
            <span>{item}</span>
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
    </StickyContainer>
  );
};

export default StickyMemo;
