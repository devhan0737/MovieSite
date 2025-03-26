// components/GenreSlideSwiper.jsx
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { fetchMoviesByGenre } from "../../api/fetchMoviesByGenre";
import { mq } from "../../lib/media-query/mediaQuery";
import { useNavigate } from "react-router-dom";

// ✅ 스타일 설정
const Container = styled.div`
  width: 100%;
  color: #fff;

  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    ${mq("desktop")} {
      padding: 0;
    }
  }
`;

const SwiperBox = styled.div`
  position: relative;
  overflow: hidden;

  .swiper,
  .swiper-slide {
    overflow: visible;
  }
`;

const MovieSwiper = styled(SwiperSlide)`
  transition: transform 0.3s ease;
  z-index: 1;

  &:hover {
    transform: scale(1.08);
    z-index: 10;
  }
`;

const Movie = styled.div`
  padding: 20px 0;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    min-height: 280px;
    max-height: 300px;
    border-radius: 10px;
  }

  p {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    word-wrap: break-word;
  }
`;

const GenreSlideSwiper = ({ name, id }) => {
  const navigate = useNavigate();

  const {
    data: movieListByGenre,
    isLoading,
    error,
  } = useQuery(["movieListByGenre", id], () => fetchMoviesByGenre(id), {
    enabled: !!id,
  });

  const handleClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <h2>{name}</h2>
      <SwiperBox>
        <Swiper
          spaceBetween={40}
          slidesPerView={6}
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
                <Movie onClick={() => handleClick(movie.id)}>
                  <img src={posterUrl} alt={movie.title} />
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
