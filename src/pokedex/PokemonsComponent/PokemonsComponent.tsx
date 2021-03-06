import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import PokemonsApiResourceList from "../../services/models/interfaces/PokemonsApiResourceList";
import useFetch from "../../services/useFetch";
import ErrorComponent from "../../shared/ErrorComponent";
import Loading from "../../shared/Loading";
import PokemonComponent from "../PokemonComponent/PokemonComponent";
import "./PokemonsComponent.scss";

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

  /** loading const from api */
  const [loading, setLoading] = useState<boolean>(true);

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
  /** Error Managing */
  const [error, setError] = useState<boolean>(false);

  /** If user access the route directly, we fetch the pokemon detail data */
  const url: string = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${fetchAmount}`;
  useFetch({ url, setData: setPokemonApiResource, setLoading, setError });

  useEffect(() => {
    if (Object.keys(pokemonApiResource).length) {
      setTotalPokemonsAvailable(pokemonApiResource.count);
    }

    if (!Object.keys(pokemonApiResource).length && page === 1) {
      localStorage.setItem(
        "pokemonApiResource",
        JSON.stringify(pokemonApiResource)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonApiResource]);

  /** when pagination is used, scroll to top */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {!error && loading && <Loading />}

      {error && <ErrorComponent />}

      {pokemonApiResource && (
        <>
          <section className="pokemon-list">
            <ul>
              {pokemonApiResource?.results?.map((pokemon, index) => {
                return <PokemonComponent key={index} url={pokemon.url} />;
              })}
            </ul>
          </section>
          <div className="pagination">
            <div className="pagination-wrapper">
              <button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                  setOffset(offset - fetchAmount);
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <h4>Page {page}</h4>
              <button
                disabled={totalPokemonsAvailable / fetchAmount === page}
                onClick={() => {
                  scrollToTop();
                  setOffset(fetchAmount + offset);
                  setPage(page + 1);
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
