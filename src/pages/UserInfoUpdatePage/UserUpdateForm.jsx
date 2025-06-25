import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWeight, updateHeight } from "../../redux/auth/authSlice";
import ReusableModal from "../../components/Signup/ReusableModal";
import styled from "styled-components";

const FormWrapper = styled.div`
  width: 50%;
  margin: 80px auto;
  padding: 30px 50px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
`;

const InputWrapper = styled.div`
  margin-bottom: 35px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 10px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  color: #333;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  font-weight: bold;
  background-color: rgb(134, 193, 235);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: rgb(75, 142, 186);
  }
  &:active {
    background-color: rgb(134, 193, 235);
  }
`;

const UserUpdateForm = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.token.accessToken);
  const [userInfo, setUserInfo] = useState({ height: "", weight: "" });
  useEffect(() => {
    // 저장되어있는 유저의 몸무게와 키 데이터를 받아와서 setUserInfo({})
  }, []);
  const [modal, setModal] = useState({
    show: false,
    message: "",
    buttonText: "확인",
    onConfirm: () => setModal((prev) => ({ ...prev, show: false })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!userInfo.height && !userInfo.weight) {
      setModal({
        show: true,
        message: "변경할 정보를 입력하세요.",
        buttonText: "확인",
        onConfirm: () => setModal((prev) => ({ ...prev, show: false })),
      });
      return;
    }

    try {
      const updated = await updateUser(
        {
          height: parseInt(userInfo.height) || null,
          weight: parseInt(userInfo.weight) || null,
        },
        accessToken
      );

      // 응답에 따라 상태 반영
      if (updated.height !== null && updated.height !== undefined) {
        dispatch(updateHeight(updated.height));
      }
      if (updated.weight !== null && updated.weight !== undefined) {
        dispatch(updateWeight(updated.weight));
      }

      setModal({
        show: true,
        message: "정보가 성공적으로 수정되었습니다.",
        buttonText: "확인",
        onConfirm: () => setModal((prev) => ({ ...prev, show: false })),
      });
    } catch (err) {
      setModal({
        show: true,
        message: err.message || "업데이트에 실패했습니다.",
        buttonText: "닫기",
        onConfirm: () => setModal((prev) => ({ ...prev, show: false })),
      });
    }
  };

  return (
    <>
      <FormWrapper>
        <FormTitle>내 정보 수정</FormTitle>

        <InputWrapper>
          <Label htmlFor="height">키(cm)</Label>
          <Input
            type="number"
            name="height"
            id="height"
            value={userInfo.height}
            onChange={handleChange}
            min={0}
            placeholder="예: 175"
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="weight">몸무게(kg)</Label>
          <Input
            type="number"
            name="weight"
            id="weight"
            value={userInfo.weight}
            onChange={handleChange}
            min={0}
            placeholder="예: 70"
          />
        </InputWrapper>

        <SubmitButton onClick={handleSubmit}>수정하기</SubmitButton>
      </FormWrapper>

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

export default UserUpdateForm;
