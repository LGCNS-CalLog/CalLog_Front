// src/hooks/useHandleSubmit.js
import { SignUp } from "../../api/SignUp/signUpApi";
export const handleSubmit = async ({ userData, setErrors }) => {
  // 초기화
  setErrors({
    username: "",
    password: "",
    nickname: "",
  });

  let formIsValid = true;
  const newErrors = {};

  // 필수 입력값 검증
  if (!userData.username) {
    formIsValid = false;
    newErrors.username = "아이디 값이 필요합니다.";
  }
  if (!userData.password) {
    formIsValid = false;
    newErrors.password = "비밀번호 값이 필요합니다.";
  }
  if (!userData.nickname) {
    formIsValid = false;
    newErrors.nickname = "닉네임 값이 필요합니다.";
  }

  setErrors(newErrors);

  // 모든 입력값이 유효할 경우 서버에 요청
  if (formIsValid) {
    try {
      const res = await SignUp(userData);
      console.log("회원가입 성공:", res);
      return res;
    } catch (error) {
      console.error("회원가입 에러:", error.message);
      throw error;
    }
  }
};
