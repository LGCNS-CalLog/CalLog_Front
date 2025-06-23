import React from "react";
import SignUp_Form from "../../components/Signup/Signup_Form";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HEADER_HEIGHT } from "../../components/Header/Header";
// const PageWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   padding: 0px;
//   box-sizing: border-box;
// `;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 16px;
  margin: 0 auto; /* ⭐ 추가: 가로 가운데 정렬 */
  box-sizing: border-box;
  background-color: transparent;
`;

const SignUP_Page = () => {
  // const navigate = useNavigate();
  // const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/", { replace: true });
  //   }
  // }, [isAuthenticated, navigate]);
  return (
    <PageWrapper>
      <SignUp_Form />
    </PageWrapper>
  );
};

export default SignUP_Page;
