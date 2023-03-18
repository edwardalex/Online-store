import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import DESCRIPTION from "../../Queries/DescriptionPageQuery";
import Images from "./DescriptionImages";
import Details from "./DescriptionDetails";
import "./DescriptionPage.css";

export class DescriptionPage extends Component {
  constructor(props) {
    super(props);
  }

  displayProduct = (loading, error, data) => {
    if (loading) return "loading...";
    if (error) return "error...";
    if (data) {
      if (!data.product) {
        return <Link to="/404" />;
      }
      const { name, prices, gallery, description, attributes, brand, inStock, id } = data.product;

      return (
        <div className="description-page">
          <Images name={name} gallery={gallery} inStock={inStock} id={id} handleActiveProductId={this.props.handleActiveProductId} />
          <Details name={name} brand={brand} prices={prices} attributes={attributes} inStock={inStock} description={description} id={id} />
        </div>
      );
    }
  };

  render() {
    const { id } = this.props;
    console.log(this.props);
    return (
      <Query query={DESCRIPTION} variables={{ product_id: id }}>
        {({ loading, data, error }) => this.displayProduct(loading, error, data)}
      </Query>
    );
  }
}

export default DescriptionPage;
