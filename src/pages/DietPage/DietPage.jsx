import React, { useState, useEffect } from "react";
import DietCalendar from "../../components/Diet/DietCalendar";
import DateConfirmationModal from "../../components/Diet/DietModifyModal";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// API 함수 임포트
import { RecordedDietDates } from "../../api/Diet/getDietMealAllApi";

const DietPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);
  const [hasRecordForSelectedDate, setHasRecordForSelectedDate] =
    useState(false);
  const [recordedDates, setRecordedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"));
  const [loadingDates, setLoadingDates] = useState(true); // 상태 자체는 유지 (필요에 따라)
  const [errorDates, setErrorDates] = useState(null); // 에러 상태는 유지
  const navigate = useNavigate();

  // --- 기록된 날짜 데이터 가져오기 로직 ---
  useEffect(() => {
    const getRecordedDatesFromApi = async () => {
      setLoadingDates(true); // API 호출 시작을 알리는 용도로만 사용 (렌더링에 영향 없음)
      setErrorDates(null); // 새로운 요청 시 에러 상태 초기화

      // 현재 날짜 (년-월)
      const now = moment();
      const currentMonthMoment = moment(currentMonth, "YYYY-MM"); // currentMonth를 moment 객체로 변환

      // 현재 월보다 미래인지 확인
      const isFutureMonth = currentMonthMoment.isAfter(now, "month");

      // if (isFutureMonth) {
      //   // 미래 월인 경우: API 호출 안함, recordedDates 비움, alert 띄우지 않음
      //   console.log(`${currentMonth}는 미래 월이므로 기록을 가져오지 않습니다.`);
      //   setRecordedDates([]); // 미래 월에는 기록이 없으므로 빈 배열로 설정
      //   setLoadingDates(false); // 로딩 종료
      //   return; // 함수 종료
      // }

      // 현재 월 또는 과거 월인 경우: 평소처럼 API 호출 시도
      try {
        const data = await RecordedDietDates(currentMonthMoment);
        setRecordedDates(data); // 성공 시 기록된 날짜 업데이트
      } catch (error) {
        console.error("식단 기록을 불러오는 데 실패했습니다:", error);
        setErrorDates(error.message || "날짜 정보를 불러올 수 없습니다.");

        // 현재 월 또는 과거 월에서만 alert를 띄웁니다.
        alert("식단 기록을 가져오지 못했습니다.");
        setRecordedDates([]); // API 실패 시 기록된 날짜를 비움
      } finally {
        setLoadingDates(false); // 로딩 종료
      }
    };

    if (currentMonth) {
      getRecordedDatesFromApi();
    }
  }, [currentMonth]);

  const handleDateSelect = (date) => {
    setSelectedDateForModal(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");
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
      const formattedDate = moment(selectedDateForModal).format("YYYY-MM-DD");
      navigate(`/day/diet/${formattedDate}`);
    }
  };

  const handleCalendarMonthChange = (activeStartDate) => {
    const newMonth = moment(activeStartDate).format("YYYY-MM");
    if (newMonth !== currentMonth) {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <>
      {/* 달력은 항상 렌더링 */}
      <DietCalendar
        onDateSelect={handleDateSelect}
        recordedDates={recordedDates} // 미래 월인 경우 빈 배열, 그 외는 API 결과 (실패 시 빈 배열)
        onMonthChange={handleCalendarMonthChange}
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
