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

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/day/diet/:date" element={<Day_Diet_page />} />
            <Route path="/foodInfo" element={<FoodInfoPage />} />
            <Route path="/diet" element={<DietPage />} />
            
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

{
  /* <Router>
      <GlobalStyle />
      <Layout>

        {/* <DietCalendar onChange={handleCalendarChange} value={calendarDate} /> 


      </Layout>
    </Router> */
}

export default App;
