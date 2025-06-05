import "./App.css";
import "./index.css";
import "./styles/container.css";
import "./styles/side.scss";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/main/term.css";
import "./styles/setting/aside.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./routers/routers";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
