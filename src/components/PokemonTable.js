import React from 'react';

import "../style/PokemonTable.css"

export default class PokemonTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [{}]
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/pokemons', { method: 'GET' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          pokemons: responseData
        })
      });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.pokemons[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTableData() {
    return this.state.pokemons.map((pokemon, index) => {
      const { id, pokeName, height, weight, ability } = pokemon
      return (
        <tr key={index}>
          <td>{id}</td>
          <td>{pokeName}</td>
          <td>{height}</td>
          <td>{weight}</td>
          <td>{ability}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <table id='pokemons'>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>

    );
  }

}