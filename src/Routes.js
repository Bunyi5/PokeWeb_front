import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import PokemonForm from './components/PokemonForm'
import PokemonTable from "./components/PokemonTable";
import history from './history';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/pokemons" exact component={PokemonTable} />
                    <Route path="/addNewPokemon" component={PokemonForm} />
                </Switch>
            </Router>
        )
    }
}