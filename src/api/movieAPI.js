import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMoviesByGenre = async (genreId) => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: "ko-KR", // 한국어로 데이터를 요청
      with_genres: genreId, // 특정 장르로 필터링
      page: 1, // 1페이지만 가져오기
    },
  });

  return response.data.results;
};
