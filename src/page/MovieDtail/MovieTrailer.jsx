import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const TrailerBox = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 유지 */
  height: 0;
  overflow: hidden;
  border-radius: 10px;
`;

const FallbackPoster = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${({ posterUrl }) => `url(${posterUrl})`};
  background-size: cover;
  background-position: center;
  filter: brightness(0.4) blur(2px); /* 어둡고 흐릿하게 */
`;

const FallbackOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.6rem;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 10px;
`;

const MovieTrailer = ({ trailers, loadingTrailers, movie }) => {
  const posterUrl =
    movie?.backdrop_path || movie?.poster_path
      ? `https://image.tmdb.org/t/p/w780${
          movie.backdrop_path || movie.poster_path
        }`
      : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
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
      {loadingTrailers ? (
        <TrailerBox>
          <FallbackOverlay>로딩중...</FallbackOverlay>
        </TrailerBox>
      ) : (
        <TrailerBox>
          {trailers.length > 0 ? (
            <StyledIframe
              id={`trailer-${trailers[0].key}`}
              src={`https://www.youtube.com/embed/${trailers[0].key}?autoplay=0&controls=0&modestbranding=1&showinfo=0&rel=0&autohide=1&fs=0&iv_load_policy=3`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={trailers[0].name}
              onMouseEnter={() => handleMouseEnter(trailers[0].key)}
              onMouseLeave={() => handleMouseLeave(trailers[0].key)}
            />
          ) : (
            <>
              <FallbackPoster posterUrl={posterUrl} />
              <FallbackOverlay>🎬 예고편이 제공되지 않습니다</FallbackOverlay>
            </>
          )}
        </TrailerBox>
      )}
      {/* 아래는 예고편 여러개를 불러오는 코드 */}
      {/* {loadingTrailers ? (
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
      )} */}
    </Container>
  );
};

export default MovieTrailer;
