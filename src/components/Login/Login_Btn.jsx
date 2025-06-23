import React from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
  background-color: #87c8ce;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #87c8ce;
    transform: scale(1.05);
  }

  &:active {
    background-color: #87c8ce;
  }
`;

const Login_Submit = ({ onClick }) => {
  return (
    <SubmitButton type="button" onClick={onClick}>
      로그인
    </SubmitButton>
  );
};

export default Login_Submit;
