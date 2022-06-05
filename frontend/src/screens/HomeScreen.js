import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";

const HomeScreen = () => {
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
