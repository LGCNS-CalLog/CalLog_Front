import React, { useState } from "react";
import styled from "styled-components";
import Login_Submit from "./Login_Btn";

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
    border-color: #87c8ce;
  }

  &:focus + ${Label}, &:valid + ${Label} {
    top: -10px;
    font-size: 12px;
    color: #87c8ce;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 6px;
  margin-left: 4px;
`;

const Login_Form = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

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
      // 로그인 API 호출 등 로직 추가 가능
    }
  };

  return (
    <FormWrapper>
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
    </FormWrapper>
  );
};

export default Login_Form;
