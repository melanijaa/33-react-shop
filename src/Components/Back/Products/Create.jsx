import { useContext, useState } from "react";
import BackContext from "../BackContext";

function Create() {
  const { cats } = useContext(BackContext);

  const [title, setTitle] = useState("");

  const handleCreate = () => {
    const data = { title };
    setCreateCat(data);
    setTitle("");
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Create new Product</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <small className="form-text text-muted">
            Enter your Cat name here.
          </small>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <small className="form-text text-muted">Enter price.</small>
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="in--stock" />
          <label className="form-check-label" htmlFor="in--stock">
            Check me out
          </label>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <select
            className="form-control"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="0">Please, select your Cat</option>
            {cats.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">Select category here.</small>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default Create;
