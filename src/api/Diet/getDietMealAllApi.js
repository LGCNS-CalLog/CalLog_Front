import apiClient from "../index";

export const RecordedDietDates = async (monthMoment) => {
  const yearMonth = monthMoment.format("YYYY-MM");

  try {
    const response = await apiClient.get("/diet/meal/all", {
      params: {
        yearMonth,
      },
    });

    if (response.status === 200) {
      console.log(response);
      return response.data.data;
    } else {
      throw new Error(
        response.data?.message || "식단 기록 데이터를 불러오지 못했습니다."
      );
    }
  } catch (error) {
    console.error("식단 기록 불러오기 실패:", error);
    throw error;
  }
};
