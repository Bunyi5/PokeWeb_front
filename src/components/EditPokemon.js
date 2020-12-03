import React from 'react';
import history from '../history'

import '../style/NewPokemon.css'

export default class NewPokemon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.location.state.pokemon
        };
        this.changePokemon = this.changePokemon.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changePokemon(name) {
        return event => {
            this.setState(({ pokemon }) => ({
                pokemon: { ...pokemon, [name]: event.target.value }
            }));
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/updatePokemon', {
            method: 'PUT',
            body: JSON.stringify(this.state.pokemon),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log('Edited Pokemon: ' + this.state.pokemon.pokeName + ' and updated in database');
                history.push('/pokemons');
            } else {
                console.error('Error updating pokemon with ' + this.state.pokemon.id + ' id in the database!');
            }
        })
    }


    render() {
        return (
            <div>
                <form id='pokemonForm' className='container center_div col-3' onSubmit={this.handleSubmit}>

                    <div className='form-group'>
                        <label>Pokemon Name</label>

                        <input type='text'
                            className='form-control form-control-lg'
                            onChange={this.changePokemon('pokeName')}
                            value={this.state.pokemon.pokeName}
                            placeholder='Enter the pokemon name' />
                    </div>
                    <div className='form-group'>
                        <label>Pokemon Height</label>

                        <input type='number'
                            className='form-control form-control-lg'
                            onChange={this.changePokemon('height')}
                            value={this.state.pokemon.height}
                            placeholder='Enter the pokemon height' />
                    </div>
                    <div className='form-group'>
                        <label>Pokemon Weight</label>

                        <input type='number'
                            className='form-control form-control-lg'
                            onChange={this.changePokemon('weight')}
                            value={this.state.pokemon.weight}
                            placeholder='Enter the pokemon weight' />
                    </div>
                    <div className='form-group'>
                        <label>Pokemon Ability</label>

                        <input type='text'
                            className='form-control form-control-lg'
                            onChange={this.changePokemon('ability')}
                            value={this.state.pokemon.ability}
                            placeholder='Enter the pokemon ability' />
                    </div>

                    <input className='btn btn-primary btn-lg' type='submit' value='Update' />
                </form>
            </div>
        );
    }
}
