import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import LIST from "../../Queries/ListingPageQuery";
import "./ListingPage.css";
import ListingPageProduct from "./ListingPageProduct";
import { Link } from "react-router-dom";

export class ListingPage extends Component {
  constructor(props) {
    super(props);
  }

  displayListingPage = (loading, error, data) => {
    if (loading) return "loading...";
    if (error) return "error...";
    if (data) {
      if (!data.category) {
        return <Link to="/404" />;
      }

      const { products } = data.category;

      return (
        <>
          {products.map((product) => (
            <ListingPageProduct key={product.name} product={product} category={data.category.name} handleActiveProductId={this.props.handleActiveProductId} />
          ))}
        </>
      );
    }
  };

  render() {
    const { category } = this.props;
    console.log(category);

    return (
      <div className="listing-page">
        <h1 className="listing-page-title">{category}</h1>
        <div className="listing-page-product-container">
          <Query query={LIST} variables={{ input: { title: category } }}>
            {({ loading, data, error }) => this.displayListingPage(loading, error, data)}
          </Query>
        </div>
      </div>
    );
  }
}
export default ListingPage;
