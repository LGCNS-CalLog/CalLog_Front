import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // react-calendar 기본 CSS 임포트
import moment from 'moment'; // moment 라이브러리 임포트

// 이 부분은 스타일 컴포넌트나 일반적인 div/button 태그로 대체되어야 합니다.
// 여기서는 간단히 div와 button으로 대체하겠습니다.
const CalendarContainer = ({ children }) => <div style={{ margin: '20px', border: '1px solid #ccc', padding: '10px' }}>{children}</div>;
const DropdownButton = ({ onClick, children }) => <button onClick={onClick} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>{children}</button>;
const CalendarWrapper = ({ isOpen, children }) => (
  <div style={{ display: isOpen ? 'block' : 'none', marginTop: '10px' }}>
    {children}
  </div>
);

const DietCalendar = ({ onChange, value }) => {
  const [nowDate, setNowDate] = useState("날짜를 선택하세요"); // 초기값 변경
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDateValue, setSelectedDateValue] = useState(new Date()); // Calendar value를 위한 상태 추가

  // 컴포넌트 마운트 시 오늘 날짜로 초기화
  React.useEffect(() => {
    setNowDate(moment(selectedDateValue).format("YYYY년 MM월 DD일"));
  }, [selectedDateValue]);

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (date) => { // 'date'는 react-calendar에서 넘겨주는 값
    setSelectedDateValue(date); // 내부 상태 업데이트
    if (onChange) { // 부모 컴포넌트에 onChange prop이 있다면 호출
      onChange(date);
    }
    setIsOpen(false);
    setNowDate(moment(date).format("YYYY년 MM월 DD일"));
  };

  return (
    <CalendarContainer>
      <DropdownButton onClick={handleToggleCalendar}>{nowDate}</DropdownButton>
      <CalendarWrapper isOpen={isOpen}>
        <Calendar onChange={handleDateChange} value={selectedDateValue} /> {/* 내부 상태로 value 관리 */}
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default DietCalendar;