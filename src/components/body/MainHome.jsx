import React from "react";
import styled from "styled-components";
import MovieGenreList from "../slide/MovieGenreList";

const Container = styled.section`
  width: 100%;
  display: flex;
  gap: 20px; /* 사이드바와 콘텐츠 간의 간격 */
  background: #222020;
  padding: 0 4%;
  justify-content: center;
`;
const Contents = styled.section`
  max-width: 1280px;
  width: 100%;
  /* padding: 0 20px; */
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MainHome = () => {
  return (
    <Container>
      <Contents>
        <MovieGenreList />
      </Contents>
    </Container>
  );
};

export default MainHome;
