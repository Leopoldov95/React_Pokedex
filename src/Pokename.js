import React, { Component } from "react";
import "./Pokename.css";

class Pokename extends Component {
  render() {
    let form;
    if (this.props.varieties) {
      // console.log(this.props.varieties[0].url.split("/")[6]);
      form = this.props.varieties.map((v) => (
        <div
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
    return (
      <div className="Pokename">
        {/* <div className="Pokedex-info-title">
          {this.props.name[0].toUpperCase() + this.props.name.substring(1)}
        </div> */}
        {form}
        {/*  <div className="Pokedex-info-title">
          {this.props.varieties.name[1].toUpperCase() +
            this.props.varieties.name.substring(1)}
        </div> */}
      </div>
    );
  }
}

export default Pokename;
