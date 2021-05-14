import React, { Component } from "react";
import "./Pokecard.css";

class Pokecard extends Component {
  render() {
    return (
      <div className="Pokecard" onClick={this.props.handleInfo}>
        <p>{this.props.id}</p>
        <img src={this.props.img} alt={this.props.name} />
        <h2>
          {this.props.name[0].toUpperCase() + this.props.name.substring(1)}
        </h2>
      </div>
    );
  }
}

export default Pokecard;
