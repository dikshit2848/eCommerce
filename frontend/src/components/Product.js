import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
const Product = ({ _id, name, image, rating, numReviews, price }) => {
  return (
    <Card className="my-3 mx-1 p-3 rounded box">
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating rating={rating} text={`${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
