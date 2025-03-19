import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/basic.css";
import App from "./App.jsx";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "./../node_modules/react-query/es/core/queryClient";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* QueryClientProvider로 감싸서 React Query를 사용 가능하게 만들기 */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
