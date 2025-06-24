import apiClient from "../index";

export const getFoodInfoApi = async (payload) => {
  try {
    const response = await apiClient.get("/diet/food", {
      params: payload,
    });
    console.log(response);
    if (response.data && response.data.status === "SUCCESS") {
      return response.data;
    } else {
      throw new Error(response.data.message || "음식 정보 검색에 실패했습니다");
    }
  } catch (error) {
    console.error("음식 정보 검색에 실패했습니다", error);

    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error(
        "서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      throw new Error("음식 정보 검색에 실패했습니다");
    }
  }
};
