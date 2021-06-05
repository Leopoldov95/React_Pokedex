import React, { Component } from "react";
import axios from "axios";
import "./Pokeinfo.css";

const POKE_IMG =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const SPRITE_IMG = "https://img.pokemondb.net/sprites/home/normal/";
const SPRITE_ALT =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

class Pokeinfo extends Component {
  constructor(props) {
    super(props);
    this.state = { evo_forms: [] };
    this.typeColor = this.typeColor.bind(this);
    this.padToThree = this.padToThree.bind(this);
    this.handleStats = this.handleStats.bind(this);
    this.progressColor = this.progressColor.bind(this);
    this.calcBST = this.calcBST.bind(this);
    this.handleEvo = this.handleEvo.bind(this);
  }
  componentDidMount() {
    this.handleEvo(this.props.evolution);
  }
  padToThree(num) {
    return num <= 999 ? `00${num}`.slice(-3) : num;
  }

  async handleEvo(url) {
    try {
      const evoArr = [];
      const res = await axios.get(url.url);
      const data = res.data.chain;
      const species = data.species.name;
      // this will always return the first pokemon in the evolution chain
      evoArr.push(species);
      const evolvesTo = data.evolves_to;

      if (evolvesTo.length > 0) {
        evoArr.push(evolvesTo[0].species.name);
        if (evolvesTo[0].evolves_to.length > 0) {
          evoArr.push(evolvesTo[0].evolves_to[0].species.name);
        }
      }
      //console.log(evoArr);
      //return evoArr;
      //console.log(...evoArr);
      //console.log(this.state.evo_forms);
      this.setState({ evo_forms: [...evoArr] });
      console.log(this.state.evo_forms);
    } catch (err) {
      alert(err);
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
      default:
        return "white";
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

  calcBST() {
    const init = 0;
    const reducer = (total, curr) => {
      return total + curr.base_stat;
    };
    return this.props.stats.reduce(reducer, init);
  }
  render() {
    //console.log(evo_forms);
    const generateAbilities = this.props.abilities.map((a) => (
      <li key={a.ability.name}>{a.ability.name}</li>
    ));
    const statName = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
    let generateStats = this.props.stats.map((s) => (
      <div className="Pokeinfo-stat-container">
        <div>{statName[this.props.stats.indexOf(s)]}:</div>
        <div className="progress">
          <div
            className="progress-done"
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

    return (
      <div className="Pokeinfo">
        <div className="Pokeinfo-top">
          <div>
            <img
              src={`${POKE_IMG}${this.props.id}.png`}
              alt={`${this.props.name}_img`}
            />
          </div>
          <div className="Pokeinfo-info">
            <div>
              <h2>Pokedex No.</h2>
              <p>{this.padToThree(this.props.species.url.split("/")[6])}</p>
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

          <div className="Pokeinfo-stats">
            {generateStats}
            <p>
              BST: <span style={{ fontWeight: "bold" }}>{this.calcBST()}</span>
            </p>
          </div>
        </div>
        <div className="Pokeinfo-bottom">
          <div>
            <h2>Description</h2>
            <div>
              <p>{this.props.desc}</p>
            </div>
          </div>
          <div>
            <h2>Evolution</h2>
            <div>
              {this.state.evo_forms.map((evo) => (
                <div className="Pokeinfo-card">
                  <img src={`${SPRITE_IMG}${evo}.png`} />
                  <span>{evo}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>Forms</h2>
            <div>
              {this.props.forms.map((form) => (
                <div className="Pokeinfo-forms">
                  <img
                    src={`${POKE_IMG}${form.url
                      .replace("https://pokeapi.co/api/v2/pokemon/", "")
                      .replace("/", "")}.png`}
                  />
                  <span>{form.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokeinfo;
