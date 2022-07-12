import Nav from "./Nav";
import List from "./List";
import { useState, useEffect } from "react";
import { authConfig } from "../../Functions/auth";
import axios from "axios";
import FrontContext from "./FrontContext";
import SortFilter from "./SortFilter";

function Front() {
  const [products, setProducts] = useState(null);
  const [cats, setCats] = useState(null);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    let query;
    if (filter === 0) {
      query = "";
    } else {
      query = "?cat-id=" + filter;
    }
    axios
      .get("http://localhost:3003/products" + query, authConfig())
      .then((res) => setProducts(res.data.map((p, i) => ({ ...p, row: i }))));
  }, [filter]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/cats", authConfig())
      .then((res) => setCats(res.data));
  }, []);

  return (
    <FrontContext.Provider
      value={{
        products,
        setProducts,
        cats,
        setFilter,
      }}
    >
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SortFilter />
          </div>
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </FrontContext.Provider>
  );
}
export default Front;
