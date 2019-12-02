import React from "react";
import { Link } from "react-router-dom";

export class ImageContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link to="/">
        <div style={{ height: "100%", width: "100%", backgroundColor: "red" }}>
          {" "}
        </div>
      </Link>
    );
  }
}
