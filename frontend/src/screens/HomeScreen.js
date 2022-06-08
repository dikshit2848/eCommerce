import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }
  if (products) {
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
  }
};

export default HomeScreen;
