import "./App.css";
import "./styles/side.scss";
import { SideBar } from "./components/SideBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SideBar></SideBar>
    </BrowserRouter>
  );
}

export default App;
