import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Pagination() {
  return (
    <div className="pagination">
      <button className="page-btn nav">
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button className="page-btn active">1</button>
      <button className="page-btn">2</button>
      <button className="page-btn">3</button>
      <button className="page-btn nav">
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}
export default Pagination;
