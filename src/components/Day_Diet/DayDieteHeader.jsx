import dayjs from "dayjs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 30px;
  padding: 12px 20px;
  background-color: #f7faff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 960px;
`;

const ArrowButton = styled.button`
  background: #eef3fb;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #bcd4f6;
    transform: scale(1.1);
  }

  svg {
    color: #2a2a2a;
  }
`;

const DateBox = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const DayDietHeader = ({ currentDate, onChangeDate }) => {
  const current = dayjs(currentDate);

  const goToPrevDay = () => {
    const prevDate = current.subtract(1, "day").format("YYYY-MM-DD");
    onChangeDate(prevDate);
  };

  const goToNextDay = () => {
    const nextDate = current.add(1, "day").format("YYYY-MM-DD");
    onChangeDate(nextDate);
  };

  return (
    <HeaderWrapper>
      <ArrowButton onClick={goToPrevDay}>
        <FaChevronLeft />
      </ArrowButton>
      <DateBox>{current.format("YYYY년 MM월 DD일")}</DateBox>
      <ArrowButton onClick={goToNextDay}>
        <FaChevronRight />
      </ArrowButton>
    </HeaderWrapper>
  );
};

export default DayDietHeader;
