// src/redux/auth/updateUserThunk.js
import apiClient from "../../api"; // index.js에서 export한 axios 인스턴스

export const updateUserInfo = async ({ height, weight }) => {
  try {
    const response = await apiClient.post("/userStatus", {
      height,
      weight,
    });
    if (
      response.data &&
      (response.data.status === "SUCCESS" || response.status === 200)
    ) {
      return response.data;
    } else {
      throw new Error(
        response.data.message ||
          "정보 수정 요청에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage =
        error.response.data.data?.message || error.response.data.message;
      console.error("회원가입 실패:", errorMessage);
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        "서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      console.error("정보 수정 요청 실패:", error);
      throw new Error("정보 수정 요청에 실패했습니다.");
    }
  }
};
