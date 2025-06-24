import apiClient from "../index";

export const CreateOrUpdateDiet = async ({
  date,
  mealType, // "BREAKFAST" | "LUNCH" | "DINNER"
  foodId,
  foodName,
  amount,
}) => {
  try {
    const response = await apiClient.post("/diet/meal", {
      date,
      mealType,
      foodId,
      foodName,
      amount,
    });

    if (
      response.data &&
      (response.data.status === "SUCCESS" || response.status === 200)
    ) {
      return response.data;
    } else {
      throw new Error(
        response.data.message ||
          "식단 등록 요청에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  } catch (error) {
    if (error.response?.data?.message) {
      console.error("식단등록 요청 실패:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error(
        "서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      console.error("식단등록 요청 실패:", error);
      throw new Error(
        "식단등록 요청에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }
};

export const GetDietByDate = async ({ date }) => {
  try {
    const response = await apiClient.get("/diet/meal", {
      params: { date },
    });

    if (
      response.data &&
      (response.data.status === "SUCCESS" || response.status === 200)
    ) {
      return response.data.data;
    } else {
      throw new Error(
        response.data.message || "식단 데이터를 불러오지 못했습니다."
      );
    }
  } catch (error) {
    if (error.response?.data?.message) {
      console.error("식단 조회 실패:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error(
        "서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      console.error("식단 조회 요청 실패:", error);
      throw new Error("식단 데이터를 불러오지 못했습니다.");
    }
  }
};
