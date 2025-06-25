import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import BMICard from "../../components/Main/BMICard";
import BMRCard from "../../components/Main/BMRCard";
import MapCard from "../../components/Main/MapCard";
import { FaCalendarAlt } from "react-icons/fa";

const Container = styled.div`
  font-family: sans-serif;
`;

const StickyNavWrapper = styled.div`
  position: sticky;
  top: 50px; /* 헤더 높이만큼 고정 위치 */
  z-index: 100;
  padding: 0.5rem 0;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #f3f4f6;
  padding: 0rem;
  border-radius: 1rem;
  margin: 1rem auto;
  max-width: 900px;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavButton = styled.button`
  background-color: ${(props) => (props.active ? "#5a6fd8" : "#e5e7eb")};
  color: ${(props) => (props.active ? "#ffffff" : "#1f2937")};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${(props) => (props.active ? "scale(1.05)" : "scale(1)")};

  &:hover {
    background-color: #c7d2fe;
  }
`;

const Section = styled.section`
  height: 100vh;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #1f2937;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  margin: 1rem auto;
  border-radius: 1rem;
  max-width: 1000px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
`;

const MainPage = () => {
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  const sections = [
    { id: "image1", title: "오늘의 추천" },
    { id: "image2", title: "건강 분석" },
    { id: "image3", title: "활동 기록" },
    { id: "image4", title: "나의 목표" },
    { id: "image5", title: "건강 뉴스" },
  ];

  const [activeId, setActiveId] = useState("image1");
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { threshold: 0.6 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return isAuthenticated ? (
    <CardsWrapper>
      <MapCard
        title="나의 식단 캘린더 🍽️"
        description="오늘 섭취한 음식과 영양소를 기록하고, 나의 식단 목표를 관리해보세요!"
        to="/diet"
        icon={FaCalendarAlt}
      />
      <BMICard />
      <BMRCard />
    </CardsWrapper>
  ) : (
    <Container>
      <StickyNavWrapper>
        <NavContainer>
          {sections.map(({ id, title }) => (
            <NavButton
              key={id}
              active={activeId === id}
              onClick={() => scrollTo(id)}
            >
              {title}
            </NavButton>
          ))}
        </NavContainer>
      </StickyNavWrapper>

      {sections.map(({ id, title }) => (
        <Section key={id} id={id} ref={(el) => (sectionRefs.current[id] = el)}>
          섹션 콘텐츠: {title}
        </Section>
      ))}
    </Container>
  );
};

export default MainPage;
