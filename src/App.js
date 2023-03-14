import React, { Component } from "react";
import { ContextProvider } from "./Utils/Context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Navbar from "./Components/Navbar/Navbar";
import ListingPage from "./Components/ListingPage/ListingPage";
import DescriptionPage from "./Components/DescriptionPage/DescriptionPage";
import CartPage from "./Components/CartPage/CartPage";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = { activeCategory: "", activeProductId: "" };
  }

  handleActiveCategory = (category) => {
    this.setState({
      ...this.state,
      activeCategory: category,
    });
  };

  handleActiveProductId = (id) => {
    this.setState({
      ...this.state,
      activeProductId: id,
    });
  };

  render() {
    return (
      <ContextProvider>
        <Router>
          <Navbar handleActiveCategory={this.handleActiveCategory} />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route exact path="/404" element={ErrorPage} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/:category" element={<ListingPage category={this.state.activeCategory} handleActiveProductId={this.handleActiveProductId} />}></Route>
            <Route exact path="/:category/:id" element={<DescriptionPage id={this.state.activeProductId} handleActiveProductId={this.handleActiveProductId} />}></Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ContextProvider>
    );
  }
}

export default App;