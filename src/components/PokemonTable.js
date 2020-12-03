import React from 'react';
import history from './../history'

import '../style/PokemonTable.css'

export default class PokemonTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [{}]
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/pokemons', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          pokemons: responseData
        })
      }).catch(function() {
        console.error('Error fetching all pokemons from database!')
      })
  }

  deletePokemon(id, pokeName) {
    if (window.confirm('Are you sure you want to delete ' + pokeName + '?')) {
      fetch('http://localhost:8080/deletePokemon?id=' + id, {
        method: 'DELETE',
      }).then(response => {
        if (response.ok) {
          console.log('Pokemon with id: ' + id + ' successfully deleted from the database');
          window.location.reload();
        } else {
          console.error('Error deleting pokemon with ' + pokeName + ' name and ' + id + ' id!')
        }
      })
    }
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
          <td>
            <button className='btn btn-primary' onClick={() => history.push({
              pathname: '/editPokemon/' + id,
              state: {
                pokemon: pokemon
              }
              })}>Edit</button>
            <button className='btn btn-danger' onClick={() => this.deletePokemon(id, pokeName)}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <table id='pokemons'>
          <tbody>
            <tr>
              {this.renderTableHeader()}
              <th>Edit/Delete</th>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>

    );
  }

}