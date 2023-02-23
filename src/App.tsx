import React from "react";
import "./App.css";
import ProductsTable from "./components/ProductsTable";

function App() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <h2 className="font-weight-bold p-3 mt-3 mb-3">
          Front end developer Practical Test
        </h2>
      </div>
      <ProductsTable />
    </div>
  );
}

export default App;
