import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams, Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }
  if (products) {
    return (
      <>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
        )}
        <h1>Latest Products</h1>
        <Row className="d-flex">
          {products.map((product) => {
            //   const { _id, name, image, description } = product;
            return (
              <Col
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={product._id}
                className="align-items-stretch d-flex"
              >
                <Product {...product} />
              </Col>
            );
          })}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </>
    );
  }
};

export default HomeScreen;
