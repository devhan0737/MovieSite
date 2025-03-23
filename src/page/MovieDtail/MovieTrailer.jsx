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
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 10px;
  }
`;

const MovieTrailer = ({ trailers, loadingTrailers }) => {
  // const handleMouseEnter = (key) => {
  //   const iframe = document.getElementById(`trailer-${key}`);
  //   iframe.src = `https://www.youtube.com/embed/${key}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&autohide=1&fs=0&iv_load_policy=3`; // 호버 시 자동 재생 및 요소 숨기기
  // };

  // const handleMouseLeave = (key) => {
  //   const iframe = document.getElementById(`trailer-${key}`);
  //   iframe.src = `https://www.youtube.com/embed/${key}?autoplay=0&controls=0&modestbranding=1&showinfo=0&rel=0&autohide=1&fs=0&iv_load_policy=3`; // 마우스 떠날 때 재생 중지
  // };
  return (
    <Container>
      {loadingTrailers ? (
        <p>로딩중이오...</p>
      ) : trailers.length > 0 ? (
        <TrailerBox key={trailers[0].id}>
          <iframe
            id={`trailer-${trailers[0].key}`}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailers[0].key}?autoplay=0&controls=0&modestbranding=1&showinfo=0&rel=0&autohide=1&fs=0&iv_load_policy=3`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onMouseEnter={() => handleMouseEnter(trailers[0].key)}
            onMouseLeave={() => handleMouseLeave(trailers[0].key)}
          ></iframe>
          <h4>예고편 : {trailers[0].name}</h4>
        </TrailerBox>
      ) : (
        <p>예고편이 없어요..</p>
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
