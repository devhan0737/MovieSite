import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchMovies } from "../../api/movieAPI";
import { Swiper, SwiperSlide } from "swiper/react"; // React용 Swiper 컴포넌트를 임포트
import styled from "styled-components";
import "swiper/css";

// 장르 ID와 이름 매핑
const genreMap = {
  28: "액션",
  12: "모험",
  35: "코미디",
  53: "스릴러",
  80: "범죄",
  18: "드라마",
  10751: "가족",
  14: "판타지",
  27: "공포",
  10749: "로맨스",
  878: "SF",
  10770: "TV 영화",
  10752: "전쟁",
  37: "서부",
};

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

const MovieList = () => {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchMovies(),
  });

  // 영화 데이터를 장르별로 묶기
  const categorizedMovies = movies?.reduce((acc, movie) => {
    movie.genre_ids.forEach((genreId) => {
      if (!acc[genreId]) acc[genreId] = [];
      acc[genreId].push(movie);
    });
    return acc;
  }, {});

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

      {/* 카테고리별 영화 리스트를 표시 */}
      {Object.keys(categorizedMovies || {}).map((categoryId) => {
        const categoryMovies = categorizedMovies[categoryId];
        const categoryName = genreMap[categoryId] || "알 수 없음"; // 장르 이름 매핑

        return (
          <CategoryWrapper key={categoryId}>
            <h3>{categoryName}</h3> {/* 장르 이름을 출력 */}
            <MovieWrapper>
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
                {categoryMovies.map((movie) => {
                  const posterUrl = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

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
          </CategoryWrapper>
        );
      })}
    </Container>
  );
};

export default MovieList;
