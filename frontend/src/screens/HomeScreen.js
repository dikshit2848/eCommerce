import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row className="d-flex">
        {products.map((product) => {
          //   const { _id, name, image, description } = product;
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product {...product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default HomeScreen;