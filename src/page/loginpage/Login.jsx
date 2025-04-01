import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import kakaoLogo from "../../assets/img/kakaoLogo.svg";
import googleLogo from "../../assets/img/googleLogo.svg";
import { handleKakaoLogin } from "../../api/kakaoLogin";
import { jwtDecode } from "jwt-decode";

// 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #222020;
  color: #fff;
  padding: 64px 4% 0;
`;

const Contents = styled.div`
  margin: 0 auto;
  padding-top: 40px;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 40px;
`;

const SnsLoginBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const KakaoBtn = styled.button`
  max-width: 337px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  background: #fee500;
  color: #000;
  font-size: 1.8rem;
  font-weight: 500;
  border-radius: 12px;
  img {
    width: 24px;
    height: 24px;
  }
`;

const GoogleBtn = styled.button`
  max-width: 337px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  font-size: 1.8rem;
  font-weight: 500;
  background: #fff;
  color: #000;
  border-radius: 12px;
  img {
    width: 24px;
    height: 24px;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  // ✅ 구글 SDK 초기화
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (window.google && clientId) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleLogin,
      });
      console.log("✅ Google SDK 초기화 완료");
    } else {
      console.warn("❌ Google SDK 또는 client_id 없음");
    }
  }, []);

  // ✅ 구글 로그인 성공 시 처리
  const handleGoogleLogin = (response) => {
    if (!response.credential) {
      console.warn("❌ 구글 로그인 실패: credential 없음");
      return;
    }

    const token = response.credential;
    const user = jwtDecode(token);

    console.log("👤 Google 사용자 정보:", user);

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <Container>
      <Contents>
        <h2>로그인</h2>
        <p>SNS 계정으로 간편하게 로그인 하세요.</p>

        <SnsLoginBox>
          {/* 카카오 로그인 */}
          <KakaoBtn onClick={() => handleKakaoLogin(navigate)}>
            <img src={kakaoLogo} alt="카카오 로고" />
            카카오로 로그인
          </KakaoBtn>

          {/* 구글 로그인 */}
          <GoogleBtn
            onClick={() =>
              window.google.accounts.id.prompt((notification) => {
                if (
                  notification.isNotDisplayed() ||
                  notification.isSkippedMoment()
                ) {
                  console.warn("❌ Google 로그인 취소 또는 표시 안 됨");
                }
              })
            }
          >
            <img src={googleLogo} alt="구글 로고" />
            구글로 로그인
          </GoogleBtn>
        </SnsLoginBox>
      </Contents>
    </Container>
  );
};

export default Login;
