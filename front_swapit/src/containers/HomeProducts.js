import React, { Component } from "react";
import SearchBar from "../components/searchbar/SearchBar";
import "./HomeProducts.css";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";

export default class HomeProducts extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <h1 className="titleHomePage">All products close to you</h1>
        <div className="HomePageMain">
          <div className="HomeProductsApp">
            <div className="ProductImagesClass">
              <ProductImages />
            </div>
            <div className="ProductDetailsClass">
              <ProductDetails />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
