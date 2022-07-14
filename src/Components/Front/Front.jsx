import Nav from "./Nav";
import List from "./List";
import { useState, useEffect } from "react";
import { authConfig } from "../../Functions/auth";
import axios from "axios";
import FrontContext from "./FrontContext";
import SortFilter from "./SortFilter";
import { useRef } from "react";

function Front() {
  const [products, setProducts] = useState(null);
  const [cats, setCats] = useState(null);
  const [filter, setFilter] = useState(0);

  const [cat, setCat] = useState(0);

  const [search, setSearch] = useState("");

  const [addCom, setAddCom] = useState(null);

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [cur, setCur] = useState(null);

  const [nowCur, setNowCur] = useState(null);

  const doFilter = (cid) => {
    setCat(cid);
    setFilter(parseInt(cid));
  };

  useEffect(() => {
    let query;
    if (filter === 0 && !search) {
      query = "";
    } else if (filter) {
      query = "?cat-id=" + filter;
    } else if (search) {
      query = "?s=" + search;
    }

    axios
      .get("http://localhost:3003/products" + query, authConfig())
      .then((res) => {
        const products = new Map();
        res.data.forEach((p) => {
          let comment;
          if (null === p.com) {
            comment = null;
          } else {
            comment = { id: p.com_id, com: p.com };
          }
          if (products.has(p.id)) {
            const pr = products.get(p.id);
            if (comment) {
              pr.com.push(comment);
            }
          } else {
            products.set(p.id, { ...p });
            const pr = products.get(p.id);
            pr.com = [];
            delete pr.com_id;
            if (comment) {
              pr.com.push(comment);
            }
          }
        });
        console.log([...products].map((e) => e[1]));
        setProducts(
          [...products].map((e) => e[1]).map((p, i) => ({ ...p, row: i }))
        );
      });
  }, [filter, search, lastUpdate]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/cats", authConfig())
      .then((res) => setCats(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3003/cur", authConfig())
      .then((res) => setCur(res.data));
  }, []);

  useEffect(() => {
    if (null === addCom) return;
    axios
      .post("http://localhost:3003/comments", addCom, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [addCom]);

  useEffect(() => {
    if (null === nowCur) return;

    const value = cur.filter((c) => c.code === nowCur)[0].value;

    setProducts((pr) =>
      pr.map((p) => ({ ...p, cur: nowCur, curVal: p.price * value }))
    );
  }, [nowCur]);

  return (
    <FrontContext.Provider
      value={{
        products,
        setProducts,
        cats,
        setFilter,
        cat,
        setCat,
        doFilter,
        setSearch,
        setAddCom,
        cur,
        setNowCur,
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
