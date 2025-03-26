import React from "react";
import { useQuery } from "react-query";
import { fetchMoviePopular } from "../../api/fetchMoviePopular";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { mq } from "../../lib/media-query/mediaQuery";

const Container = styled.div`
  width: 100%;
  color: #fff;
  h2 {
    font-size: 2rem;
    ${mq("desktop")} {
      padding: 0;
    }
  }
`;
const SwiperBox = styled.div`
  width: 100%;
`;
const MovieSwiper = styled(SwiperSlide)`
  transition: transform 0.3s ease;
  z-index: 1;

  &:hover {
    transform: scale(1.08);
  }
`;
const Movie = styled.div`
  padding: 20px 0;
  width: 100%;
  img {
    width: 100%;
    height: auto;
    min-height: 280px;
    max-width: 100%;
    max-height: 100%;
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

const MainBanner = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const {
    data: movieListPopular,
    isLoading,
    error,
  } = useQuery("movieListPopular", fetchMoviePopular);

  React.useEffect(() => {
    if (movieListPopular) {
      console.log("Fetched Movies : ", movieListPopular);
    }
  }, [movieListPopular]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // 영화 클릭 시 상세 페이지로 이동
  };

  return (
    <Container>
      <h2>지금 뜨는 영화</h2>
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
          {movieListPopular?.map((movie, index) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

            return (
              <MovieSwiper
                key={`${movie.id}-${index}`}
                onClick={() => handleMovieClick(movie.id)}
              >
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

export default MainBanner;
