import "./App.css";
import "./index.css";
import "./styles/container.css";
import "./styles/side.scss";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/drive/drive.css";
import "./styles/main/term.css";
import "./styles/setting/aside.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./routers/routers";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
