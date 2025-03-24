import React from "react";
import styled from "styled-components";
import { mq } from "./../../lib/media-query/mediaQuery";
import user from "../../assets/img/user-3-line.svg";
import search from "../../assets/img/search-line.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.header`
  z-index: 4;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  padding: 0 4%;
  color: #fff;
  height: 64px;
  color: #fff;
  ${mq("desktop")} {
  }
`;
const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.h1`
  cursor: pointer;
`;
const RightContents = styled.div`
  display: flex;
  gap: 8px;
  a {
    width: 24px;
    height: 24px;
  }
  img {
    width: 24px;
    height: 24px;
    filter: invert(1);
  }
`;

const Header = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogoClick = () => {
    navigate(`/`); // 영화 클릭 시 상세 페이지로 이동
  };
  const handleMovieClick = () => {
    navigate(`/login`); // 영화 클릭 시 상세 페이지로 이동
  };

  return (
    <Container>
      <Wrapper>
        <Logo onClick={handleLogoClick}>MOVIE</Logo>
        <RightContents>
          <a href="#">
            <img src={search} alt="돋보기 아이콘" />
          </a>
          <a href="#" onClick={handleMovieClick}>
            <img src={user} alt="유저 아이콘" />
          </a>
        </RightContents>
      </Wrapper>
    </Container>
  );
};

export default Header;
