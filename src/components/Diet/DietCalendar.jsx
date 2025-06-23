import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../Header/Header';

const CalendarContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  padding: 20px;
  box-sizing: border-box;

  .react-calendar {
    width: 90%;
    max-width: 900px;
    height: auto;
    background-color: #ffffff;
    border: none;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 2rem 2.5rem;
  }

  /* 네비게이션 */
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .react-calendar__navigation button {
    color: #4a4a4a;
    font-size: 1.6rem;
    font-weight: 600;
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }

    &:focus {
      background-color: #e0e0e0;
    }

    &:disabled {
      color: #cccccc;
      background: none;
      cursor: not-allowed;
    }
  }

  .react-calendar__navigation__label {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2c3e50;
    flex-grow: 0 !important;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    
    &:hover {
        background-color: #f0f0f0;
    }
  }

  /* 요일 (월, 화, 수...) */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 600;
    color: #7f8c8d; /* 기본 요일 색상 (평일) */
    font-size: 1rem;
    text-transform: uppercase;
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: #3498db !important; /* 토요일 요일 파란색 */
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #e74c3c !important; /* 일요일 요일 빨간색 */
  }

  /* 각 날짜 타일 */
  .react-calendar__tile {
    // --- 이 부분을 수정하여 날짜 숫자 상단 중앙 정렬 ---
    display: flex; /* Flexbox 활성화 */
    flex-direction: column; /* 자식 요소를 세로로 배열 */
    justify-content: flex-start; /* 세로 정렬: 상단으로 */
    align-items: center; /* 가로 정렬: 중앙으로 */
    padding: 0.5rem 0.5rem; /* 전체 패딩을 줄여서 상단 공간을 확보하고, 날짜 숫자가 위로 붙도록 함 */
    height: 60px; /* 각 타일의 최소 높이를 고정 (조절 가능) */
    box-sizing: border-box; /* 패딩이 높이에 포함되도록 */

    font-size: 1.1rem;
    color: #4a4a4a;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .react-calendar__tile abbr {
    margin-bottom: 5px; /* 날짜 숫자 아래에 약간의 여백 추가 (선택 사항) */
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #ecf0f1;
    color: #2c3e50;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background-color: #e8f5e9;
    border-radius: 8px;
    abbr {
      color: #388e3c;
      font-weight: 700;
    }
  }

  /* 선택된 날짜 */
  .react-calendar__tile--active {
    background-color: #6c5ce7 !important;
    color: #ffffff !important;
    border-radius: 8px;
    font-weight: 700;

    abbr {
      color: #ffffff !important;
    }
  }

  /* 인접한 달 날짜 숨기기 */
  .react-calendar__month-view__days__day--neighboringMonth {
    visibility: hidden;
  }

  /* --- 기록 표시 스타일 추가 --- */
  .record-indicator {
    position: absolute;
    bottom: 5px; /* 날짜 칸 아래쪽에 위치 */
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background-color: #ffc107; /* 노란색 점 (기록 유무 표시) */
    border-radius: 50%;
    animation: pulse 1.5s infinite alternate; /* 점이 깜빡이는 애니메이션 */
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
    }
    100% {
      box-shadow: 0 0 0 8px rgba(255, 193, 7, 0);
    }
  }
  /* --- 기록 표시 스타일 끝 --- */

  /* 년도 뷰, 월 뷰 버튼 스타일 */
  .react-calendar__year-view__months__month,
  .react-calendar__decade-view__years__year,
  .react-calendar__century-view__decades__decade {
    border-radius: 8px;
    background-color: #f8f8f8;
    color: #4a4a4a;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 1.2rem 0.5rem;
    margin-bottom: 0.5rem;

    &:enabled:hover,
    &:enabled:focus {
      background-color: #e9ecef;
      color: #2c3e50;
    }

    &--active {
      background-color: #6c5ce7 !important;
      color: #ffffff !important;
    }
  }
`;

const DietCalendar = ({ onChange, value, onDateSelect, recordedDates }) => { // onDateSelect, recordedDates prop 추가
  const [selectedDateValue, setSelectedDateValue] = useState(value || new Date());
  // const navigate = useNavigate(); // 페이지 이동 필요하면 주석 해제

  useEffect(() => {
    if (value) {
      setSelectedDateValue(value);
    }
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDateValue(date);
    if (onChange) {
      onChange(date);
    }
    
    // 페이지 이동 로직은 잠시 주석 처리하고 모달 로직을 먼저 적용합니다.
    // const formattedDate = moment(date).format('YYYY-MM-DD');
    // navigate(`/diet/log/${formattedDate}`);

    // --- 모달 관련 로직 추가 ---
    if (onDateSelect) {
      onDateSelect(date); // 상위 컴포넌트에 선택된 날짜 전달
    }
    // --- 모달 관련 로직 끝 ---
  };

  const formatDay = (locale, date) => {
    return moment(date).format('D');
  };

  // --- 기록된 날짜 표시 로직 추가 ---
  const tileContent = ({ date, view }) => {
    // 'month' 뷰일 때만 표시
    if (view === 'month') {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      // recordedDates 배열에 현재 날짜가 포함되어 있는지 확인
      if (recordedDates && recordedDates.includes(formattedDate)) {
        return <div className="record-indicator" />; // 기록 표시 점 렌더링
      }
    }
    return null; // 기록이 없으면 아무것도 렌더링하지 않음
  };
  // --- 기록된 날짜 표시 로직 끝 ---

  return (
    <CalendarContainer>
      <Calendar
        onChange={handleDateChange}
        value={selectedDateValue}
        formatDay={formatDay}
        showNeighboringMonth={false}
        tileContent={tileContent} // tileContent prop 추가
      />
    </CalendarContainer>
  );
};

export default DietCalendar;