import { logRoles } from "@testing-library/dom";
import React, { Component } from "react";
import axios from "axios";
import "./Pokeinfo.css";

const POKE_IMG = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKE_FORMS = "https://pokeapi.co/api/v2/pokemon-species/";

class Pokeinfo extends Component {
  constructor(props) {
    super(props);

    this.handleType = this.handleType.bind(this);
    this.typeColor = this.typeColor.bind(this);
    this.padToThree = this.padToThree.bind(this);
    this.handleStats = this.handleStats.bind(this);
    this.progressColor = this.progressColor.bind(this);
  }

  async componentDidMount() {
    let res = await axios.get(`${POKE_FORMS}${this.props.id}/`);
    if (res.data.varieties.length > 1) {
      console.log("this pokemon has more than 1 form");
      console.log(res.data.varieties);
    }
  }

  padToThree(num) {
    return num <= 999 ? `00${num}`.slice(-3) : num;
  }

  handleType() {
    const data = this.props.types;

    if (data.length === 1) {
      return `<span className="Pokeinfo-type">${data[0].type.name}</span>`;
    } else {
      return `
      <span className="Pokeinfo-type">${data[0].type.name}</span>
      <span className="Pokeinfo-type">${data[1].type.name}</span>
      `;
    }
  }

  handleStats(num) {
    if (num > 180) {
      return 100;
    } else {
      return (num + 20) / 2;
    }
  }

  typeColor(name) {
    switch (name) {
      case "fire":
        return "red";
      case "grass":
        return "green";
      case "water":
        return "blue";
      case "ice":
        return "teal";
      case "ground":
        return "burlywood";
      case "rock":
        return "brown";
      case "dragon":
        return "darkslateblue";
      case "fairy":
        return "pink";
      case "fighting":
        return "crimson";
      case "dark":
        return "black";
      case "ghost":
        return "indigo";
      case "psychic":
        return "purple";
      case "bug":
        return "olive";
      case "poison":
        return "darkmagenta";
      case "normal":
        return "grey";
      case "steel":
        return "silver";
      case "electric":
        return "gold";
      case "flying":
        return "lightblue";
    }
  }

  progressColor(perc) {
    if (perc < 21) {
      return "red";
    } else if (perc < 41) {
      return "orangered";
    } else if (perc < 61) {
      return "yellow";
    } else if (perc < 75) {
      return "yellowgreen";
    } else if (perc < 88) {
      return "rgb(0, 175, 0)";
    } else {
      return "turquoise";
    }
  }

  render() {
    const generateAbilities = this.props.abilities.map((a) => (
      <li>{a.ability.name}</li>
    ));
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
              backgroundColor: `${this.progressColor(
                this.handleStats(s.base_stat)
              )}`,
            }}
          >
            {s.base_stat}
          </div>
        </div>
      </div>
    ));

    let imgSrc = `${POKE_IMG}${this.padToThree(this.props.id)}.png`;
    return (
      <div className="Pokeinfo">
        <div>
          <img src={imgSrc} alt={`${this.props.name}_img`} />
        </div>
        <div className="Pokeinfo-info">
          {/*  <div>
            <h1>
              {this.props.name[0].toUpperCase() + this.props.name.substring(1)}
            </h1>
          </div> */}
          <div>
            <h2>Pokedex No.</h2>
            <p>{this.padToThree(this.props.id)}</p>
          </div>
          <div>
            <h2>Type:</h2>
            {this.props.types.length === 1 ? (
              <span
                className="Pokeinfo-type"
                style={{
                  backgroundColor: `${this.typeColor(
                    this.props.types[0].type.name
                  )}`,
                }}
              >
                {this.props.types[0].type.name}
              </span>
            ) : (
              <div>
                <span
                  className="Pokeinfo-type"
                  style={{
                    backgroundColor: `${this.typeColor(
                      this.props.types[0].type.name
                    )}`,
                  }}
                >
                  {this.props.types[0].type.name}
                </span>
                <span
                  className="Pokeinfo-type"
                  style={{
                    backgroundColor: `${this.typeColor(
                      this.props.types[1].type.name
                    )}`,
                  }}
                >
                  {this.props.types[1].type.name}
                </span>
              </div>
            )}
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
            <ul>{generateAbilities}</ul>
          </div>
        </div>

        <div className="Pokeinfo-stats">{generateStats}</div>
      </div>
    );
  }
}

export default Pokeinfo;
