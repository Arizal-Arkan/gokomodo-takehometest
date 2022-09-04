import React from "react";
import Layout from "./components/layout/layout";
import Home from "./page/Home";
import Detail from './page/detail'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
