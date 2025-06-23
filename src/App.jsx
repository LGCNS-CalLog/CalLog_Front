import React, { useState } from "react"; // useState는 DietCalendar의 값 관리를 위해 필요
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Router, Routes, Route는 유지하되, 현재는 Route가 DietCalendar를 직접 렌더링하지 않음

// DietCalendar 컴포넌트를 임포트합니다.
//import DietCalendar from "./components/DietCalendar.jsx";

// GlobalStyle과 Layout 컴포넌트가 현재 App.js 내에 정의되어 있지 않다면,
// 이들을 실제 파일에서 임포트하거나 임시로 정의해야 합니다.
// 여기서는 예시를 위해 간단하게 정의합니다.
const GlobalStyle = () => (
  <style>{`body { margin: 0; padding: 0; box-sizing: border-box; }`}</style>
);
// const Layout = ({ children }) => (
//   <div style={{
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f0f2f5',
//     minHeight: '100vh',
//     display: 'flex',       // DietCalendar를 중앙에 배치하기 위해 flexbox 사용
//     justifyContent: 'center',
//     alignItems: 'center',
//   }}>
//     {children}
//   </div>
// );

function App() {
  // DietCalendar의 value와 onChange prop을 관리하기 위한 상태
  const [calendarDate, setCalendarDate] = useState(new Date());

  const handleCalendarChange = (date) => {
    setCalendarDate(date);
    console.log("선택된 날짜:", date); // 날짜 선택 시 콘솔에 출력하여 확인
  };

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<LoginPage />} />
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
