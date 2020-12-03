import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import NewPokemon from './components/NewPokemon'
import PokemonTable from './components/PokemonTable';
import EditPokemon from './components/EditPokemon'
import history from './history';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/pokemons' exact component={PokemonTable} />
                    <Route path='/newPokemon' component={NewPokemon} />
                    <Route path='/editPokemon/:id' component={EditPokemon} />
                </Switch>
            </Router>
        )
    }
}