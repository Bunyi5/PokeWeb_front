import React from 'react';
import history from '../history'

import '../style/NewPokemon.css'

export default class NewPokemon extends React.Component {

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

        fetch('http://localhost:8080/addNewPokemon', {
            method: 'POST',
            body: JSON.stringify(this.state.pokemon),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log('New Pokemon: ' + this.state.pokemon.pokeName + ' successfully added to database');
                history.push('/pokemons')
            } else {
                console.error('Error adding new pokemon to the database!');
                alert('Pokemon already exists!');
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
                            required
                            className='form-control form-control-lg'
                            onChange={this.changePokemon('pokeName')}
                            placeholder='Enter the pokemon name' />
                    </div>
                    <div className='form-group'>
                        <label>Pokemon Height</label>

                        <input type='number'
                            required
                            className='form-control form-control-lg'
                            onChange={this.changePokemon('height')}
                            placeholder='Enter the pokemon height' />
                    </div>
                    <div className='form-group'>
                        <label>Pokemon Weight</label>

                        <input type='number'
                            required
                            className='form-control form-control-lg'
                            onChange={this.changePokemon('weight')}
                            placeholder='Enter the pokemon weight' />
                    </div>
                    <div className='form-group'>
                        <label>Pokemon Ability</label>

                        <input type='text'
                            required
                            className='form-control form-control-lg'
                            onChange={this.changePokemon('ability')}
                            placeholder='Enter the pokemon ability' />
                    </div>

                    <input className='btn btn-primary btn-lg' type='submit' value='Submit' />
                </form>
            </div>
        );
    }
}
