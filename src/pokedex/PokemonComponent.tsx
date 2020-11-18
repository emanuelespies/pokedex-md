import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonDetail from "../services/models/interfaces/PokemonDetail";
import { PokemonComponentProps } from "../services/models/types/PokemonComponentProps";
import pokeApiService from "../services/pokeApiService";

export default function PokemonComponent({ name }: PokemonComponentProps) {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();

  /** fetchs the pokemon detail */
  useEffect(() => {
    const fetchData = async () => {
      const pokemonDetail = await pokeApiService.fetchPokemonDetail(name);
      setPokemonDetail(pokemonDetail);
    };
    fetchData();
  }, [name]);

  return (
    <li key={pokemonDetail?.id}>
      <Link
        to={{
          pathname: `/${name}`,
          state: { pokemonDetail },
        }}
      >
        <p>{name}</p>
        {pokemonDetail?.sprites?.front_default !== null && (
          <img
            src={pokemonDetail?.sprites.front_default}
            alt={`Pokemon is ${name}`}
          />
        )}
      </Link>
    </li>
  );
}
