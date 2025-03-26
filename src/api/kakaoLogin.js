import { Navigate } from "react-router-dom";

// 카카오 SDK 초기화 함수
export const initKakao = () => {
  function initialize() {
    // 카카오 도구가 준비 되었을때 isInitialized()는 카카오 SDK가 초기화됐는지 확인하는 함수
    if (window.Kakao && !window.Kakao.isInitialized()) {
      const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_JS_API_KEY;
      window.Kakao.init(KAKAO_API_KEY);
      console.log("Kakao SDK initialized");
    }
  }
  initialize();
};

export const handleKakaoLogin = (navigate) => {
  // 도구가 없다면 아무것도 할 수 없음으로 함수 종료
  if (!window.Kakao) return;

  // 카카오 로그인 창을 띄우는 함수
  window.Kakao.Auth.login({
    // scope 항목은 유저의 닉네임, 이메일 주소 요청
    // 카카오 개발자 센터에서 동의 항목에서 허용 해야함.
    scope: "profile_nickname, account_email",

    // 로그인에 성공했을때 실행되는 함수
    success: function (authObj) {
      console.log("✔️ 로그인 성공", authObj);

      // 로그인한 사용자 정보 요청하는 함수
      window.Kakao.API.request({
        // 카카오 사용자 정보 API의 주소
        // 지금 로그인한 사람이 누구인지 알려줘
        url: "/v2/user/me",

        // 사용자 정보를 성공적으로 가져오면 실행됨
        success: function (res) {
          // 받아온 정보에서 계정 정보 꺼내는 코드
          const kakaoAccount = res.kakao_account;

          console.log("사용자 정보", res);

          // 홈으로 이동
          navigate("/");
        },

        // 사용자 정보를 가져오는데 실패시 처리 함수
        fail: function (error) {
          console.error("사용자 정보 요청 실패", error);
        },
      });
    },

    // 로그인에 실패시 처리 함수
    fail: function (err) {
      console.error("카카오 로그인 실패", err);
    },
  });
};
