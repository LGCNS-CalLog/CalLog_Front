import React, { useState } from "react"; // useState는 DietCalendar의 값 관리를 위해 필요
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Router, Routes, Route는 유지하되, 현재는 Route가 DietCalendar를 직접 렌더링하지 않음
import GlobalStyle from "./assets/GlobalStyles";
import RegistrationPage from "./pages/SignupPage/Signup_Page";
import Day_Diet_page from "./pages/DayDietPage/Day_Diet_page";
import DietPage from "./pages/DietPage/DietPage";
import FoodInfoPage from "./pages/FoodInfoPage/FoodInfoPage";
import MainPage from "./pages/MainPage/MainPage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/day/diet/:date" element={<Day_Diet_page />} />
            <Route path="/foodInfo/:keyword?" element={<FoodInfoPage />} />
            <Route path="/diet" element={<DietPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/userPage" element={<UserPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
