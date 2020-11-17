import React, { useEffect, useState } from "react";
import PokemonDetail from "../services/models/interfaces/PokemonDetail";
import { PokemonProps } from "../services/models/types/PokemonProps";
import pokeApiService from "../services/pokeApiService";

export default function Pokemon({ name }: PokemonProps) {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();

  useEffect(() => {
    const fetchData = async () => {
      const pokemonDetail = await pokeApiService.fetchPokemonDetail(name);
      setPokemonDetail(pokemonDetail);
    };
    fetchData();
  }, [name]);

  return (
    <li key={pokemonDetail?.id}>
      <p>{name}</p>
      {pokemonDetail?.sprites?.front_default !== null && (
        <img
          src={pokemonDetail?.sprites.front_default}
          alt={`Pokemon is ${name}`}
        />
      )}
    </li>
  );
}
