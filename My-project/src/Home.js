// import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { Link, Navigate } from "react-router-dom";

export default function Home() {
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeId, setProductTypeId] = useState(0);
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:8080/api/product_types",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
        }
      );
      console.log("11111");

      const json = await response.json();
      console.log("json:", json);
      console.log("Product:", products);
      setProductTypes(json.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:8080/api/products/type/" + productTypeId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
        }
      );

      const json = await response.json();
 
      setProducts(json.data);
    }

    fetchData();
  }, [productTypeId]);

  if (localStorage.getItem("access_token")) {
    return (
      <div className="container">
        <select value={productTypeId} onChange={(e) => setProductTypeId(e.target.value)}>
          <option value={0}>ทุกประเภทสินค้า</option>
          {productTypes && productTypes.map(item => {
          //  console.log("Product Type Item:", item); // Log product type item
            return (
              <option key={item.product_type_id} value={item.product_type_id}>
                {item.product_type_name}
              </option>
            );
          })}
        </select>

          <Link to={"/product/add"} className="btn btn-outline-primary me-3">เพิ่ม</Link>

        <div className="container mt-3">
          {products && products.map(item => {
            // console.log("Product Item:", item); // Log product item
            return (
              <ProductItem key={item.product_id} data={item} />
            );
          })}
        </div>
      </div>
    );
  }else{
    <Navigate to = "/" replace />
  }
  
};