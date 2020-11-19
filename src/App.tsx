import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import PokemonDetailComponent from "./pokedex/PokemonDetailComponent";
import PokemonsComponent from "./pokedex/PokemonsComponent/PokemonsComponent";

function App() {
  return (
    <>
      <main>
        <Router>
          <Route exact path="/">
            <h1 className="title">
              Welcome to <strong className="titleBold">PokedexMD</strong>
            </h1>
            <h2 className="subtitle">Your favorite Pokemon encyclopedia</h2>
            <PokemonsComponent />
          </Route>
          <Route path="/:name" component={PokemonDetailComponent}></Route>
        </Router>
      </main>
    </>
  );
}

export default App;
