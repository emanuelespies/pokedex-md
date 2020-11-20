import ChainLink from "../../services/models/interfaces/ChainLink";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pokeApiService from "../../services/pokeApiService";
import PokemonDetail from "../../services/models/interfaces/PokemonDetail";
import Loading from "../../shared/Loading";
import "./PokemonEvolution.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import PokemonImage from "../../shared/PokemonImage";
import ErrorComponent from "../../shared/ErrorComponent";

export default function PokemonEvolution({
  evolves_to,
}: {
  evolves_to: ChainLink[];
}) {
  const name: string = evolves_to[0].species.name;
  /** store the detail from props.location */
  const [detail, setDetail] = useState<PokemonDetail>();
  /** Error Managing */
  const [error, setError] = useState<string>("");
  /** loading const from api */
  const [loading, setLoading] = useState<boolean>(true);

  /** prevent change of state on unmount */
  const isMounted = React.useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  /** if user access the route directly, we fetch the pokemon detail data */
  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await pokeApiService.fetchPokemonDetailByName(
        name,
        setLoading
      );
      if (!apiResult.message && isMounted.current) {
        setDetail(apiResult.result);
        setError("");
      } else {
        setError(apiResult.message);
      }
    };
    fetchData();
  }, [name, evolves_to]);

  const RecursiveEvolution = ({ evolves_to }: { evolves_to: ChainLink[] }) => {
    return (
      <>
        {evolves_to.map((e: ChainLink, i) => {
          return (
            <section key={i} className="evolution-chain">
              {!!e.evolution_details.length && (
                <>
                  <div className="level-up">
                    <h6 className="page-subtitle">
                      LVL: {e.evolution_details[0].min_level}
                    </h6>
                    <FontAwesomeIcon
                      className="color evolution-icon"
                      icon={faAngleDoubleDown}
                    />
                    <FontAwesomeIcon
                      className="color evolution-icon"
                      icon={faAngleDoubleRight}
                    />
                  </div>
                  <Link
                    to={{
                      pathname: `/${e.species.name}`,
                    }}
                  >
                    <div className="img-container">
                      <PokemonImage name={e.species.name} />
                    </div>
                    <h6 className="page-subtitle">
                      <strong>{e.species.name}</strong>
                    </h6>
                  </Link>
                </>
              )}
              {!!e.evolves_to.length && (
                <RecursiveEvolution evolves_to={e.evolves_to} />
              )}
            </section>
          );
        })}
      </>
    );
  };

  /** since evolution is an array of array we must have a recursive mapping */
  return (
    <>
      {!error && loading && <Loading />}
      {error && <ErrorComponent error={error} />}
      {detail && (
        <>
          <section className="evolution-first">
            <Link
              to={{
                pathname: `/${detail.name}`,
              }}
            >
              <img
                src={detail?.sprites.front_default}
                alt={`Pokemon is ${detail.name}`}
              />
              <h6 className="page-subtitle">
                <strong>{detail.name}</strong>
              </h6>
            </Link>
          </section>
          <RecursiveEvolution evolves_to={evolves_to} />
        </>
      )}
    </>
  );
}
