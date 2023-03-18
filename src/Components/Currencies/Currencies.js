import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { ternaryCheck, setCurrencySign } from "../../Utils/Helpers";
import CURRENCIES from "../../Queries/CurrenciesQuery";
import Context from "../../Utils/Context";
import "./Currencies.css";

export class Currency extends Component {
  constructor(props) {
    super(props);
    this.currency = React.createRef();
  }
  static contextType = Context;

  displayCurrencies = (loading, error, data) => {
    const { currenciesOpen, isCurrenciesOpen } = this.props;
    const { setCurrency, chosenCurrency } = this.context;

    if (loading) return "loading..";
    if (error) return "error...";
    if (data) {
      if (!data.currencies) {
        return <Link to="/404" />;
      }
      const { currencies } = data;
      return (
        <div className={ternaryCheck(currenciesOpen, "currency-list", "none")} ref={this.currency}>
          {currencies.map((currency, currencyIndex) => {
            return (
              <div className="currency" key={currency.label}>
                <input
                  checked={ternaryCheck(currency.label === chosenCurrency, true, false)}
                  type="radio"
                  name="currency"
                  id={currency.label}
                  value={currency.label}
                  onChange={() => {
                    setCurrency(currency.label, currencyIndex);
                    isCurrenciesOpen(false);
                  }}
                />
                <label htmlFor={currency.label}>
                  {setCurrencySign(currency.symbol)} {currency.label}
                </label>
              </div>
            );
          })}
        </div>
      );
    }
  };

  handleOutsideCurrenciesClick = (event) => {
    if (this.currency.current && !this.currency.current.contains(event.target) && this.props.currenciesRef.current && !this.props.currenciesRef.current.contains(event.target)) {
      this.props.isCurrenciesOpen(false);
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideCurrenciesClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideCurrenciesClick);
  }

  render() {
    return <Query query={CURRENCIES}>{({ loading, data, error }) => this.displayCurrencies(loading, error, data)}</Query>;
  }
}

export default Currency;
