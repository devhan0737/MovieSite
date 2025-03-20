import { useQuery } from "react-query";
import { fetchMoviesByGenre } from "../../api/movieAPI";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 컴포넌트를 임포트
import styled from "styled-components";
import "swiper/css"; // Swiper 스타일을 불러옵니다.

// 장르 배열
const genres = [
  { id: 28, name: "액션" },
  { id: 12, name: "모험" },
  { id: 35, name: "코미디" },
  { id: 53, name: "스릴러" },
  { id: 80, name: "범죄" },
  { id: 18, name: "드라마" },
  { id: 10751, name: "가족" },
  { id: 14, name: "판타지" },
  { id: 27, name: "공포" },
  { id: 10749, name: "로맨스" },
  { id: 878, name: "SF" },
  { id: 10770, name: "TV 영화" },
  { id: 10752, name: "전쟁" },
  { id: 37, name: "서부" },
];

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 2rem;
  }
`;

const CategoryWrapper = styled.div`
  margin-top: 20px;
`;

const MovieWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const MovieSwiper = styled(SwiperSlide)`
  width: 100%;
`;

const Movie = styled.div`
  width: 100%;
  img {
    border-radius: 10px;
    height: 300px;
    object-fit: cover;
    width: 100%;
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

// 각 장르별로 useQuery를 호출하여 데이터 받아오기
const MovieList = () => {
  const genreQueries = genres.map((genre) =>
    useQuery(["movies", genre.id], () => fetchMoviesByGenre(genre.id))
  );
  return (
    <Container>
      <h2>🔥🔥 지금 뜨는 영화!! </h2>

      {/* 각 장르별로 영화 리스트를 표시 */}
      {genres.map((genre, index) => {
        const { data: movies, isLoading, error } = genreQueries[index];

        if (isLoading) return <p key={genre.id}>로딩 중...</p>;
        if (error) return <p key={genre.id}>에러 발생: {error.message}</p>;

        // 6개 미만의 카테고리는 표시하지 않음
        if (movies?.length < 6) return null;

        return (
          <CategoryWrapper key={genre.id}>
            <h3>{genre.name}</h3>
            <MovieWrapper>
              <Swiper
                spaceBetween={30}
                slidesPerView={7}
                navigation
                breakpoints={{
                  320: { slidesPerView: 1.4, centeredSlides: true },
                  480: { slidesPerView: 2, centeredSlides: true },
                  768: { slidesPerView: 3, centeredSlides: true },
                  1024: { slidesPerView: 6, centeredSlides: false },
                }}
              >
                {movies?.map((movie, index) => {
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
            </MovieWrapper>
          </CategoryWrapper>
        );
      })}
    </Container>
  );
};

export default MovieList;
