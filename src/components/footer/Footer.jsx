import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  min-height: 200px;
  background: black;
  display: flex;
  justify-content: center;
`;
const Contents = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  width: 100%;
  color: #fff;
  ul {
    display: flex;
    gap: 20px;
    width: 400px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Contents>
        <ul>
          <li>
            <a href="#">로그인</a>
          </li>
          <li>
            <a href="#">회원가입</a>
          </li>
          <li>
            <a href="#">광고문의</a>
          </li>
          <li>
            <a href="#">비상주소 확인하기</a>
          </li>
        </ul>
      </Contents>
    </Container>
  );
};

export default Footer;
