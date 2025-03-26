import Header from "./components/header/Header";
import MainHome from "./components/body/MainHome";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MovieDetail from "./page/moviedetailpage/MovieDetail";
import Login from "./page/loginpage/Login";
import { initKakao } from "./api/kakaoLogin";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    initKakao();
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
