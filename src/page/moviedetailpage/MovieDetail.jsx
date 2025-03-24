import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";

import { fetchMovieDetail } from "../../api/fetchMovieDetail";
import { fetchMovieTrailers } from "../../api/fetchMovieTrailers";
import { fetchMovieCredits } from "../../api/fetchMovieCredits"; // 출연진 불러오는 함수

import MovieTrailer from "./MovieTrailer";
import MovieDetialBox from "./MovieDetialBox";
import { mq } from "../../lib/media-query/mediaQuery";
import MovieTopContents from "./MovieTopContents";

// 🧱 스타일 컴포넌트
const Container = styled.div`
  padding: 64px 4% 0;
  background: #222020;
  min-height: 100svh;
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
`;

const Contents = styled.div`
  padding-top: 40px;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 40px;
  ${mq("desktop")} {
    flex-direction: row;
  }
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const MovieDetail = () => {
  const { id } = useParams();

  // ✅ 영화 상세 정보 useQuery로 가져오기
  const { data, isLoading, error } = useQuery(["movieDetail", id], () =>
    fetchMovieDetail(id)
  );

  // ✅ 예고편 상태
  const [trailers, setTrailers] = useState([]);
  const [loadingTrailers, setLoadingTrailers] = useState(true);

  // ✅ 출연진 상태
  const [cast, setCast] = useState([]);

  // ✅ 예고편 불러오기
  useEffect(() => {
    const fetchMovieTrailersData = async () => {
      try {
        const trailerData = await fetchMovieTrailers(id);
        setTrailers(trailerData);
        setLoadingTrailers(false);
      } catch (error) {
        console.error("Error fetching trailers:", error);
        setLoadingTrailers(false);
      }
    };

    if (id) {
      fetchMovieTrailersData();
    }
  }, [id]);

  // ✅ 출연진 불러오기
  useEffect(() => {
    const fetchCastData = async () => {
      try {
        const credits = await fetchMovieCredits(id);
        setCast(credits.slice(0, 5)); // 상위 5명만 저장
      } catch (e) {
        console.error("출연진 정보 로딩 실패:", e);
      }
    };

    if (id) {
      fetchCastData();
    }
  }, [id]);
  useEffect(() => {
    console.log("출연진 데이터:", cast);
  }, [cast]);
  // ✅ 로딩/에러 처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const movie = data;

  // ✅ 장르 문자열로 변환
  const genres = movie.genres.map((genre) => genre.name).join(" ");

  return (
    <Container>
      <Contents>
        <Top>
          <MovieTrailer trailers={trailers} loadingTrailers={loadingTrailers} />
          <MovieTopContents movie={movie} genres={genres} />
        </Top>
        <MovieDetialBox movie={movie} genres={genres} cast={cast} />
      </Contents>
    </Container>
  );
};

export default MovieDetail;
