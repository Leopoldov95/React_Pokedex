import React, { Component } from "react";
import "axios";
import "./Pokecard.css";
import axios from "axios";

class Pokecard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
    };
  }
  lPad(value, padding) {
    var zeroes = new Array(padding + 1).join("0");
    return (zeroes + value).slice(-padding);
  }

  async getTypes(url) {
    try {
      let res = await axios.get(url);
      const typeData = res.data.types;
      const arr = [];
      for (let i of typeData) {
        arr.push(i.type.name);
      }
      this.state.types.push(...arr);
    } catch (err) {
      alert(err);
    }
  }

  render() {
    this.getTypes("https://pokeapi.co/api/v2/pokemon/1/");
    console.log(this.state.types);
    return (
      <div className="Pokecard" onClick={this.props.handleInfo}>
        <p>{this.lPad(this.props.id, 3)}</p>

        <div class="Pokecard-bg">
          <img src="./poke-ball.png" />
        </div>
        <img src={this.props.img} alt={this.props.name} />
        <h2>
          {this.props.name[0].toUpperCase() + this.props.name.substring(1)}
        </h2>
      </div>
    );
  }
}

export default Pokecard;
