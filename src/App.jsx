import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import MainHome from "./components/body/MainHome";
import MovieDetail from "./page/moviedetailpage/MovieDetail";
import Login from "./page/loginpage/Login";
import { initKakao } from "./api/kakaoLogin"; // ✅ 카카오는 유지

function App() {
  useEffect(() => {
    initKakao(); // ✅ 카카오만 초기화

    if (window.google) {
      console.log("✅ 구글 SDK가 정상적으로 로드되었습니다.");
    } else {
      console.warn("❌ 구글 SDK가 로드되지 않았습니다.");
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
