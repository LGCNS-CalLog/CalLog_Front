import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login_Submit from "./Login_Btn";
import { login as setToken } from "../../redux/Token/tokenSlice";
import { login as loginApi } from "../../api/Login/loginApi";

const FormWrapper = styled.div`
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px; /* 요소 간 간격 */
`;
const RegisterButton = styled.button`
  background-color: transparent;
  border: none;
  color: #94bcc0;
  font-size: 14px;
  cursor: pointer;
  margin-top: -15px;
  text-decoration: underline;

  &:hover {
    color: #649da1;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #aaa;
  pointer-events: none;
  transition: 0.3s ease;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #94bcc0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #7aa3a6;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 14px 10px;
  font-size: 16px;
  border: 2px solid ${(props) => (props.hasError ? "red" : "#ddd")};
  border-radius: 8px;
  background-color: transparent;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #94bcc0;
  }

  &:focus + ${Label}, &:valid + ${Label} {
    top: -10px;
    font-size: 12px;
    color: #94bcc0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 6px;
  margin-left: 4px;
`;

const Login_Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [modal, setModal] = useState({
    show: false,
    message: "",
    buttonText: "확인",
    onConfirm: () => {},
  });

  const handleRegister = () => {
    navigate("/registration");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };
  const handleSubmit = async () => {
    const newErrors = {
      username: "",
      password: "",
    };
    let isValid = true;

    if (!userData.username.trim()) {
      newErrors.username = "아이디를 입력하세요.";
      isValid = false;
    }
    if (!userData.password.trim()) {
      newErrors.password = "비밀번호를 입력하세요.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("로그인 요청:", userData);
      try {
        const result = await loginApi(userData);
        console.log("서버 응답:", result);
        //const { username, memberId } = result.data.data.userInfo;
        const {
          access: { token: accessToken },
          refresh: { token: refreshToken },
        } = result.data.data.tokens;
        dispatch(setToken({ accessToken, refreshToken }));

        navigate("/");
      } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message;
        setModal({
          show: true,
          message: errorMsg,
          buttonText: "닫기",
          onConfirm: () => setModal((prev) => ({ ...prev, show: false })),
        });
      }
    }
  };

  return (
    <FormWrapper>
      <Title>로그인</Title> {/* 로그인 제목 추가 */}
      <InputWrapper>
        <Input
          type="text"
          id="username"
          value={userData.username}
          onChange={handleChange}
          required
          hasError={errors.username}
          placeholder=" " // Label이 위로 올라가도록 설정
        />
        <Label htmlFor="username">아이디</Label>
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
      </InputWrapper>
      <InputWrapper>
        <Input
          type="password"
          id="password"
          value={userData.password}
          onChange={handleChange}
          required
          hasError={errors.password}
          placeholder=" "
        />
        <Label htmlFor="password">비밀번호</Label>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </InputWrapper>
      <Login_Submit onClick={handleSubmit} />
      <RegisterButton onClick={handleRegister}>회원가입</RegisterButton>
      {modal.show && (
        <ModalOverlay>
          <ModalContent>
            <p>{modal.message}</p>
            <ModalButton onClick={modal.onConfirm}>
              {modal.buttonText}
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </FormWrapper>
  );
};

export default Login_Form;
