import React from "react";
import ReactDOM from "react-dom";
import OverviewListContainer from "./OverviewListContainer";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/App.css";
import {createBrowserHistory} from 'history'
class App extends React.Component {
  componentDidMount(){
    const history = createBrowserHistory()

  }
  render() {
    return (
      <Router>
        <div className={"private-container"}>
          <div className={"left-column"} />
          <div className={"right-column"}>
            <OverviewListContainer />
          </div>
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
