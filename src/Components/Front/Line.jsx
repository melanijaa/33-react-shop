import { useState } from "react";
import { useContext } from "react";
import FrontContext from "./FrontContext";

function Line({ line }) {
  const { doFilter, setAddCom } = useContext(FrontContext);

  const [com, setCom] = useState("");

  const addComment = () => {
    setAddCom({ product_id: line.id, com });
  };

  return (
    <li className="list-group-item">
      <div className="item front">
        <div className="content">
          <b>{line.title}</b>
          <i>{line.price.toFixed(2)} EUR</i>
          <div
            className="box"
            style={{ backgroundColor: line.in_stock ? "coral" : null }}
          ></div>
          <span>{new Date(Date.parse(line.lu)).toLocaleString()}</span>
          <div className="cat" onClick={() => doFilter(line.cid)}>
            {line.cat}
          </div>
          {line.photo ? (
            <div className="photo-bin">
              <img src={line.photo} alt={line.title} />
            </div>
          ) : null}
        </div>
        <div className="comments">
          <h5>Comments</h5>
          <div className="form-group">
            <label>add comment</label>
            <textarea
              className="form-control"
              rows="3"
              value={com}
              onChange={(e) => setCom(e.target.value)}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addComment}
          >
            I want to say
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;
