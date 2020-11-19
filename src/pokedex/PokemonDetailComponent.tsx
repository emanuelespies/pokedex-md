import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChainLink from "../services/models/interfaces/ChainLink";
import PokemonDetail from "../services/models/interfaces/PokemonDetail";
import { PokemonDetailComponentProps } from "../services/models/types/PokemonDetailComponentProps";
import pokeApiService from "../services/pokeApiService";
import Loading from "../shared/Loading";

export default function PokemonDetailComponent({
  location,
}: PokemonDetailComponentProps) {
  /** the url is the identifier of our router and pokemon */
  const { name }: { name: string } = useParams();
  /** store the detail from props.location */
  const [detail, setDetail] = useState<PokemonDetail>(
    location.state?.pokemonDetail
  );
  /** Error Managing */
  const [error, setError] = useState<string>("");
  /** store the pokemon evolution */
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState<
    ChainLink
  >();

  /** if user access the route directly, we fetch the pokemon detail data */
  useEffect(() => {
    if (!detail) {
      const fetchData = async () => {
        const apiResult = await pokeApiService.fetchPokemonDetailByName(name);
        if (!apiResult.message) {
          setDetail(apiResult.result);
          setError("");
        } else {
          setError(apiResult.message);
        }
      };
      fetchData();
    }
  }, [name, detail]);

  /** Once loaded, we get the pokemon evolution details */
  useEffect(() => {
    if (detail) {
      const fetchData = async () => {
        const apiResult = await pokeApiService.fetchPokemonEvolution(detail.id);
        if (!apiResult.message) {
          setPokemonEvolutionChain(apiResult.result.chain);
          setError("");
        } else {
          setError(apiResult.message);
        }
      };
      fetchData();
    }
  }, [detail]);

  /** since evolution is an array of array we must have a recursive mapping */
  const Evolution = ({ evolves_to }: { evolves_to: ChainLink[] }) => {
    return (
      <ul>
        {evolves_to.map((e: ChainLink, i) => {
          return (
            <li key={i}>
              {e.species.name}
              {!!e.evolution_details.length && (
                <p>LVL: {e.evolution_details[0].min_level}</p>
              )}
              {!!e.evolves_to.length && <Evolution evolves_to={e.evolves_to} />}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {!error && !detail && <Loading />}

      {error && <p> {error} </p>}

      {detail && (
        <>
          <Link to="/">Back to pokedex</Link>
          <h1>The Detail: {detail.name}</h1>
          <p>Pokemon number: {detail.id}</p>
          {detail.types?.map((type, index) => (
            <p key={index}>
              types:
              {type.type.name}
            </p>
          ))}
        </>
      )}
      {pokemonEvolutionChain ? (
        <>
          <h2>Chain:</h2>
          <p>
            Is {detail.name} a baby?{" "}
            {pokemonEvolutionChain.is_babe ? "Yes" : "No"}
          </p>
          <p>Pokemon {detail.name} evolution</p>
          <Evolution evolves_to={[pokemonEvolutionChain]} />
        </>
      ) : (
        <>
          <h2>This pokemon has no evolution chain</h2>
        </>
      )}
    </>
  );
}
