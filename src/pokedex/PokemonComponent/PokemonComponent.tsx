import React, { useState } from "react";
import { Link } from "react-router-dom";
import PokemonDetail from "../../services/models/interfaces/PokemonDetail";
import { PokemonComponentProps } from "../../services/models/types/PokemonComponentProps";
import useFetch from "../../services/useFetch";
import Loading from "../../shared/Loading";
import "./PokemonComponent.scss";

export default function PokemonComponent({ url }: PokemonComponentProps) {
  /** Store the pokemon detail once received the value from api */
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();
  /** Loading const from api */
  const [loading, setLoading] = useState<boolean>(true);
  /** Error Managing */
  const [error, setError] = useState<boolean>(false);

  useFetch({ url, setData: setPokemonDetail, setLoading, setError });

  const haveImage = pokemonDetail?.sprites?.front_default !== null;

  return (
    <>
      {!error && loading && (
        <li key={"loading"}>
          <Loading />
        </li>
      )}

      {pokemonDetail && (
        <li
          key={pokemonDetail.id}
          className={`type-${pokemonDetail?.types[0]?.type?.name}`}
        >
          <Link
            className="pokemon-preview"
            to={{
              pathname: `/${pokemonDetail.name}`,
              state: { pokemonDetail },
            }}
          >
            <h3 className="page-title">{pokemonDetail.name}</h3>
            <figure>
              <figcaption>
                <h4 className="page-subtitle">#{pokemonDetail.id}</h4>
              </figcaption>

              {haveImage && (
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
