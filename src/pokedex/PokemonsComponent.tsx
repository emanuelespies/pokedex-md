import React, { useEffect, useState } from "react";
import PokemonsApiResourceList from "../services/models/interfaces/PokemonsApiResourceList";
import pokeApiService from "../services/pokeApiService";
import PokemonComponent from "./PokemonComponent";

export default function PokemonsComponent() {
  /** store the api result */
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

  /** store the current page we are in */
  const [page, setPage] = useState<number>(1);
  /** the total of pokemons available in the api */
  const [totalPokemonsAvailable, setTotalPokemonsAvailable] = useState<number>(
    0
  );
  /** how many items we will fetch each time */
  const fetchAmount: number = 150;
  /** the offset to get the next available list of items */
  const [offset, setOffset] = useState<number>(0);

  /** fetchData only once if we dont have anything in the localStorage */
  useEffect(() => {
    const fetchData = async () => {
      const pokemons = await pokeApiService.fetchPokemons(fetchAmount, offset);

      if (pokemons) {
        setPokemonApiResource(pokemons);
        setTotalPokemonsAvailable(pokemons.count);

        // we only want to store the first load to speed up refresh for return users
        if (!Object.keys(pokemonApiResource).length && page === 0) {
          localStorage.setItem("pokemonApiResource", JSON.stringify(pokemons));
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <section className="pokemon-list">
      <button
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1);
          setOffset(offset - fetchAmount);
        }}
      >
        Prev
      </button>
      <button
        disabled={totalPokemonsAvailable / fetchAmount === page}
        onClick={() => {
          setOffset(fetchAmount + offset);
          setPage(page + 1);
        }}
      >
        Next
      </button>
      <ul>
        {pokemonApiResource?.results?.map((pokemon, index) => (
          <PokemonComponent key={index} name={pokemon.name} />
        ))}
      </ul>
    </section>
  );
}
