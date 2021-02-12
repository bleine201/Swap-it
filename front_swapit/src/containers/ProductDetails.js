import React, { Component } from "react";
import Axios from "axios";
import Details from "../components/Details/Details";
import "./ProductDetails.css";

class ProductDetails extends Component {
  state = {
    details: [],
    error: false,
  };

  componentDidMount() {
    Axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        const details = res.data.slice(0, 10);
        const updatedDetail = details.map((detail) => {
          return {
            ...detail,
          };
        });
        this.setState({ details: updatedDetail });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  render() {
    let details = "";
    return (details = this.state.details.map((detail) => {
      return (
        <Details
          key={detail.id}
          detail={this.state.details}
          title={detail.title}
          category={detail.category}
        />
      );
    }));
  }
}

export default ProductDetails;
