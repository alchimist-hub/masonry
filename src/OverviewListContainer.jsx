import React from "react";
import ReactDOM from "react-dom";
import OverviewList from "./OverviewList";
import fakerData from "./fakerData";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { ImageContainer } from "./imageE";

class OverviewListContainer extends React.PureComponent {
  static childContextTypes = {
    customElement: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isClicked: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getChildContext() {
    const { container } = this.state;
    return {
      customElement: container
    };
  }
  handleChange(clickValue) {
    this.setState(state => ({
      isClicked: clickValue
    }));
  }
  async handleClick() {
    await this.setState(state => ({
      isClicked: true
    }));
  }

  render() {
    return (
      <div
        id="scroll-wrapper"
        className="content-container"
        ref={e => this.setState({ container: e })}
      >
        <div className={"artwork"} />
        <div className={"header-sticky"}>List of profiles</div>

        <Switch>
          <Route exact path="/">
            <OverviewList items={fakerData(200)} />
          </Route>
          <Route path="/feed">
            <ImageContainer />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default OverviewListContainer;
