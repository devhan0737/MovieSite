// src/api/googleLogin.js

export const initGoogleLogin = (callback) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_KEY;

  if (window.google && clientId) {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback,
    });

    // window.google.accounts.id.renderButton(
    //   document.getElementById("google-login-btn"),
    //   {
    //     theme: "filled_white", // filled_blue, outline, filled_black
    //     size: "large", // small, medium, large
    //     text: "continue_with", // signin_with, signup_with, etc.
    //     shape: "pill", // pill, circle, square, rectangular
    //     logo_alignment: "left", // left or center
    //     width: 280, // (선택) 수동 너비 조정
    //   }
    // );
  } else {
    console.warn("Google API가 아직 로드되지 않았거나 client_id가 없습니다.");
  }
};
