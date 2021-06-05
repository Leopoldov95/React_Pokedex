import React, { Component } from "react";
import "./Pokecard.css";

class Pokecard extends Component {
  lPad(value, padding) {
    var zeroes = new Array(padding + 1).join("0");
    return (zeroes + value).slice(-padding);
  }

  render() {
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
