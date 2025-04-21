import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import kakaoLogo from "../../assets/img/kakaoLogo.svg";
import googleLogo from "../../assets/img/googleLogo.svg";
import { handleKakaoLogin } from "../../api/kakaoLogin";

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
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = `${window.location.origin}/google-callback`;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleGoogleLoginClick = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token id_token&scope=openid%20email%20profile&nonce=abc123`;
    window.location.href = url;
  };

  useEffect(() => {
    // 데스크탑일 경우 FedCM prompt()로 자동 로그인 유도할 수 있음
    if (!isMobile && window.google && clientId) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          const token = response.credential;
          if (token) {
            const user = jwtDecode(token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
          }
        },
      });
    }
  }, []);

  return (
    <Container>
      <Contents>
        <h2>로그인</h2>
        <p>SNS 계정으로 간편하게 로그인 하세요.</p>

        <SnsLoginBox>
          <KakaoBtn onClick={() => handleKakaoLogin(navigate)}>
            <img src={kakaoLogo} alt="카카오 로고" />
            카카오로 로그인
          </KakaoBtn>

          <GoogleBtn onClick={handleGoogleLoginClick}>
            <img src={googleLogo} alt="구글 로고" />
            구글로 로그인
          </GoogleBtn>
        </SnsLoginBox>
      </Contents>
    </Container>
  );
};

export default Login;
