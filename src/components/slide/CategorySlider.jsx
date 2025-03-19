import React from "react";
import { useQuery } from "react-query";
import axios from "axios"; // axios 임포트
import { Swiper, SwiperSlide } from "swiper/react"; // React용 Swiper 컴포넌트를 임포트
import "swiper/css"; // Swiper 기본 스타일 임포트
import styled from "styled-components";

// 스타일링
const SliderContainer = styled.div`
  margin-top: 20px;
`;

const MovieCard = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 300px; /* 고정된 높이 설정 */
    object-fit: cover; /* 이미지 비율 유지하며 크기 맞추기 */
    border-radius: 10px;
  }
  p {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }
`;

// 카테고리별 영화 데이터를 가져오는 함수
const fetchMoviesByCategory = async (genreId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=YOUR_API_KEY`
  );
  return response.data.results; // API 응답에서 영화 목록만 반환
};

const CategoryMovies = ({ category, genreId }) => {
  // 카테고리별 영화 데이터를 가져오기 위한 쿼리
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery(
    [`movies_${genreId}`, genreId],
    () => fetchMoviesByCategory(genreId),
    { keepPreviousData: true }
  );

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <SliderContainer>
      <h2>🔥 {category} 영화</h2>

      <Swiper
        spaceBetween={30} // 슬라이드 사이의 간격
        slidesPerView={5} // 한 화면에 보일 슬라이드 개수
        navigation
        loop
        centeredSlides={true} // 슬라이드가 중앙에 정렬되게 설정
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </MovieCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderContainer>
  );
};

export default CategoryMovies;
