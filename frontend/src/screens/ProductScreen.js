import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    navigate({
      pathname: `/cart/${id}`,
      search: createSearchParams({ qty: qty }).toString(),
    });
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }
  if (product) {
    const {
      name,
      image,
      rating,
      numReviews,
      price,
      description,
      countInStock,
    } = product;
    return (
      <>
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>
        <Row>
          <Col md={6}>
            <Image src={image} alt={name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={rating} text={`${numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${price}</ListGroup.Item>
              <ListGroup.Item>Description : {description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(countInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={countInStock === 0}
                  >
                    Add To Card
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
};

export default ProductScreen;
