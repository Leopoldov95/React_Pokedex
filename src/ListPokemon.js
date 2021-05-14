import React, { Component } from "react";
import "./ListPokemon.css";

class ListPokemon extends Component {
  render() {
    return (
      <li
        className="Listpokemon"
        onClick={() =>
          this.props.displayPokemon(
            this.props.url,
            this.props.name.toLowerCase()
          )
        }
      >
        <img src={this.props.img} alt={this.props.name} />
        {this.props.name}
      </li>
    );
  }
}

export default ListPokemon;
