import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (page = 1) => {
  // 비동기 함수로 데이터를 다 받을때까지 기다림
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: "ko-KR", // 한국어 데이터 가져오기
      page: page,
    },
  });
  return response.data.results; // ✅ 영화 리스트만 반환
};
