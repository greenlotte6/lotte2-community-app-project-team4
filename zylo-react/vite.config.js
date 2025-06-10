import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // 'global' 변수를 window 객체로 정의하여 브라우저 환경에서 사용 가능하게 함
    global: "window",
  },
});
