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
      {pokemonEvolutionChain && (
        <>
          <h2>Chain:</h2>
          <p>
            Is {detail.name} a baby?{" "}
            {pokemonEvolutionChain.is_babe ? "Yes" : "No"}
          </p>
          <p>Pokemon {detail.name} evolution</p>
          {/* {pokemonEvolutionChain.evolves_to.map((evolution, i) => (
            <p key={i}>Chain {evolution}</p>
          ))} */}
        </>
      )}
    </>
  );
}
