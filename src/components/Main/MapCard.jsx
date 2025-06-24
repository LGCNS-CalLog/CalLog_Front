import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// FaCalendarAlt는 기본 아이콘으로 사용하지만, 나중에 props로 아이콘을 전달받을 수도 있습니다.
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa'; 

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 25px 30px;
//   margin-bottom: 25px;
  width: 82.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  color: #4A4A4A;
  margin-bottom: 15px;
  font-weight: 700;
`;

const IconWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e0f2f1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const StyledIcon = styled.div`
  /* props로 전달받은 아이콘을 렌더링 */
  & > svg {
    font-size: 3.5rem;
    color: #5A8D8D;
  }
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  color: #666666;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const NavigateButton = styled.button`
  position: absolute;
  bottom: 32px;
  right: 40px;
  background-color: #94bcc0;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #7a9ea1;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ArrowIcon = styled(FaArrowRight)`
  font-size: 1.3rem;
`;

// props로 title, description, to (이동할 주소), icon (표시할 아이콘 컴포넌트)를 받습니다.
const MapCard = ({ title, description, to, icon: IconComponent = FaCalendarAlt }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (to) { // 'to' prop이 있을 때만 이동
      navigate(to);
    } else {
      console.warn("NavigateCard: 'to' prop is missing, cannot navigate.");
    }
  };

  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <IconWrapper>
        {/* props로 전달받은 IconComponent를 렌더링 */}
        <StyledIcon as={IconComponent} /> 
      </IconWrapper>
      <CardDescription>{description}</CardDescription>
      
      <NavigateButton onClick={handleNavigate}>
        <ArrowIcon />
      </NavigateButton>
    </CardContainer>
  );
};

export default MapCard;