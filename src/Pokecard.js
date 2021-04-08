import React, { Component } from "react";
import "./Pokecard.css";
// upo clicking a card, will take me to a SEPERATE info page
class Pokecard extends Component {
  render() {
    return (
      <div className="Pokecard" onClick={this.props.handleInfo}>
        <p>{this.props.id}</p>
        <img src={this.props.img} />
        <h2>
          {this.props.name[0].toUpperCase() + this.props.name.substring(1)}
        </h2>
      </div>
    );
  }
}

export default Pokecard;
