import React from "react";
import styled from "styled-components";
import { createRoot } from "react-dom/client";

const Container = styled.div`
  width: 100%;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  span {
    font-size: 2rem;
  }
`;

const Detail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MovieDetialBox = ({ movie, genres, cast }) => {
  return (
    <Container>
      <DetailBox>
        <Detail>
          <TextBox>
            <span>시눕시스</span>
            {movie.overview}
          </TextBox>
          <TextBox>
            <span>장르</span>
            {genres}
          </TextBox>
          <TextBox>
            <span>개봉일</span>
            {movie.release_date}
          </TextBox>
          <TextBox>
            <span>출연진</span>
            <ul>
              {cast && cast.length > 0 ? (
                cast.map((actor) => (
                  <li
                    key={actor.cast_id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "12px",
                    }}
                  >
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        style={{
                          width: "45px",
                          height: "68px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "45px",
                          height: "68px",
                          background: "#444",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                    <span>
                      {actor.name} <small>({actor.character})</small>
                    </span>
                  </li>
                ))
              ) : (
                <li>출연진 정보가 없습니다.</li>
              )}
            </ul>
          </TextBox>
        </Detail>
      </DetailBox>
    </Container>
  );
};

export default MovieDetialBox;
