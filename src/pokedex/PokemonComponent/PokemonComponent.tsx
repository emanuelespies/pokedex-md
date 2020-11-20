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
  /** loading const from api */
  const [loading, setLoading] = useState<boolean>(true);

  const isMounted = React.useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  /** fetchs the pokemon detail */
  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await pokeApiService.fetchPokemonDetail(
        url,
        setLoading
      );
      if (!apiResult.message && isMounted.current) {
        setPokemonDetail(apiResult.result);
      }
    };
    fetchData();
  }, [url]);

  const haveImage = pokemonDetail?.sprites?.front_default !== null;

  return (
    <>
      {loading && (
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
