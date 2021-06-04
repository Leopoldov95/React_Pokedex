import React, { Component } from "react";
import "axios";
import "./Pokecard.css";
import axios from "axios";

class Pokecard extends Component {
  /*   handleTypes(type) {
  
    if (type.length > 1) {
      return `${(
        <div>
          <img src="./pokemon-types/${type[0]}.png" />
          <img src="./pokemon-types/{type[1]}.png" />
        </div>
      )}`;
    } else {
      return `${(<img src="./pokemon-types/${type[0]}.png" />)}`;
    }
  } */
  /*   <img src="./pokemon-types/bug.png" /> */
  lPad(value, padding) {
    var zeroes = new Array(padding + 1).join("0");
    return (zeroes + value).slice(-padding);
  }

  /*   getTypes(url) {
    let res = axios.get(url);
    console.log(res);
    /*  const typeData = res.data.types;
    const arr = [];
    for (let i of typeData) {
      arr.push(i.type.name);
    } */
  /* this.setState({
        types: [arr],
      }); 
    //return arr;
  } */

  render() {
    //this.getTypes(this.props.info);
    // let types = this.getTypes(this.props.info);
    //console.log(types);

    /*   let icons;

    if (this.props.type > 1) {
      icons = `${(
        <div>
          <img src="./pokemon-types/bug.png" />
          <img src="./pokemon-types/bug.png" />
        </div>
      )}`;
    } else {
      icons = `${(<img src="./pokemon-types/bug.png" />)}`;
    } */

    return (
      <div
        className="Pokecard"
        onClick={this.props.handleInfo}
        style={{ backgroundColor: `var(--bg-${this.props.type[0]})` }}
      >
        <p>{this.lPad(this.props.id, 3)}</p>

        <div class="Pokecard-bg">
          <img src="./poke-ball.png" />
        </div>

        <img src={this.props.img} alt={this.props.name} />
        <span>
          {this.props.type.length > 1 ? (
            <div>
              <img
                className="Pokecard-icon"
                src={`./pokemon-types/${this.props.type[0]}.png`}
              />
              <img
                className="Pokecard-icon"
                src={`./pokemon-types/${this.props.type[1]}.png`}
              />
            </div>
          ) : (
            <img
              className="Pokecard-icon"
              src={`./pokemon-types/${this.props.type[0]}.png`}
            />
          )}
        </span>
        <h2>
          {this.props.name[0].toUpperCase() + this.props.name.substring(1)}
        </h2>
      </div>
    );
  }
}

export default Pokecard;
