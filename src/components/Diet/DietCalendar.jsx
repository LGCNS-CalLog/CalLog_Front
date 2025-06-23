import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../Header/Header';

const CalendarTitle = styled.h2` // h1 대신 h2를 사용하여 페이지 전체 제목과의 계층 구조를 명확히 할 수 있습니다.
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem; /* 달력과의 간격 */
  font-size: 2rem; /* h1보다 약간 작게 */
  font-weight: 700;
  width: 100%; /* 부모 컨테이너 너비를 채우도록 설정 */
  margin-top: 0px !important
`;

const CalendarContainer = styled.div`
  width: calc(100vw - 40px); /* <-- 변경 */
  max-width: 1200px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // min-height: calc(100vh - ${HEADER_HEIGHT});
  box-sizing: border-box;

  .react-calendar {
    width: 100%;
    max-width: 1200px;
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
    margin-top: 1.5rem;
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

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: #3498db !important; /* 토요일 요일 파란색 */
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #ff8349 !important; /* 일요일 요일 빨간색 */
  }

  /* 요일 (월, 화, 수...) */
  .react-calendar__month-view__weekdays abbr {
    font-weight: 600;
    color: #7f8c8d; /* 기본 요일 색상 (평일) */
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  
  /* 각 날짜 타일 */
  .react-calendar__tile {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem 0.5rem;
    height: 120px;
    box-sizing: border-box;

    font-size: 1.1rem;
    /* color: #4a4a4a; <--- 여기서는 제거하거나, 아래 abbr에 정의된 기본색상이 적용되도록 합니다. */
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .react-calendar__tile abbr {
    margin-bottom: 10px;
    color: #4a4a4a; /* 기본 날짜 숫자 색상 */
  }

  /* --- 주말 날짜 숫자 색상 (tileClassName으로 추가된 클래스 활용) --- */
  .react-calendar__tile.saturday-tile abbr { /* .react-calendar__tile과 .saturday-tile 클래스가 모두 있는 경우의 abbr */
    color: #3498db !important;
  }

  .react-calendar__tile.sunday-tile abbr { /* .react-calendar__tile과 .sunday-tile 클래스가 모두 있는 경우의 abbr */
    color: #ff8349 !important;
  }
  /* --- 주말 날짜 숫자 색상 끝 --- */

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
      color: #94bcc0 !important; /* 오늘 날짜 색상 강제 적용 */
    }
  }

  /* 선택된 날짜 */
  .react-calendar__tile--active {
    background-color: #94bcc0 !important;
    color: #ffffff !important;
    border-radius: 8px;
    font-weight: 700;

    abbr {
      color: #ffffff !important; /* 선택된 날짜 색상 강제 적용 */
    }
  }

  /* 인접한 달 날짜 숨기기 */
  .react-calendar__month-view__days__day--neighboringMonth {
    visibility: hidden;
  }

  /* --- 기록 표시 스타일 --- */
  .record-indicator {
    width: 8px;
    height: 8px;
    background-color: #ffc107;
    border-radius: 50%;
    animation: pulse 1.5s infinite alternate;
    margin-top: 2px;
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

const DietCalendar = ({ onChange, value, onDateSelect, recordedDates, onMonthChange }) => {
  const [selectedDateValue, setSelectedDateValue] = useState(value || new Date());

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
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const formatDay = (locale, date) => {
    return moment(date).format('D');
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      if (Array.isArray(recordedDates) && recordedDates.includes(formattedDate)) {
        return <div className="record-indicator" />;
      }
    }
    return null;
  };

  // --- tileClassName prop을 위한 함수 ---
  const tileClassName = ({ date, view }) => {
    // view가 'month'일 때만 클래스를 적용 (선택 사항이지만, 월 뷰에서만 작동하게 제한)
    if (view === 'month') {
      if (date.getDay() === 0 /* 일요일 */) {
        return 'sunday-tile';
      }
      if (date.getDay() === 6 /* 토요일 */) {
        return 'saturday-tile';
      }
    }
    return null; // 다른 뷰나 평일은 클래스 없음
  };
  // --- tileClassName prop을 위한 함수 끝 ---

  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view === 'month' && onMonthChange) {
      onMonthChange(activeStartDate);
    }
  };

  return (
    <CalendarContainer>
      <CalendarTitle>나의 식단 캘린더 🍽️</CalendarTitle>
      <Calendar
        calendarType = "gregory"
        onChange={handleDateChange}
        value={selectedDateValue}
        formatDay={formatDay}
        showNeighboringMonth={false}
        tileContent={tileContent}
        onActiveStartDateChange={handleActiveStartDateChange}
        tileClassName={tileClassName}
      />
    </CalendarContainer>
  );
};

export default DietCalendar;