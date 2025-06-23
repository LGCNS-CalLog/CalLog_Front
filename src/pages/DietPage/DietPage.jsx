import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import DietCalendar from '../../components/Diet/DietCalendar';
import DateConfirmationModal from '../../components/Diet/DietModifyModal'; // 모달 임포트
import moment from 'moment'; // 날짜 포맷팅을 위해 moment 임포트
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 임포트

const DietPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);
  const [hasRecordForSelectedDate, setHasRecordForSelectedDate] = useState(false);
  const [recordedDates, setRecordedDates] = useState([]); // 기록된 날짜들을 저장할 상태
  const navigate = useNavigate();

  // --- (가상) 기록된 날짜 데이터 가져오기 로직 ---
  // 실제 앱에서는 이 부분이 백엔드 API 호출을 통해 이루어질 것입니다.
  useEffect(() => {
    const fetchRecordedDates = async () => {
      // 실제 API 호출 대신 가상 데이터 사용
      // 예시: 2025-06-20, 2025-06-23에 기록이 있다고 가정
      const dummyRecordedDates = ['2025-06-20', '2025-06-23', moment().format('YYYY-MM-DD')];
      setRecordedDates(dummyRecordedDates);
    };

    fetchRecordedDates();
  }, []); // 컴포넌트 마운트 시 한 번만 실행
  // --- 기록된 날짜 데이터 가져오기 로직 끝 ---

  // DietCalendar에서 날짜를 선택했을 때 호출될 함수
  const handleDateSelect = (date) => {
    setSelectedDateForModal(date);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    // 선택된 날짜에 기록이 있는지 확인
    setHasRecordForSelectedDate(recordedDates.includes(formattedDate));
    setIsModalOpen(true); // 모달 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDateForModal(null);
  };

  const handleModalConfirm = () => {
    // '예' 버튼 클릭 시의 로직
    setIsModalOpen(false);
    if (selectedDateForModal) {
      const formattedDate = moment(selectedDateForModal).format('YYYY-MM-DD');
      navigate(`/diet/log/${formattedDate}`); // /diet/log/{날짜}로 이동
    }
  };

  return (
    <Layout>
      <DietCalendar
        onDateSelect={handleDateSelect} // 날짜 선택 시 모달 열기 함수 전달
        recordedDates={recordedDates}   // 기록된 날짜 목록 전달
      />

      {isModalOpen && (
        <DateConfirmationModal
          date={selectedDateForModal}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          hasRecord={hasRecordForSelectedDate}
        />
      )}
    </Layout>
  );
};

export default DietPage;