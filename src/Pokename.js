import React, { Component } from "react";
import uuid from "uuid/dist/v4";
import "./Pokename.css";

class Pokename extends Component {
  render() {
    let form;
    if (this.props.varieties) {
      form = this.props.varieties.map((v) => (
        <div
          key={uuid()}
          className="Pokename-title"
          onClick={() => this.props.handleInfo(v.url, v.name.split("-")[0])}
        >
          {v.name[0].toUpperCase() + v.name.substring(1)}
        </div>
      ));
    } else {
      form = (
        <div className="Pokename-title">
          {this.props.name[0].toUpperCase() + this.props.name.substring(1)}
        </div>
      );
    }
    return <div className="Pokename">{form}</div>;
  }
}

export default Pokename;
