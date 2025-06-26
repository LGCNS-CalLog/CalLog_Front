import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetRegistrationState,
} from "../../redux/registration/registrationSlice";
import styled from "styled-components";
import SignUp_Submit_Btn from "./SignUp_Submit_Btn";
import GoToButton from "./GoToLoginButton";
import ReusableModal from "./ReusableModal";
import { useNavigate } from "react-router-dom";

import Male from "../../assets/images/male.png";
import Female from "../../assets/images/female.png";

const FormWrapper = styled.div`
  width: 720px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 25px;
  position: relative;
  width: 100%;
`;
const GenderLabel = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;
const GenderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 25px;
`;

const GenderBox = styled.div`
  width: 100px;
  height: 100px;
  border: 3px solid ${({ selected }) => (selected ? "#4caf50" : "#ddd")};
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  background-color: ${({ selected }) => (selected ? "#e8f5e9" : "#fff")};
  transition: 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
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
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: transparent;
  color: #333;

  &:focus {
    border-color: #4caf50;
    outline: none;
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
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
`;

const SignUp_Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.registration);

  const [modal, setModal] = useState({
    show: false,
    message: "",
    buttonText: "확인",
    onConfirm: () => {},
  });

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    height: "", // cm
    age: "", // 세
    weight: "", // kg
    gender: "", // "male" 또는 "female"
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    height: "",
    age: "",
    weight: "",
    gender: "",
  });

  useEffect(() => {
    if (status === "failed" && error) {
      setModal({
        show: true,
        message: error, // 실패 메시지 설정
        buttonText: "닫기",
        onConfirm: () => {
          setModal((prev) => ({ ...prev, show: false }));
          dispatch(resetRegistrationState()); // 상태 초기화
        },
      });
    } else if (status === "succeeded") {
      setModal({
        show: true,
        message: "회원가입이 완료되었습니다.",
        buttonText: "로그인하러 가기",
        onConfirm: () => {
          setModal({ ...modal, show: false });
          dispatch(resetRegistrationState()); // 상태 초기화
          navigate("/login");
        },
      });
    }
  }, [status, error, navigate]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setErrors({
      username: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      height: "",
      age: "",
      weight: "",
      gender: "",
    });

    let formIsValid = true;
    const newErrors = {};

    if (!userData.username) {
      formIsValid = false;
      newErrors.username = "아이디 값이 필요합니다.";
    }
    if (!userData.password) {
      formIsValid = false;
      newErrors.password = "비밀번호 값이 필요합니다.";
    }
    if (userData.passwordCheck != userData.password) {
      formIsValid = false;
      newErrors.passwordCheck =
        "비밀번호 확인값이 비밀번호의 값과 일치하지 않습니다.";
    }
    if (!userData.nickname) {
      formIsValid = false;
      newErrors.nickname = "닉네임 값이 필요합니다.";
    }
    if (!userData.height) {
      formIsValid = false;
      newErrors.height = "키를 입력해주세요";
    }
    if (!userData.age) {
      formIsValid = false;
      newErrors.age = "태어난 연도를 입력해주세요";
    }
    if (!userData.weight) {
      formIsValid = false;
      newErrors.weight = "몸무게 입력해주세요";
    }
    if (!userData.gender) {
      formIsValid = false;
      newErrors.gender = "성별을 선택해주세요";
    }

    setErrors(newErrors);

    if (formIsValid) {
      await dispatch(registerUser(userData));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <FormWrapper>
        <GoToButton to="/" />
        <FormTitle>회원 가입</FormTitle>

        {/* 입력 필드들 */}
        <InputWrapper>
          <Input
            type="text"
            id="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
          <Label htmlFor="username">ID</Label>
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <Label htmlFor="password">Password</Label>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            id="passwordCheck"
            value={userData.passwordCheck}
            onChange={handleChange}
            required
          />
          <Label htmlFor="passwordCheck">Password 확인</Label>
          {errors.passwordCheck && (
            <ErrorMessage>{errors.passwordCheck}</ErrorMessage>
          )}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="text"
            id="nickname"
            value={userData.nickname}
            onChange={handleChange}
            required
          />
          <Label htmlFor="nickname">Nickname</Label>
          {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
        </InputWrapper>

        {/*       */}
        {/* 키 입력 */}
        <InputWrapper>
          <Input
            type="number"
            id="height"
            value={userData.height}
            onChange={handleChange}
            required
          />
          <Label htmlFor="height">키(cm)</Label>
          {errors.height && <ErrorMessage>{errors.height}</ErrorMessage>}
        </InputWrapper>

        {/* 나이 입력 */}
        <InputWrapper>
          <Input
            type="number"
            id="age"
            value={userData.age}
            onChange={handleChange}
            required
          />
          <Label htmlFor="age">태어난 연도</Label>
          {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
        </InputWrapper>

        {/* 몸무게 입력 */}
        <InputWrapper>
          <Input
            type="number"
            id="weight"
            value={userData.weight}
            onChange={handleChange}
            required
          />
          <Label htmlFor="weight">몸무게(kg)</Label>
          {errors.weight && <ErrorMessage>{errors.weight}</ErrorMessage>}
        </InputWrapper>

        {/* 성별 선택 */}
        <InputWrapper>
          <GenderLabel>성별</GenderLabel>
          <GenderWrapper>
            <GenderBox
              selected={userData.gender === "MALE"}
              onClick={() =>
                setUserData((prev) => ({
                  ...prev,
                  gender: "MALE",
                }))
              }
            >
              <img src={Male} alt="남성" />
            </GenderBox>

            <GenderBox
              selected={userData.gender === "FEMALE"}
              onClick={() =>
                setUserData((prev) => ({
                  ...prev,
                  gender: "FEMALE",
                }))
              }
            >
              <img src={Female} alt="여성" />
            </GenderBox>
          </GenderWrapper>

          {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
        </InputWrapper>

        {/*        */}
        <SignUp_Submit_Btn onClick={onSubmit} disabled={status === "loading"} />
      </FormWrapper>

      {/* 모달 렌더 */}
      {modal.show && (
        <ReusableModal
          message={modal.message}
          buttonText={modal.buttonText}
          onConfirm={modal.onConfirm}
        />
      )}
    </>
  );
};

export default SignUp_Form;
