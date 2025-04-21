import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const GoogleRedirectCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const idToken = params.get("id_token");

    if (idToken) {
      try {
        const user = jwtDecode(idToken);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("✅ 로그인 성공:", user);

        // ✅ navigate를 조금 늦게 실행해보자!
        setTimeout(() => {
          navigate("/");
        }, 0);
      } catch (e) {
        console.error("❌ id_token 디코딩 실패:", e);
        navigate("/login");
      }
    } else {
      console.warn("❌ id_token 없음");
      navigate("/login");
    }
  }, []);

  return <p>로그인 처리 중...</p>;
};

export default GoogleRedirectCallback;
