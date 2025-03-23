import React from "react";
import star from "../../assets/img/star-fill.svg";
import styled from "styled-components";

const TopContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Title = styled.h2`
  font-size: 2.4rem;
`;
const Summary = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  font-size: 1.4rem;
  padding-left: 4px;
`;
const Average = styled.div`
  display: flex;
  font-size: 1.4rem;
  height: 20px;
  align-items: center;
  color: yellow;
  img {
    width: 14px;
    height: 14px;
  }
`;
const Button = styled.button`
  width: 100%;
  border: none;
  background: #4515f5;
  height: 48px;
  border-radius: 10px;
  font-weight: 700;
`;
const MovieTopContents = ({ movie, genres }) => {
  return (
    <div>
      <TopContents>
        <Title>{movie.title}</Title>
        <Summary>
          <Average>
            <img src={star} alt="" />
            {movie.vote_average}
          </Average>
          {genres}
        </Summary>

        <Button>재생하기</Button>
      </TopContents>
    </div>
  );
};

export default MovieTopContents;
