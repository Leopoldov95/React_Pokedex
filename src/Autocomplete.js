import React, { Component } from "react";
import PokeName from "./pokemon.json";
import ListPokemon from "./ListPokemon";
import "./Autocomplete.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = { search: "" };
  }

  handleFocus() {
    if (document.querySelector(".Autocomplete-list")) {
      document.querySelector(".Autocomplete-list").style.display = "block";
    }
  }

  handleChange(e) {
    // use pokeName.indexOf(poekmon name) to get real index/id value of pokemon
    let searchTerm = document.querySelector("input").value;
    if (searchTerm.length > 1) {
      let adjustedSearch =
        searchTerm[0].toUpperCase() + searchTerm.substring(1);
      this.setState({
        search: PokeName.filter((word) => word.includes(adjustedSearch)),
      });
    }
    if (document.querySelector(".Autocomplete-list")) {
      document.querySelector(".Autocomplete-list").style.display = "block";
    }
  }

  render() {
    let displayRes;
    if (this.state.search.length >= 1) {
      displayRes = this.state.search.map((p) => (
        <ListPokemon
          key={p}
          name={p}
          displayPokemon={this.props.displayPokemon}
          url={`${API_URL}${PokeName.indexOf(p) + 1}/`}
          img={`${IMG_URL}${PokeName.indexOf(p) + 1}.png`}
        />
      ));
    }

    return (
      <div className="Autocomplete" onKeyUp={this.handleChange}>
        <form className="Autocomplete-form" autoComplete="off">
          <div className="form-border">
            <i className="fas fa-search"> </i>
            <input
              onFocus={this.handleFocus}
              className="form-text"
              type="text"
              name="search"
              placeholder="Search"
            />
          </div>
          {this.state.search.length >= 1 ? (
            <div className="Autocomplete-list ">
              <ul>{displayRes}</ul>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}

export default Autocomplete;
