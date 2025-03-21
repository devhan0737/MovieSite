import styled from "styled-components";
import "swiper/css"; // Swiper 스타일을 불러옵니다.
import GenreSlideSwiper from "./GenreSlideSwiper";
import { mq } from "../../lib/media-query/mediaQuery";

// 장르 배열

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  gap: 40px;
  display: flex;
  flex-direction: column;
  ${mq("desktop")} {
    gap: 80px;
  }
`;

const MovieGenreList = () => {
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

  return (
    <Container>
      {genres.map((genre) => {
        return (
          <GenreSlideSwiper key={genre.id} name={genre.name} id={genre.id} />
        );
      })}
    </Container>
  );
};

export default MovieGenreList;
