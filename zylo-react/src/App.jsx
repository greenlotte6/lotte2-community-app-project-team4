import "./App.css";
import "./index.css";
import "./styles/container.css";
import "./styles/side.scss";
import "./styles/header.css";
import "./styles/content.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { BasicLayout } from "./layouts/BasicLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./routers/Routers";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
