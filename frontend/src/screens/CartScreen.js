import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {
  useParams,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  // the below hook is used to get the query params which are passed from other components(in this case coming from productScreen)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentParams = Object.fromEntries([...searchParams]);
  const qty = currentParams ? currentParams.qty : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [id, dispatch, qty]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart Is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map((cartItem) => {
              const { product, image, name, qty, price, countInStock } =
                cartItem;
              return (
                <ListGroup.Item key={product}>
                  <Row>
                    <Col md={2}>
                      <Image src={image} alt={name} fluid />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${product}`}>{name}</Link>
                    </Col>
                    <Col md={2}>${price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) =>
                          dispatch(addToCart(product, Number(e.target.value)))
                        }
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
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(product)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => {
                  return acc + item.qty;
                }, 0)}
                ) items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => {
                  acc += item.price * item.qty;
                  return acc;
                }, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn btn-primary"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proced to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
