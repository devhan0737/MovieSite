import React from "react";
import styled from "styled-components";
import { mq } from "./../../lib/media-query/mediaQuery";
import user from "../../assets/img/user-3-line.svg";
import search from "../../assets/img/search-line.svg";

const Container = styled.header`
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
const Logo = styled.h1``;
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
  return (
    <Container>
      <Wrapper>
        <Logo>MOVIE</Logo>
        <RightContents>
          <a href="#">
            <img src={search} alt="돋보기 아이콘" />
          </a>
          <a href="#">
            <img src={user} alt="유저 아이콘" />
          </a>
        </RightContents>
      </Wrapper>
    </Container>
  );
};

export default Header;
