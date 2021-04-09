import { logRoles } from "@testing-library/dom";
import React, { Component } from "react";
import "./Pokeinfo.css";

const POKE_IMG = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";

class Pokeinfo extends Component {
  constructor(props) {
    super(props);

    this.handleType = this.handleType.bind(this);
    this.handleAbility = this.handleAbility.bind(this);
    this.padToThree = this.padToThree.bind(this);
    this.handleStats = this.handleStats.bind(this);
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
  handleStats(num) {
    if (num > 180) {
      return 100;
    } else {
      return (num + 20) / 2;
    }
  }

  render() {
    const statName = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
    let generateStats = this.props.stats.map((s) => (
      <div className="Pokeinfo-stat-container">
        <div>{statName[this.props.stats.indexOf(s)]}:</div>
        <div class="progress">
          <div
            class="progress-done"
            style={{
              width: `${this.handleStats(s.base_stat)}%`,
              opacity: 1,
            }}
          >
            {s.base_stat}
          </div>
        </div>
      </div>
    ));
    console.log(this.props);
    let imgSrc = `${POKE_IMG}${this.padToThree(this.props.id)}.png`;
    return (
      <div className="Pokeinfo-container">
        <div className="Pokeinfo">
          <div>
            <img src={imgSrc} alt={`${this.props.name}_img`} />
          </div>
          <div className="Pokeinfo-info">
            <div>
              <h1>{this.props.name}</h1>
            </div>
            <div>
              <h2>Pokedex No.</h2>
              <p>{this.props.id}</p>
            </div>
            <div>
              <h2>Type:</h2>
              <p>{this.handleType()}</p>
            </div>
            <div>
              <h2>Weight:</h2>
              <p>{this.props.weight / 10}kg</p>
            </div>
            <div>
              <h2>Height:</h2>
              <p>{this.props.height / 10}m</p>
            </div>
            <div>
              <h2>Abilities:</h2>
              <p>{this.handleAbility()}</p>
            </div>
          </div>

          <div className="Pokeinfo-stats">{generateStats}</div>
        </div>
      </div>
    );
  }
}

export default Pokeinfo;
