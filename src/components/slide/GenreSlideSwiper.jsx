import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react"; // React 컴포넌트로 Swiper, SwiperSlide 임포트
import "swiper/css"; // 스타일 불러오기
import { fetchMoviesByGenre } from "../../api/fetchMoviesByGenre";
import { mq } from "../../lib/media-query/mediaQuery";

const Container = styled.div`
  width: 100%;
  color: #fff;
  h2 {
    font-size: 2rem;
    height: 40px;
    ${mq("desktop")} {
      padding: 0;
    }
  }
`;
const SwiperBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

const MovieSwiper = styled(SwiperSlide)`
  width: 100%;
`;

const Movie = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: auto; /* 비율을 유지하면서 너비에 맞춰 높이 자동 조정 */
    max-width: 100%;
    max-height: 100%;
    min-height: 300px;
    border-radius: 10px;
  }
  p {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`;

const GenreSlideSwiper = ({ name, id }) => {
  // console.log("Genre ID:", id);

  const {
    data: movieListByGenre,
    isLoading,
    error,
  } = useQuery(["movieListByGenre", id], () => fetchMoviesByGenre(id), {
    enabled: !!id,
  });

  React.useEffect(() => {
    if (movieListByGenre) {
      console.log("Fetched Movies:", movieListByGenre);
    }
  }, [movieListByGenre]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <h2>{name}</h2>
      <SwiperBox>
        <Swiper
          spaceBetween={30}
          slidesPerView={7}
          navigation
          loop
          breakpoints={{
            320: { slidesPerView: 1.4, centeredSlides: true },
            480: { slidesPerView: 2, centeredSlides: true },
            768: { slidesPerView: 3, centeredSlides: true },
            1024: { slidesPerView: 6, centeredSlides: false },
          }}
        >
          {movieListByGenre?.map((movie, index) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

            return (
              <MovieSwiper key={`${movie.id}-${index}`}>
                <Movie>
                  <img src={posterUrl} alt={movie.title} width="100%" />
                  <p>{movie.title}</p>
                </Movie>
              </MovieSwiper>
            );
          })}
        </Swiper>
      </SwiperBox>
    </Container>
  );
};

export default GenreSlideSwiper;
