import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 280px;
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  padding: 20px;
`;
const SideMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  li {
    display: flex;
    align-items: center;
    padding-left: 20px;
    width: 100%;
    border-radius: 10px;
    height: 40px;
    border: 1px solid black;
    color: #353535;
  }
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid hotpink;
  }
`;

const SideMenuBar = () => {
  return (
    <Container>
      <SideMenu>
        <li>
          <a href="/">홈</a>
        </li>
        <li>
          <a href="#">카테고리</a>
        </li>
        <li>
          <a href="#">보관함</a>
        </li>
        <li>
          <a href="#">인기 작품</a>
        </li>
      </SideMenu>
    </Container>
  );
};

export default SideMenuBar;
