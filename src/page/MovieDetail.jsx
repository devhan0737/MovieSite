import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchMovieDetail } from "../api/fetchMovieDetail";

const Container = styled.div`
  background: #222020;
  min-height: 100svh;
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  max-width: 1280px;
  display: flex;
  width: 100%;
  gap: 100px;
  border: 1px solid #fff;
`;
const ImgBox = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;
const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  h2 {
    font-size: 2.4rem;
  }
`;

const Detail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MovieDetail = () => {
  const { id } = useParams(); // URL에서 영화 ID를 가져옵니다.
  const { data, isLoading, error } = useQuery(["movieDetail", id], () =>
    fetchMovieDetail(id)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const movie = data;

  console.log("상세페이지 : ", data);

  // 장르 배열을 문자열로 변환
  const genres = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <Container>
      <Contents>
        <ImgBox>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </ImgBox>
        <DetailBox>
          <h2>{movie.title}</h2>
          <Detail>
            <p>{movie.overview}</p>
            <p>Genres: {genres}</p> {/* 장르 출력 */}
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
          </Detail>
        </DetailBox>
      </Contents>
    </Container>
  );
};

export default MovieDetail;
