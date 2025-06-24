// src/components/BMR/BMRActivityCard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux'; // Redux 상태를 가져오기 위해 useSelector 임포트

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 25px 30px;
  margin-bottom: 25px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  color: #4A4A4A;
  margin-bottom: 15px;
  font-weight: 700;
`;

const BmrNumber = styled.p`
  font-size: 2.8rem; /* BMI보다 살짝 작게 */
  font-weight: 800;
  color: #5A8D8D; /* BMR 관련 색상 */
  margin-bottom: 10px;
`;

const BmrLabel = styled.p`
  font-size: 1.1rem;
  color: #666666;
  margin-bottom: 20px;
`;

const ActivitySelection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px; /* 라디오 버튼 사이 간격 */
  width: 100%;
  margin-bottom: 25px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 텍스트와 칼로리 숫자를 양쪽으로 정렬 */
  background-color: #F8F8F8;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #E0E0E0;
  transition: all 0.2s ease;
  font-size: 1rem;
  color: #555555;

  &:hover {
    background-color: #EEEEEE;
  }

  input[type="radio"] {
    display: none; /* 기본 라디오 버튼 숨기기 */
  }

  input[type="radio"]:checked + & { /* 가상 요소로 커스텀 체크박스 */
    background-color: #94bcc0; /* 선택 시 배경색 */
    border-color: #94bcc0;
    color: #ffffff;

    span:first-of-type {
        color: #ffffff; /* 텍스트 색상도 변경 */
    }
    span:last-of-type {
        color: #ffffff; /* 칼로리 숫자 색상도 변경 */
        font-weight: 700;
    }
  }

  /* 커스텀 라디오 버튼 스타일 */
  &::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2px solid #BBBBBB;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #FFFFFF;
    transition: all 0.2s ease;
    flex-shrink: 0; /* 텍스트가 길어져도 크기 유지 */
  }

  input[type="radio"]:checked + &::before {
    border-color: #ffffff; /* 체크 시 테두리 색상 */
    background-color: #94bcc0; /* 체크 시 내부 색상 */
    box-shadow: inset 0 0 0 5px #ffffff; /* 내부 원형 효과 */
  }

  span:last-of-type { /* 칼로리 숫자 스타일 */
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
  }
`;

const ResultCalories = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: #3F5B5D; /* 결과 칼로리 색상 */
  margin-top: 10px;
`;

const ExplanationText = styled.p`
  font-size: 0.95rem;
  color: #777;
  line-height: 1.4;
  margin-top: 15px;
`;

const InfoMissingText = styled.p`
  font-size: 1rem;
  color: #D32F2F; /* 에러 색상 */
  margin-top: 20px;
  font-weight: 600;
`;


const BMRCard = () => {
  // Redux 스토어에서 필요한 사용자 정보 가져오기
  const { height, weight, age, gender } = useSelector((state) => state.auth);

  const [selectedActivity, setSelectedActivity] = useState('light');
  const [basalMetabolicRate, setBasalMetabolicRate] = useState(0); // BMR 상태로 관리
  const [recommendedCalories, setRecommendedCalories] = useState(0);

  // 활동량 계수 정의
  const activityFactors = {
    light: 1.375, // 가벼운 활동
    moderate: 1.55, // 보통 활동
    heavy: 1.725, // 강한 활동
  };

  useEffect(() => {
    let calculatedBMR = 0;
    let isValidInfo = false;

    // Redux에서 가져온 값을 숫자로 파싱
    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);
    const parsedAge = parseFloat(age); // age도 숫자로 파싱

    // 모든 정보가 유효한 숫자인지, 성별 정보가 있는지 확인
    if (parsedHeight > 0 && parsedWeight > 0 && parsedAge > 0 && !isNaN(parsedHeight) && !isNaN(parsedWeight) && !isNaN(parsedAge) && (gender === 'male' || gender === 'female')) {
      isValidInfo = true;

      // BMR 공식 적용
      if (gender === 'male') {
        calculatedBMR = 66.47 + (13.75 * parsedWeight) + (5 * parsedHeight) - (6.76 * parsedAge);
      } else if (gender === 'female') {
        calculatedBMR = 655.1 + (9.56 * parsedWeight) + (1.85 * parsedHeight) - (4.68 * parsedAge);
      }
    }
    
    // 계산된 BMR이 유효한 숫자인지 최종 확인
    if (isValidInfo && !isNaN(calculatedBMR) && isFinite(calculatedBMR)) {
        setBasalMetabolicRate(Math.round(calculatedBMR)); // 반올림하여 정수로 저장
    } else {
        setBasalMetabolicRate(0); // 유효하지 않으면 0으로 설정
    }

  }, [height, weight, age, gender]); // 키, 몸무게, 나이, 성별 변경 시 BMR 재계산

  useEffect(() => {
    // BMR이 0보다 클 때만 권장 칼로리 계산
    if (basalMetabolicRate > 0) {
      const factor = activityFactors[selectedActivity];
      setRecommendedCalories(Math.round(basalMetabolicRate * factor));
    } else {
      setRecommendedCalories(0);
    }
  }, [basalMetabolicRate, selectedActivity, activityFactors]); // BMR 또는 활동량 변경 시 재계산

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
  };

  // BMR이 계산 불가능한 경우 (정보 부족 등) 메시지 표시
  const isBMRCalculable = basalMetabolicRate > 0;

  return (
    <CardContainer>
      <CardTitle>나의 기초대사량</CardTitle>
      {isBMRCalculable ? (
        <>
          <BmrNumber>{basalMetabolicRate} kcal</BmrNumber>
          <BmrLabel>생존에 필요한 최소 에너지량</BmrLabel>

          <ActivitySelection>
            <RadioLabel>
              <input
                type="radio"
                name="activity"
                value="light"
                checked={selectedActivity === 'light'}
                onChange={handleActivityChange}
                disabled={!isBMRCalculable} // BMR 계산 불가 시 비활성화
              />
              <span>가벼운 활동</span>
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="activity"
                value="moderate"
                checked={selectedActivity === 'moderate'}
                onChange={handleActivityChange}
                disabled={!isBMRCalculable} // BMR 계산 불가 시 비활성화
              />
              <span>보통 활동</span>
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="activity"
                value="heavy"
                checked={selectedActivity === 'heavy'}
                onChange={handleActivityChange}
                disabled={!isBMRCalculable} // BMR 계산 불가 시 비활성화
              />
              <span>강한 활동</span>
            </RadioLabel>
          </ActivitySelection>

          <ResultCalories>
            {selectedActivity === 'light'}
            {selectedActivity === 'moderate'}
            {selectedActivity === 'heavy'}
            {recommendedCalories} kcal
          </ResultCalories>
        </>
      ) : (
        <InfoMissingText>
          기초대사량 계산을 위해 키, 몸무게, 나이, 성별 정보를 입력해주세요.
        </InfoMissingText>
      )}

      <ExplanationText>
        * 본 권장 대사량은 일반적인 활동량을 기준으로 계산된 예상치이며, 개인의 정확한 활동량과 목표에 따라 달라질 수 있습니다.
      </ExplanationText>
    </CardContainer>
  );
};

export default BMRCard;