import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

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
  align-items: center;
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
  margin-right: 12px;
`;

const MealBox = styled.div`
  flex: 6;
  border-radius: 10px;
  padding: 10px 16px;
  background-color: #eef3fb;
  font-size: 0.9rem;
  color: #2a2a2a;
  text-align: left;
`;

const PlusBtn = styled.button`
  flex: 0 0 auto;
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

const MealInputBox = () => {
  return (
    <MealInputBoxWrapper>
      <MealBar>
        <MealType>아침</MealType>
        <MealBox>사과 (100g), 우유(250ml) / 총칼로리 : 450kal</MealBox>
        <PlusBtn>
          <FaPlus />
        </PlusBtn>
      </MealBar>

      <MealBar>
        <MealType>점심</MealType>
        <MealBox>제육볶음 (150g), 제로콜라(250ml) / 총칼로리 : 1000kal</MealBox>
        <PlusBtn>
          <FaPlus />
        </PlusBtn>
      </MealBar>

      <MealBar>
        <MealType>저녁</MealType>
        <MealBox>물 (200ml) / 총칼로리 : 0kal</MealBox>
        <PlusBtn>
          <FaPlus />
        </PlusBtn>
      </MealBar>
    </MealInputBoxWrapper>
  );
};

export default MealInputBox;
