import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import DietCalendar from '../../components/Diet/DietCalendar';
import DateConfirmationModal from '../../components/Diet/DietModifyModal'; // 모달 임포트
import moment from 'moment'; // 날짜 포맷팅을 위해 moment 임포트
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 임포트
import styled from 'styled-components';

const PageTitle = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem; /* 달력과의 간격 */
  font-size: 4rem;
  font-weight: 700;
`;

const DietPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);
  const [hasRecordForSelectedDate, setHasRecordForSelectedDate] = useState(false);
  const [recordedDates, setRecordedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM')); // 현재 달력의 월을 저장할 상태
  const navigate = useNavigate();

  // --- 기록된 날짜 데이터 가져오기 로직 (수정) ---
  useEffect(() => {
    const fetchRecordedDatesForMonth = async (month) => {
      // API 호출 시 로딩 상태 등을 추가할 수 있습니다.
      try {
        // 실제 API 엔드포인트와 인증 방식에 따라 코드를 수정해야 합니다.
        // 예시: `YOUR_BACKEND_API/diet/recorded-dates?month=${month}`
        // 현재는 더미 데이터 사용
        console.log(`백엔드에 ${month} 월의 기록된 날짜 요청...`);
        let data = [];
        if (month === moment().format('YYYY-MM')) { // 현재 월
             data = ['2025-06-01', '2025-06-05', '2025-06-10', '2025-06-15', moment().format('YYYY-MM-DD')];
        } else if (month === moment().subtract(1, 'month').format('YYYY-MM')) { // 지난 달
             data = ['2025-05-02', '2025-05-12', '2025-05-22'];
        } else { // 그 외 월
             data = [];
        }
        setRecordedDates(data);
      } catch (error) {
        console.error("기록된 날짜를 불러오는 데 실패했습니다:", error);
        setRecordedDates([]);
      }
    };

    if (currentMonth) {
      fetchRecordedDatesForMonth(currentMonth);
    }
  }, [currentMonth]); // currentMonth가 변경될 때마다 useEffect 실행
  // --- 기록된 날짜 데이터 가져오기 로직 끝 ---

  const handleDateSelect = (date) => {
    setSelectedDateForModal(date);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setHasRecordForSelectedDate(recordedDates.includes(formattedDate));
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDateForModal(null);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (selectedDateForModal) {
      const formattedDate = moment(selectedDateForModal).format('YYYY-MM-DD');
      navigate(`/day/diet/${formattedDate}`);
    }
  };

  // --- DietCalendar에서 월이 변경될 때 호출될 함수 ---
  const handleCalendarMonthChange = (activeStartDate) => {
    const newMonth = moment(activeStartDate).format('YYYY-MM');
    if (newMonth !== currentMonth) {
      setCurrentMonth(newMonth); // 현재 월 상태 업데이트 -> useEffect가 다시 실행됨
    }
  };
  // --- DietCalendar에서 월이 변경될 때 호출될 함수 끝 ---

  return (
    <>
      <DietCalendar
        onDateSelect={handleDateSelect}
        recordedDates={recordedDates}
        onMonthChange={handleCalendarMonthChange} // prop 전달
      />

      {isModalOpen && (
        <DateConfirmationModal
          date={selectedDateForModal}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          hasRecord={hasRecordForSelectedDate}
        />
      )}
    </>
  );
};

export default DietPage;