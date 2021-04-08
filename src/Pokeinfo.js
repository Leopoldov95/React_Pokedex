import React, { Component } from "react";
import "./Pokeinfo.css";

const POKE_IMG = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

class Pokeinfo extends Component {
  constructor(props) {
    super(props);
    this.handleType = this.handleType.bind(this);
    this.handleAbility = this.handleAbility.bind(this);
    this.padToThree = this.padToThree.bind(this);
  }

  padToThree(num) {
    return num <= 999 ? `00${num}`.slice(-3) : num;
  }

  handleType() {
    const data = this.props.types;

    if (data.length === 1) {
      return `${data[0].type.name}`;
    } else {
      return `${data[0].type.name}/${data[1].type.name}`;
    }
  }
  handleAbility() {
    const data = this.props.abilities;

    if (data.length === 1) {
      return `${data[0].ability.name}`;
    } else if (data.length === 2) {
      return `${data[0].ability.name}/${data[1].ability.name}`;
    } else {
      return `${data[0].ability.name}/${data[1].ability.name}/${data[2].ability.name}`;
    }
  }
  render() {
    let imgSrc = `${POKE_IMG}${this.padToThree(this.props.id)}.png`;
    return (
      <div className="Pokeinfo">
        <div>
          <img src={imgSrc} alt={`${this.props.name}_img`} />
        </div>
        <div className="Pokeinfo-info">
          <h1>{this.props.name}</h1>
          <p>Pokedex No. {this.props.id}</p>
          <p>Type: {this.handleType()}</p>
          <p>Weight: {this.props.weight / 10}kg </p>
          <p>Height: {this.props.height / 10}m </p>
          <p>Abilities: {this.handleAbility()}</p>
        </div>
      </div>
    );
  }
}

export default Pokeinfo;
