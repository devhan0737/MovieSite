import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { initGoogleLogin } from "../../api/googleLogin";
import kakaoLogo from "../../assets/img/kakaoLogo.svg";
import googleLogo from "../../assets/img/googleLogo.svg";
import { handleKakaoLogin } from "../../api/kakaoLogin";

// 페이지 전체 배경
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #222020;
  color: #fff;
  padding: 64px 4% 0;
`;

// 콘텐츠 박스
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

// SNS 로그인 박스
const SnsLoginBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

// 카카오 버튼
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

  useEffect(() => {
    // ✅ 구글 로그인 초기화 호출
    initGoogleLogin(handleGoogleLogin);
  }, []);

  const handleGoogleLogin = (response) => {
    console.log("✅ 구글 로그인 성공!");
    console.log("🪙 JWT Token:", response.credential);

    // 여기서 navigate("/home") 같은 이동도 가능
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

          {/* 구글 로그인 버튼 자리 */}
          <GoogleBtn onClick={() => window.google.accounts.id.prompt()}>
            <img src={googleLogo} alt="구글 로고" />
            구글로 로그인
          </GoogleBtn>
        </SnsLoginBox>
      </Contents>
    </Container>
  );
};

export default Login;
