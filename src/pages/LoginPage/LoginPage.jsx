import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login_Form from "../../components/Login/Login_Form";

const LoginPageWrapper = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;
const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <Login_Form />
    </LoginPageWrapper>
  );
};

export default LoginPage;
