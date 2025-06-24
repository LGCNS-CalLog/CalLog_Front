// src/components/BMI/BMICard.jsx
import React, { useState, useEffect } from 'react'; // useEffect, useState 임포트
import styled from 'styled-components';
import { useSelector } from 'react-redux'; // Redux 상태를 가져오기 위해 useSelector 임포트

// Helper function to determine BMI category and color
const getBmiCategory = (bmi) => {
  if (bmi < 18.5) {
    return { category: '저체중', color: '#64B5F6' }; // Light Blue
  } else if (bmi >= 18.5 && bmi < 23) {
    return { category: '정상', color: '#81C784' }; // Light Green
  } else if (bmi >= 23 && bmi < 25) {
    return { category: '과체중', color: '#FFB74D' }; // Orange
  } else if (bmi >= 25 && bmi < 30) {
    return { category: '비만', color: '#E57373' }; // Red
  } else {
    return { category: '고도 비만', color: '#D32F2F' }; // Darker Red
  }
};

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 25px 30px;
  margin-bottom: 25px; /* 다른 카드와의 간격 */
  width: 100%;
  max-width: 400px; /* 카드의 최대 너비 제한 */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 700;
`;

const BmiNumber = styled.p`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${({ $bmiColor }) => $bmiColor || '#333'}; /* 동적으로 색상 변경 */
  margin-bottom: 10px;
`;

const BmiCategory = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ $bmiColor }) => $bmiColor || '#555'}; /* 동적으로 색상 변경 */
  margin-bottom: 25px;
`;

const SpectrumContainer = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(
    to right,
    #64B5F6 0%,  /* 저체중 (Light Blue) */
    #81C784 30%,  /* 정상 (Light Green) */
    #FFB74D 60%,  /* 과체중 (Orange) */
    #E57373 80%,  /* 비만 (Red) */
    #D32F2F 100% /* 고도 비만 (Darker Red) */
  );
  border-radius: 10px;
  position: relative;
  margin-bottom: 15px;
`;

const BmiIndicator = styled.div`
  position: absolute;
  top: -5px; /* 스펙트럼 위에 살짝 띄우기 */
  width: 10px; /* 마커 너비 */
  height: 30px; /* 마커 높이 */
  background-color: #333; /* 마커 색상 */
  border-radius: 5px;
  transform: translateX(-50%); /* 중앙 정렬 */
  
  /* BMI 값에 따른 위치 계산 (0% ~ 100%) */
  /* 예시: BMI 15~35를 0%~100%로 매핑 */
  left: ${({ $bmi }) => {
    const minBmi = 15; // 스펙트럼의 시작 BMI
    const maxBmi = 35; // 스펙트럼의 끝 BMI
    const position = ((Math.min(Math.max($bmi, minBmi), maxBmi) - minBmi) / (maxBmi - minBmi)) * 100;
    return `${position}%`;
  }};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &::before { /* 삼각형 포인터 */
    content: '';
    position: absolute;
    bottom: -8px; /* 마커 아래에 위치 */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #333;
  }
`;

const SpectrumLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9rem;
  color: #777;
`;

const BmiComment = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-top: 10px;
`;

const InfoMissingText = styled.p`
  font-size: 1rem;
  color: #D32F2F; /* 에러 색상 */
  margin-top: 20px;
  font-weight: 600;
`;

const BMICard = () => {
  // Redux 스토어에서 필요한 사용자 정보 (height, weight) 가져오기
  const { height, weight } = useSelector((state) => state.auth);

  const [bmi, setBmi] = useState(0); // BMI 상태 추가

  useEffect(() => {
    let calculatedBmi = 0;
    let isValidInfo = false;

    // Redux에서 가져온 값을 숫자로 파싱
    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    // 키와 몸무게가 유효한 숫자이고 0보다 큰지 확인
    if (parsedHeight > 0 && parsedWeight > 0 && !isNaN(parsedHeight) && !isNaN(parsedWeight)) {
      isValidInfo = true;
      // BMI 공식: 체중(kg) / (신장(m) * 신장(m))
      const heightInMeters = parsedHeight / 100; // cm를 m로 변환
      calculatedBmi = parsedWeight / (heightInMeters * heightInMeters);
    }

    // console.log로 계산된 BMI 값 확인 (디버깅용)
    console.log('BMICard - Redux height:', height, 'weight:', weight);
    console.log('BMICard - Calculated BMI:', calculatedBmi);

    if (isValidInfo && !isNaN(calculatedBmi) && isFinite(calculatedBmi)) {
      setBmi(calculatedBmi);
    } else {
      setBmi(0); // 유효하지 않으면 0으로 설정
    }
  }, [height, weight]); // height, weight 변경 시 BMI 재계산

  // BMI가 계산 불가능한 경우 (정보 부족 등) 메시지 표시
  const isBMICalculable = bmi > 0;
  const { category, color } = getBmiCategory(bmi);

  return (
    <CardContainer>
      <CardTitle>나의 BMI 지수</CardTitle>
      {isBMICalculable ? (
        <>
          <BmiNumber $bmiColor={color}>{bmi.toFixed(1)}</BmiNumber> {/* 소수점 한 자리까지 표시 */}
          <BmiCategory $bmiColor={color}>{category}</BmiCategory>
          
          <SpectrumContainer>
            <BmiIndicator $bmi={bmi} />
          </SpectrumContainer>
          <SpectrumLabels>
            <span>저체중</span>
            <span>정상</span>
            <span>과체중</span>
            <span>비만</span>
            <span>고도비만</span>
          </SpectrumLabels>

          <BmiComment>
            {bmi < 18.5 && "적정 체중 유지를 위해 충분한 영양 섭취와 균형 잡힌 식단이 필요해요."}
            {bmi >= 18.5 && bmi < 23 && "아주 좋은 BMI를 유지하고 계시네요! 꾸준한 관리로 건강을 지켜나가세요."}
            {bmi >= 23 && bmi < 25 && "건강을 위해 체중 관리에 조금 더 신경 써주세요. 작은 변화가 큰 결과를 만들 수 있습니다."}
            {bmi >= 25 && bmi < 30 && "비만은 여러 질병의 위험을 높일 수 있습니다. 전문가와 상담하여 체계적인 관리를 시작해보세요."}
            {bmi >= 30 && "고도 비만은 건강에 심각한 영향을 줄 수 있습니다. 전문의와 함께 건강 관리 계획을 세우는 것이 중요해요."}
          </BmiComment>
        </>
      ) : (
        <InfoMissingText>
          BMI 계산을 위해 키와 몸무게 정보를 입력해주세요.
        </InfoMissingText>
      )}
    </CardContainer>
  );
};

export default BMICard;