import "./bootstrap.css";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Back from "./Components/Back/Back";
import Front from "./Components/Front/Front";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/admin" element={<Back show="admin" />} />
        <Route path="/admin/cats" element={<Back show="cats" />} />
        <Route path="/admin/products" element={<Back show="products" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
