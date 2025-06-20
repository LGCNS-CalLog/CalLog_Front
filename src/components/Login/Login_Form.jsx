import React, { useState } from "react";
import styled from "styled-components";
import Login_Submit from "./Login_Btn";

const FormWrapper = styled.div`
  position: relative;
  width: 400px;
  margin: 50px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 35px;
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  position: absolute;
  left: 10px;
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
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  background-color: transparent;
  color: #333;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }

  &:focus + ${Label}, &:valid + ${Label} {
    top: -10px;
    font-size: 12px;
    color: #4caf50;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  position: absolute;
  bottom: -30px;
  left: 10px;
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

    // 실시간 에러 초기화
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
      // 로그인 로직 실행 가능
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
          hasError={!!errors.username}
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
          hasError={!!errors.password}
        />
        <Label htmlFor="password">비밀번호</Label>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </InputWrapper>

      <Login_Submit onClick={handleSubmit} />
    </FormWrapper>
  );
};

export default Login_Form;
