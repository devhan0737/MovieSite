import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// 영화 예고편 데이터를 가져오는 함수
export const fetchMovieTrailers = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR", // 한국어로 데이터 요청
      },
    });
    return response.data.results;
  } catch (err) {
    console.error("Failed to fetch trailers:", err);
    return [];
  }
};
