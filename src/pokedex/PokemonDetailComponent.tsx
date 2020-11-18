import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PokemonDetail from "../services/models/interfaces/PokemonDetail";
import { PokemonDetailComponentProps } from "../services/models/types/PokemonDetailComponentProps";
import pokeApiService from "../services/pokeApiService";

export default function PokemonDetailComponent({
  location,
}: PokemonDetailComponentProps) {
  /** the name is the identifier of our router and pokemon */
  const { name }: { name: string } = useParams();
  /** store the detail from props.location */
  const [detail, setDetail] = useState<PokemonDetail>(
    location.state?.pokemonDetail
  );

  /** if user access the route directly, we fetch the pokemon detail data */
  useEffect(() => {
    if (!detail) {
      const fetchData = async () => {
        const pokemonDetail = await pokeApiService.fetchPokemonDetail(name);
        setDetail(pokemonDetail);
      };
      fetchData();
    }
  }, [name, detail]);

  return (
    <>
      {detail && (
        <>
          <Link to="/">Back to pokedex</Link>
          <h1>The Detail: {name}</h1>
          <p>Pokemon number: {detail.id}</p>
          {detail.types?.map((type, index) => (
            <p key={index}>
              types:
              {type.type.name}
            </p>
          ))}
        </>
      )}
    </>
  );
}
