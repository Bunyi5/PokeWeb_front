import React from 'react';
import history from './../history'

import '../style/PokemonForm.css'

export default class PokemonForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemon: {}
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

        let pokemon = {
            'pokeName': this.state.pokemon.pokeName,
            'height': this.state.pokemon.height,
            'weight': this.state.pokemon.weight,
            'ability': this.state.pokemon.ability
        }

        fetch('http://localhost:8080/addNewPokemon', {
            method: 'POST',
            body: JSON.stringify(pokemon),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log('New Pokemon successfully added to database');
                history.push('/pokemons')
            } else {
                console.log('Error at fetch')
            }
        })
    }


    render() {
        return (
            <div>
                <form id='pokemonForm' className='container center_div col-3' onSubmit={this.handleSubmit}>

                    <div className='form-group'>
                        <label>Pokemon Name</label>
                        <input type='text' className='form-control form-control-lg'
                            onChange={this.changePokemon('pokeName')} placeholder='Enter the pokemon name' />
                    </div>
                    <div className='form-group'>
                        <label>Pokemon Height</label>
                        <input type='number' className='form-control form-control-lg'
                            onChange={this.changePokemon('height')} placeholder='Enter the pokemon height' />
                    </div>
                    <div className='form-group'>
                        <label>Pokemon Weight</label>
                        <input type='number' className='form-control form-control-lg'
                            onChange={this.changePokemon('weight')} placeholder='Enter the pokemon weight' />
                    </div>
                    <div className='form-group'>
                        <label>Pokemon Ability</label>
                        <input type='text' className='form-control form-control-lg'
                            onChange={this.changePokemon('ability')} placeholder='Enter the pokemon ability' />
                    </div>

                    <input className='btn btn-primary btn-lg' type='submit' value='Submit' />
                </form>
            </div>
        );
    }
}
