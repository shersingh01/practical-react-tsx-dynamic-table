import React, { useState, useEffect } from "react";
import { Product } from "../Interfaces/Product";

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceSearchTerm, setPriceSearchTerm] = useState<number | string>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let url = `https://bizonapi.sufalam.live/api/products?filter[include]=productbrand&filter[include]=productmedia&filter[include]=category&filter[where][productstatus]=1&filter[skip]=${
        (currentPage - 1) * 5
      }&filter[limit]=5`;
      if (sortOrder) {
        url += `&filter[order][0]=${sortOrder}`;
      }
      if (searchTerm) {
        url += `&filter[where][name][like]=%25${searchTerm}%25`;
      }
      if (priceSearchTerm) {
        url += `&filter[where][minPrice]=100&filter[where][maxPrice]=${priceSearchTerm}`;
      }
      const response = await fetch(url, {
        headers: {
          masterdetailId: "6b623f64-ed4c-46fb-88f0-ce700aa6fcb1",
          openStoreId: "9fc7e05f-eb24-4846-b728-08d1d340e37b",
        },
      });
      const data = await response.json();
      setProducts(data);
      setTotalPages(Math.ceil(data.count / 5));
      setLoading(false);
    };
    fetchProducts();
  }, [currentPage, sortOrder, searchTerm, priceSearchTerm]);

  const handleSort = (column: string) => {
    if (column === "price-desc") {
      setSortOrder("price DESC");
    } else if (column === "price-asc") {
      setSortOrder("price ASC");
    } else if (column === "best-selling") {
      setSortOrder("sellcounter DESC");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePriceSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    //
    setPriceSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by price"
            value={priceSearchTerm}
            onChange={handlePriceSearch}
          />
        </div>
      </div>
      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => handleSort("price-desc")}
        >
          Sort by Price High to Low
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => handleSort("price-asc")}
        >
          Sort by Price Low to High
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleSort("best-selling")}
        >
          Sort by Best Selling
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Sell Counter</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  {product.productbrand ? product.productbrand.name : "-"}
                </td>
                <td>{product.category ? product.category.name : "-"}</td>
                <td>{product.sellcounter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button
          className="btn btn-primary me-2"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-primary me-2 ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductsTable;