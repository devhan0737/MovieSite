import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchMovies } from "../../api/movieAPI";
import { Swiper, SwiperSlide } from "swiper/react"; // React용 Swiper 컴포넌트를 임포트
import styled from "styled-components";
import "swiper/css";

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

const MovieList = () => {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchMovies(),
  });

  useEffect(() => {
    if (movies) {
      console.log("📌 API에서 가져온 영화 데이터:", movies);
    }
  }, [movies]);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <Container>
      <h2>🔥🔥 지금 뜨는 영화!! </h2>

      <MovieWrapper>
        <Swiper
          spaceBetween={30} // 슬라이드 사이의 간격
          slidesPerView={7} // 한 화면에 보일 슬라이드 개수를 1로 설정
          navigation // 좌/우 버튼을 사용하려면 이 옵션을 활성화
          loop // 끝까지 갔을 때 다시 처음으로 돌아가게
          breakpoints={{
            320: {
              slidesPerView: 1.4, // 모바일 화면에서 슬라이드 1개
              centeredSlides: true, // 모바일에서만 센터로
            },
            480: {
              slidesPerView: 2, // 작은 화면에서 슬라이드 2개
              centeredSlides: true, // 작은 화면에서만 센터로
            },
            768: {
              slidesPerView: 3, // 태블릿에서 슬라이드 3개
              centeredSlides: true, // 태블릿에서도 센터로
            },
            1024: {
              slidesPerView: 6, // 데스크탑에서 슬라이드 5개
              centeredSlides: false, // 1024 이상에서는 기본 값 (센터 안됨)
            },
          }}
        >
          {movies?.map((movie) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"; // 대체 이미지

            return (
              <MovieSwiper key={movie.id}>
                <Movie>
                  <img src={posterUrl} alt={movie.title} width="100%" />
                  <p>{movie.title}</p>
                </Movie>
              </MovieSwiper>
            );
          })}
        </Swiper>
      </MovieWrapper>
    </Container>
  );
};

export default MovieList;
