import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchMovieDetail } from "../api/fetchMovieDetail"; // 영화 상세 정보를 가져오는 함수
import { fetchMovieTrailers } from "./../api/fetchMovieTrailers";

const Container = styled.div`
  padding: 0 4%;
  background: #222020;
  min-height: 100svh;
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  padding-top: 56px;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 40px;
`;
const ImgBox = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    min-height: 300px;
    border-radius: 10px;
  }
`;
const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

  // 예고편을 위한 상태
  const [trailers, setTrailers] = useState([]);
  const [loadingTrailers, setLoadingTrailers] = useState(true);

  // 영화 데이터와 예고편 데이터를 동시에 불러오기
  useEffect(() => {
    const fetchMovieTrailersData = async () => {
      try {
        const trailerData = await fetchMovieTrailers(id); // 예고편 데이터 가져오기
        setTrailers(trailerData); // 예고편 상태 설정
        setLoadingTrailers(false); // 예고편 로딩 완료
        console.log("Fetched trailers:", trailerData); // 콘솔에 예고편 데이터 출력
      } catch (error) {
        console.error("Error fetching trailers:", error);
        setLoadingTrailers(false); // 에러 발생 시에도 로딩 종료
      }
    };

    if (id) {
      fetchMovieTrailersData();
    }
  }, [id]); // id가 변경될 때마다 호출

  // 콘솔에 트레일러 상태 출력
  useEffect(() => {
    console.log("Current trailers state:", trailers);
  }, [trailers]); // trailers 상태가 변경될 때마다 콘솔 출력

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const movie = data;

  // 장르 배열을 문자열로 변환
  const genres = movie.genres.map((genre) => genre.name).join(", ");

  // iframe URL에 autoplay와 요소 숨기기 파라미터 추가
  const handleMouseEnter = (key) => {
    const iframe = document.getElementById(`trailer-${key}`);
    iframe.src = `https://www.youtube.com/embed/${key}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&autohide=1&fs=0&iv_load_policy=3`; // 호버 시 자동 재생 및 요소 숨기기
  };

  const handleMouseLeave = (key) => {
    const iframe = document.getElementById(`trailer-${key}`);
    iframe.src = `https://www.youtube.com/embed/${key}?autoplay=0&controls=0&modestbranding=1&showinfo=0&rel=0&autohide=1&fs=0&iv_load_policy=3`; // 마우스 떠날 때 재생 중지
  };

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
            <p>장르 : {genres}</p>
            <p>개봉일 : {movie.release_date}</p>
            <p>평점 : {movie.vote_average}</p>
          </Detail>

          {/* 예고편 표시 */}
          <h3>예고편</h3>
          {loadingTrailers ? (
            <div>Loading trailers...</div>
          ) : trailers && trailers.length > 0 ? (
            trailers.map((trailer) => (
              <div key={trailer.id}>
                <h4>{trailer.name}</h4>
                <iframe
                  id={`trailer-${trailer.key}`} // iframe id 설정
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&controls=0&modestbranding=1&showinfo=0&rel=0&autohide=1&fs=0&iv_load_policy=3`} // 기본 autoplay=0
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onMouseEnter={() => handleMouseEnter(trailer.key)} // 호버 시 자동 재생
                  onMouseLeave={() => handleMouseLeave(trailer.key)} // 마우스 떠날 때 자동 재생 중지
                ></iframe>
              </div>
            ))
          ) : (
            <p>예고편이 없네여;;</p>
          )}
        </DetailBox>
      </Contents>
    </Container>
  );
};

export default MovieDetail;
