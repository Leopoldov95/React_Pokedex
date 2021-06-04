import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid/dist/v4";
import Pokecard from "./Pokecard";
import Pokeinfo from "./Pokeinfo";
import Pokename from "./Pokename";
import TypeInfo from "./types.json";

import Pokenav from "./Pokenav";
import "./Pokedex.css";
import "./media.css";

const API_URl = "https://pokeapi.co/api/v2/pokemon/";
const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const POKE_FORMS = "https://pokeapi.co/api/v2/pokemon-species/";

class Pokedex extends Component {
  static defaultProps = {
    default: 151,
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
    this.handleInput = this.handleInput.bind(this);
    this.closeAutocomplete = this.closeAutocomplete.bind(this);
  }

  componentDidMount() {
    // just want to generate intial display here
    this.getPokemon(0, this.props.default);
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
    if (document.querySelector(".myLinks").classList.contains("menu-active")) {
      document.querySelector(".myLinks").classList.remove("menu-active");
    }
  }

  closeAutocomplete() {
    if (document.querySelector(".Autocomplete-list")) {
      document.querySelector(".Autocomplete-list").style.display = "none";
      document.querySelector(".form-text").value = "";
    }
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
    let {
      evolution_chain,
      evolves_from_species,
      flavor_text_entries,
      varieties,
    } = res.data;
    data.push(evolves_from_species, evolution_chain, flavor_text_entries);
    if (varieties.length > 1) {
      if (varieties[0].pokemon.name !== "pikachu") {
        for (let prop of form) {
          data.push(prop.pokemon);
        }
      } else {
        data.push(form[0].pokemon);
      }

      return data;
    }
    return data;
  }

  async handleInfo(info, forms) {
    this.closeAutocomplete();

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

    // left off here, handle the addtional information!
    let extraData = await this.getForms(forms);

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
      extraData,
    });
    this.setState({
      displayPokedex: false,
      currPokemon: data,
    });
  }

  handleInput(e) {
    if (
      e.target.className !== "Autocomplete" ||
      e.target.className !== "Listpokemon"
    ) {
      this.closeAutocomplete();
    }
  }

  render() {
    let generatePokemon = this.state.pokemon.map((p) => (
      <Pokecard
        handleInfo={() => this.handleInfo(p.info, p.id)}
        type={TypeInfo[p.id - 1]}
        name={p.name}
        info={p.info}
        id={p.id}
        img={p.img}
        key={p.id}
      />
    ));

    let currentPokemon = this.state.currPokemon[0];

    return (
      <div className="Pokedex" onClick={this.handleInput}>
        <Pokenav
          displayPokemon={this.displayPokemon}
          handleInfo={this.handleInfo}
        />

        {this.state.displayPokedex ? (
          <div>
            {/*   <img src="./pokemon-types/bug.png" /> */}
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
              <i className="fas fa-angle-left"></i>
            </div>
            <div>
              <h1>Pokemon info</h1>

              <Pokename
                name={currentPokemon.name}
                varieties={currentPokemon.varieties}
                handleInfo={this.handleInfo}
                id={currentPokemon.id}
                key={uuid()}
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
                key={uuid()}
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
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        )}
        <div className="Pokedex-footer">
          <p>
            created by{" "}
            <a href="https://github.com/Leopoldov95" target="#">
              Leopoldo Ortega
            </a>
          </p>
          <p>
            powered by{" "}
            <a href="https://pokeapi.co/" target="#">
              Pokeapi
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Pokedex;
