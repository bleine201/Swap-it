import React, { Component } from "react";
import Axios from "axios";
import Image from "../components/Image/Image";
import "./ProductImages.css";

class ProductImages extends Component {
  state = {
    images: [],
    error: false,
  };

  componentDidMount() {
    Axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        const images = res.data.slice(0, 10);
        const updatedImage = images.map((image) => {
          return {
            ...image,
          };
        });
        this.setState({ images: updatedImage });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  render() {
    let images = "";
    return (images = this.state.images.map((image) => {
      return (
        <Image key={image.id} image={this.state.images} image={image.image} />
      );
    }));
  }
}

export default ProductImages;
