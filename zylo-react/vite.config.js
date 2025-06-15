// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.greenlotteon.com",  
        changeOrigin: true,  
        secure: true,  
        rewrite: (path) => path,  
      },
      "/ws": {
        target: "wss://api.greenlotteon.com/ws", 
        ws: true, 
        changeOrigin: true,  
      },
    },
  },
});
