import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dayjs from "dayjs";

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

const DayDietHeader = ({ currentDate }) => {
  const navigate = useNavigate();
  const current = dayjs(currentDate);
  const goToPrevDay = () => {
    const prev = current.subtract(1, "day").format("YYYY-MM-DD");
    navigate(`/day/diet/${prev}`);
  };

  const goToNextDay = () => {
    const next = current.add(1, "day").format("YYYY-MM-DD");
    navigate(`/day/diet/${next}`);
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
