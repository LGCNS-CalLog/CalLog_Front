import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
// 예시: 사용자 정보를 가져오거나 업데이트하는 thunk
// import { updateUserProfile } from "../../redux/user/userSlice";

const Wrapper = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: #94bcc0;
  }
`;

const Button = styled.button`
  background-color: #94bcc0;
  color: white;
  font-size: 1rem;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #7aa3a6;
  }
`;

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userInfo || {}); // 키/몸무게 포함된 사용자 정보

  const [height, setHeight] = useState(user?.height || "");
  const [weight, setWeight] = useState(user?.weight || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!height || !weight || height <= 0 || weight <= 0) {
      alert("유효한 키와 몸무게를 입력해주세요.");
      return;
    }

    const updatedProfile = {
      height: Number(height),
      weight: Number(weight),
    };

    // TODO: 서버 요청 and Redux 저장
    // dispatch(updateUserProfile(updatedProfile));
    console.log("수정된 정보:", updatedProfile);
    alert("회원 정보가 수정되었습니다.");
  };

  return (
    <Wrapper>
      <Title>회원 정보 수정</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="height">키 (cm)</Label>
          <Input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="0"
            step="0.1"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="weight">몸무게 (kg)</Label>
          <Input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            step="0.1"
            required
          />
        </FormGroup>
        <Button type="submit">저장하기</Button>
      </form>
    </Wrapper>
  );
};

export default UserPage;
