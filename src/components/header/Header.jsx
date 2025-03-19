import React from "react";
import styled from "styled-components";

const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000;
  padding: 0 20px;
  color: #fff;
  height: 64px;
`;
const Logo = styled.header``;
const RightContents = styled.header`
  color: #fff;
`;

const Header = () => {
  return (
    <Container>
      <Logo>MOVIE</Logo>
      <RightContents>
        <a href="#">login</a>
        <a href="#">joinus</a>
      </RightContents>
    </Container>
  );
};

export default Header;
