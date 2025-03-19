import React from "react";
import styled from "styled-components";
import MovieList from "../slide/MovieList";
import SideMenuBar from "../header/SideMenuBar";
import CategorySlider from "../slide/CategorySlider";

const Container = styled.section`
  width: 100%;
  display: flex;
  gap: 20px; /* 사이드바와 콘텐츠 간의 간격 */
`;
const Contents = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MainHome = () => {
  return (
    <Container>
      <SideMenuBar />
      <Contents>
        <MovieList />
        {/* <CategorySlider /> */}
      </Contents>
    </Container>
  );
};

export default MainHome;
