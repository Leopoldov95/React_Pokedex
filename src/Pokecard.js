import React, { Component } from "react";
import "axios";
import "./Pokecard.css";
import axios from "axios";

class Pokecard extends Component {
  /*  constructor(props) {
    super(props);
    this.state = {
      types: [],
    };
  } */
  lPad(value, padding) {
    var zeroes = new Array(padding + 1).join("0");
    return (zeroes + value).slice(-padding);
  }

  getTypes(url) {
    let res = axios.get(url);
    console.log(res);
    /*  const typeData = res.data.types;
    const arr = [];
    for (let i of typeData) {
      arr.push(i.type.name);
    } */
    /* this.setState({
        types: [arr],
      }); */
    //return arr;
  }

  render() {
    //this.getTypes(this.props.info);
    /* let types =  */ this.getTypes(this.props.info);
    //console.log(types);

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
