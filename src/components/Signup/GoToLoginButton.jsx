import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  button {
    padding: 7px 7px;
    background-color: #4caf50;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover {
    background-color: #45a049;
  }

  button svg {
    margin-right: 5px;
  }
`;

const GoToLoginButton = ({ to = "/registration" }) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate(to);
  };

  return (
    <ButtonWrapper>
      <button onClick={goToLogin}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M14 7l-5 5 5 5V7z" fill="#ffffff" />
        </svg>
        로그인
      </button>
    </ButtonWrapper>
  );
};

export default GoToLoginButton;
