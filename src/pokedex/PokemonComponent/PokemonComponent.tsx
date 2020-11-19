import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonDetail from "../../services/models/interfaces/PokemonDetail";
import { PokemonComponentProps } from "../../services/models/types/PokemonComponentProps";
import pokeApiService from "../../services/pokeApiService";
import Loading from "../../shared/Loading";
import "./PokemonComponent.scss";

export default function PokemonComponent({ url }: PokemonComponentProps) {
  /** Store the pokemon detail once received the value from api */
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();

  /** fetchs the pokemon detail */
  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await pokeApiService.fetchPokemonDetail(url);
      if (!apiResult.message) {
        setPokemonDetail(apiResult.result);
      }
    };
    fetchData();
  }, [url]);

  return (
    <>
      {!pokemonDetail && (
        <li key={"loading"}>
          <Loading />
        </li>
      )}

      {pokemonDetail && (
        <li
          key={pokemonDetail.id}
          className={`type-${pokemonDetail.types[0].type.name}`}
        >
          <Link
            className="pokemonPreview"
            to={{
              pathname: `/${pokemonDetail.name}`,
              state: { pokemonDetail },
            }}
          >
            <figure>
              <figcaption>
                <h3>{pokemonDetail.name}</h3>
                <h4>#{pokemonDetail.id}</h4>
              </figcaption>

              {pokemonDetail?.sprites?.front_default !== null && (
                <img
                  src={pokemonDetail?.sprites.front_default}
                  alt={`Pokemon is ${pokemonDetail.name}`}
                />
              )}
            </figure>
          </Link>
        </li>
      )}
    </>
  );
}