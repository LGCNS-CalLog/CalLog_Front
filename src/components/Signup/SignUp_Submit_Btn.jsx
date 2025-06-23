import React from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
  background-color: rgb(134, 193, 235);
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgb(75, 142, 186);
    transform: scale(1.05);
  }

  &:active {
    background-color: rgb(134, 193, 235);
  }
`;

const SignUp_Submit = ({ onClick }) => {
  return (
    <SubmitButton type="button" onClick={onClick}>
      회원가입
    </SubmitButton>
  );
};

export default SignUp_Submit;
