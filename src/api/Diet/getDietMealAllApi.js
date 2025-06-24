import apiClient from "../index"; // apiClient의 경로를 확인하세요.

/**
 * 특정 월에 기록된 식단 날짜를 백엔드에서 가져오는 API 함수.
 * @param {string} month - 'YYYY-MM' 형식의 월 문자열 (예: '2025-06').
 * @returns {Promise<string[]>} 기록된 날짜 문자열 배열 (예: ['2025-06-01', '2025-06-15']).
 * @throws {Error} API 호출 실패 시 에러 발생.
 */
export const RecordedDietDates = async (month) => {
  try {
    const response = await apiClient.get(`/diet/meal/all`, {
      params: { month: month }
    });

    // 백엔드 응답 구조에 따라 'response.data'를 조정해야 합니다.
    // 예: { status: "SUCCESS", data: ["2025-06-01", "2025-06-05"] }
    // 또는 단순히 ["2025-06-01", "2025-06-05"] 배열을 직접 반환하는 경우
    if(response.data && Array.isArray(response.data)) {
        return response.data; // 예시: response.data 자체가 배열인 경우
    }
    else {
      throw new Error("기록된 날짜 데이터 형식이 올바르지 않습니다.");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
    
      console.error("식단 기록을 불러오는 데 실패했습니다:", errorMessage); 

      throw new Error(errorMessage);

    } else if (error.request) {
      
      console.error("식단 기록을 불러오는 데 실패했습니다: 서버로부터 응답을 받지 못했습니다.", error);

      throw new Error(
        "서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      
      console.error("식단 기록을 불러오는 데 실패했습니다: 요청 오류", error);

      throw new Error(
        
        "식단 기록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }
};