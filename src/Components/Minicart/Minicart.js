import React, { Component } from "react";
import { ternaryCheck, itemCounter } from "../../Utils/Helpers";
import MinicartList from "./MinicartList";
import MinicartFooter from "./MinicartFooter";
import Context from "../../Utils/Context";
import "./Minicart.css";

export class Minicart extends Component {
  constructor(props) {
    super(props);

    this.minicart = React.createRef();
  }

  static contextType = Context;

  handleOutsideMinicartClick = (event) => {
    if (this.minicart.current && !this.minicart.current.contains(event.target) && this.props.minicartRef.current && !this.props.minicartRef.current.contains(event.target)) {
      this.props.isMinicartOpen(false);
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideMinicartClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideMinicartClick);
  }

  render() {
    const { minicartOpen, isMinicartOpen } = this.props;
    const { addedItems } = this.context;

    return (
      <>
        <div className={ternaryCheck(minicartOpen, "minicart-focus", "none")}></div>
        <div className={ternaryCheck(minicartOpen, "minicart", "none")} ref={this.minicart}>
          <div className="minicart-head">
            <span className="my-bag">My Bag</span>
            <span>
              , {itemCounter(addedItems)} item{itemCounter(addedItems) <= 1 ? "" : "s"}
            </span>
          </div>
          <MinicartList />
          <MinicartFooter isMinicartOpen={isMinicartOpen} />
        </div>
      </>
    );
  }
}

export default Minicart;
