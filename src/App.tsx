import React from "react";
import "./App.scss";
import { Route, BrowserRouter as Router } from "react-router-dom";
import PokemonsComponent from "./pokedex/PokemonsComponent";
import PokemonDetailComponent from "./pokedex/PokemonDetailComponent";

function App() {
  return (
    <>
      <main>
        <Router>
          <Route exact path="/">
            <h1>Welcome to pokedexmd</h1>
            <PokemonsComponent />
          </Route>
          <Route path="/:name" component={PokemonDetailComponent}></Route>
        </Router>
      </main>
    </>
  );
}

export default App;
