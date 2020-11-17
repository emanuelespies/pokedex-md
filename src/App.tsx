import React, { useEffect, useState } from "react";
import "./App.scss";
import Pokemon from "./pokedex/Pokemon";
import PokemonsApiResourceList from "./services/models/interfaces/PokemonsApiResourceList";
import pokeApiService from "./services/pokeApiService";

function App() {
  const [pokemonApiResource, setPokemonApiResource] = useState<
    PokemonsApiResourceList
  >(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("pokemonApiResource") || "{}") ?? {}
      );
    } catch {
      console.error("The api resource could not be parsed into JSON");
      return {};
    }
  });

  useEffect(() => {
    if (!Object.keys(pokemonApiResource).length) {
      const fetchData = async () => {
        const pokemons = await pokeApiService.fetchPokemons(150);

        setPokemonApiResource(pokemons);
        localStorage.setItem("pokemonApiResource", JSON.stringify(pokemons));
      };
      fetchData();
    }
  });

  return (
    <>
      <header>Welcome to Pokedex MD</header>
      <section className="pokemon-list">
        <ul>
          {pokemonApiResource.results.map((pokemon, index) => (
            <Pokemon key={index} name={pokemon.name} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
