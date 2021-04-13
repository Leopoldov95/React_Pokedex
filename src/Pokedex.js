import React, { Component } from "react";
import axios from "axios";
import Pokecard from "./Pokecard";
import Pokeinfo from "./Pokeinfo";
import Pokename from "./Pokename";
import Autocomplete from "./Autocomplete";
import "./Pokedex.css";
import logo from "./pokeball.png";

// sinc api only returns a set of urls rather than individual json files for each pokemon, may be better to just loop/increment this url based on my numeric needs
const API_URl = "https://pokeapi.co/api/v2/pokemon/";
const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const POKE_FORMS = "https://pokeapi.co/api/v2/pokemon-species/";

class Pokedex extends Component {
  static defaultProps = {
    defaultList: 151,
    genTwo: 251,
    genThree: 386,
    genFour: 493,
    genFive: 649,
    genSix: 721,
    genSeven: 809,
    genEight: 898,
  };
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [], // all pokemon will be stored here
      loading: false,
      displayPokedex: true,
      currPokemon: [],
    };
    this.displayPokemon = this.displayPokemon.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.getForms = this.getForms.bind(this);
  }

  componentDidMount() {
    // just want to generate intial display here
    this.getPokemon(0, this.props.defaultList);
  }

  async getPokemon(start, end) {
    try {
      let res = await axios.get(`${API_URl}?limit=${end}`);
      let data = res.data.results;
      let pokemon = [];
      for (let i = start; i < end; i++) {
        pokemon.push({
          name: data[i].name,
          info: data[i].url,
          id: i + 1,
          img: `${IMG_URL}${i + 1}.png`,
        });
      }
      this.setState((st) => ({
        loading: false,
        displayPokedex: true,
        pokemon: [...st.pokemon, ...pokemon],
      }));
    } catch (err) {
      alert(err);
    }
  }

  displayPokemon(start, end) {
    this.setState({ pokemon: [] });

    this.getPokemon(start, end);
  }

  async getPokeInfo(url) {
    try {
      let res = await axios.get(url);
      return res.data;
    } catch (err) {
      alert(err);
    }
  }

  async getForms(forms) {
    let data = [];
    let res = await axios.get(`${POKE_FORMS}${forms}/`);
    let form = res.data.varieties;
    if (form.length > 1) {
      for (let prop of form) {
        data.push(prop.pokemon);
      }
      return data;
    }
    return false;
  }

  async handleInfo(info, forms) {
    let data = [];
    const {
      name,
      weight,
      id,
      types,
      height,
      abilities,
      species,
      stats,
      sprites,
    } = await this.getPokeInfo(info);

    let varieties = await this.getForms(forms);

    data.push({
      name,
      weight,
      id,
      types,
      height,
      abilities,
      stats,
      sprites,
      species,
      varieties,
    });
    this.setState({
      displayPokedex: false,
      currPokemon: data,
    });
    console.log(this.state.currPokemon);
  }

  render() {
    let generatePokemon = this.state.pokemon.map((p) => (
      <Pokecard
        handleInfo={() => this.handleInfo(p.info, p.id)}
        name={p.name}
        info={p.info}
        id={p.id}
        img={p.img}
        key={p.id}
      />
    ));

    let currentPokemon = this.state.currPokemon[0];

    return (
      <div className="Pokedex">
        <div className="Pokedex-nav">
          <div className="Pokedex-nav-top">
            <div>
              <h1>Pokedex</h1>
            </div>
            <div>
              <Autocomplete displayPokemon={this.handleInfo} />
              <img src={logo} alt="pokeball_icon" />
            </div>
          </div>
          <div className="Pokedex-nav-bottom">
            <ul>
              <li onClick={() => this.displayPokemon(0, 898)}>All</li>
              <li
                onClick={() => this.displayPokemon(0, this.props.defaultList)}
              >
                Gen 1
              </li>
              <li
                onClick={() =>
                  this.displayPokemon(this.props.defaultList, this.props.genTwo)
                }
              >
                Gen 2
              </li>
              <li
                onClick={() =>
                  this.displayPokemon(this.props.genTwo, this.props.genThree)
                }
              >
                Gen 3
              </li>
              <li
                onClick={() =>
                  this.displayPokemon(this.props.genThree, this.props.genFour)
                }
              >
                Gen 4
              </li>
              <li
                onClick={() =>
                  this.displayPokemon(this.props.genFour, this.props.genFive)
                }
              >
                Gen 5
              </li>
              <li
                onClick={() =>
                  this.displayPokemon(this.props.genFive, this.props.genSix)
                }
              >
                Gen 6
              </li>
              <li
                onClick={() =>
                  this.displayPokemon(this.props.genSix, this.props.genSeven)
                }
              >
                Gen 7
              </li>
              <li onClick={() => this.displayPokemon(this.props.genSeven, 898)}>
                Gen 8
              </li>
            </ul>
          </div>
        </div>
        {this.state.displayPokedex ? (
          <div>
            <h1>React Pokedex</h1>
            <div className="Pokedex-pokemon">{generatePokemon}</div>
          </div>
        ) : (
          <div className="Pokedex-info-container">
            <div
              className="Pokedex-prev"
              onClick={() =>
                this.handleInfo(
                  `${API_URl}${Number(
                    currentPokemon.species.url.split("/")[6] - 1
                  )}/`,
                  Number(currentPokemon.species.url.split("/")[6] - 1)
                )
              }
            >
              <i class="fas fa-angle-left"></i>
            </div>
            <div>
              <h1>Pokemon info</h1>

              <Pokename
                name={currentPokemon.name}
                varieties={currentPokemon.varieties}
                handleInfo={this.handleInfo}
                id={currentPokemon.id}
                img={currentPokemon.sprites.front_default}
              />

              <Pokeinfo
                img={currentPokemon.sprites.front_default}
                types={currentPokemon.types}
                name={currentPokemon.name}
                weight={currentPokemon.weight}
                height={currentPokemon.height}
                abilities={currentPokemon.abilities}
                id={currentPokemon.id}
                stats={currentPokemon.stats}
                forms={currentPokemon.varieties}
                species={currentPokemon.species}
              />
            </div>
            <div
              className="Pokedex-next"
              onClick={
                () =>
                  this.handleInfo(
                    `${API_URl}${
                      Number(currentPokemon.species.url.split("/")[6]) + 1
                    }/`,
                    Number(currentPokemon.species.url.split("/")[6]) + 1
                  )
                /* 
                this.handleInfo(
                  `${API_URl}${currentPokemon.species.url.split("/")[6] - 1}/`,
                  currentPokemon.species.url.split("/")[6] - 1
                ) */
              }
            >
              <i class="fas fa-angle-right"></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Pokedex;
