import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #f7faff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const ArrowButton = styled.button`
  background: #eef3fb;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #bcd4f6;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    color: #2a2a2a;
  }
`;

const DateBox = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2a2a2a;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const DayDietHeader = () => {
  const date = {
    year: "2025",
    month: "06",
    day: "21",
  };

  return (
    <HeaderWrapper>
      <ArrowButton>
        <FaChevronLeft />
      </ArrowButton>

      <DateBox>
        {date.year}년 {date.month}월 {date.day}일
      </DateBox>

      <ArrowButton>
        <FaChevronRight />
      </ArrowButton>
    </HeaderWrapper>
  );
};

export default DayDietHeader;
