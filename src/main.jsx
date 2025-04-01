import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/basic.css";
import App from "./App.jsx";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "./../node_modules/react-query/es/core/queryClient";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* React Query와 GoogleOAuthProvider로 앱을 감싸기 */}
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
