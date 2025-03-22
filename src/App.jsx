import Header from "./components/header/Header";
import MainHome from "./components/body/MainHome";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MovieDetail from "./page/MovieDetail";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/movie/:id" element={<MovieDetail />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
