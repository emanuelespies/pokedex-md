import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import "./App.scss";
import PokemonDetailComponent from "./pokedex/PokemonDetailComponent/PokemonDetailComponent";
import PokemonsComponent from "./pokedex/PokemonsComponent/PokemonsComponent";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
  };

  return (
    <>
      <main>
        <Router>
          <ScrollToTop />
          <Route exact path="/">
            <section className="wrapper">
              <h1 className="title">
                Welcome to <strong className="title-bold">PokedexMD</strong>
              </h1>
              <h2 className="subtitle">Your favorite Pokemon encyclopedia</h2>
              <PokemonsComponent />
            </section>
          </Route>
          <Route path="/:name" component={PokemonDetailComponent}></Route>
        </Router>
      </main>
    </>
  );
}

export default App;
