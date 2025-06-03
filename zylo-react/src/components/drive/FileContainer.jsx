import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { SearchBox } from "./SearchBox";

export const FileContainer = () => {
  const { toggled } = useTheme();
  return (
    <div id="drive">
      <SearchBox />
      <div id="grid-container">
        <section id="file-grid">
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
        </section>
      </div>
      <button id="more" className={toggled ? "dark" : "light"}>
        더보기 <FontAwesomeIcon icon={faPlus} />
      </button>
      <button id="upload-btn" className={toggled ? "dark" : "light"}>
        업로드 <FontAwesomeIcon icon={faUpload} />
      </button>
    </div>
  );
};
