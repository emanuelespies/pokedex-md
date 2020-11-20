import { faDotCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChainLink from "../../services/models/interfaces/ChainLink";
import PokemonDetail from "../../services/models/interfaces/PokemonDetail";
import { PokemonDetailComponentProps } from "../../services/models/types/PokemonDetailComponentProps";
import pokeApiService from "../../services/pokeApiService";
import Loading from "../../shared/Loading";
import ErrorComponent from "../../shared/ErrorComponent";
import PokemonEvolution from "../PokemonEvolution/PokemonEvolution";
import "./PokemonDetailComponent.scss";

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
  }, [name]);

  /** Once loaded, we get the pokemon evolution details */
  useEffect(() => {
    if (detail) {
      const fetchEvolution = async () => {
        const apiResult = await pokeApiService.fetchPokemonEvolution(
          detail.id,
          setLoading
        );
        if (!apiResult.message && isMounted.current) {
          setPokemonEvolutionChain(apiResult.result.chain);
          setError("");
        } else {
          setError(apiResult.message);
        }
      };
      fetchEvolution();
    }
  }, [detail]);

  return (
    <>
      {error && <ErrorComponent error={error} />}

      {detail && (
        <>
          <section className="pokemon-detail">
            <header className={`type-${detail.types[0].type.name}`}>
              {!error && loading && <Loading />}
              <div className="breadcrumb">
                <Link to="/">
                  <em>PokedexMD</em>
                  <FontAwesomeIcon icon={faDotCircle} />
                </Link>
                <h1 className="title-bold">{detail.name}</h1>
              </div>
              <div className="details">
                <div className="details-wrapper">
                  <h2 className="page-subtitle">#{detail.id}</h2>
                  <div className="types">
                    <h4>{detail.types?.length > 1 ? "Types:" : "Type:"}</h4>
                    <ul className="type-list">
                      {detail.types?.map((type, index) => (
                        <li key={index}>{type.type.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {detail?.sprites?.front_default !== null && (
                  <div className="img-wrapper">
                    <img
                      src={detail?.sprites.front_default}
                      alt={`Pokemon is ${detail.name}`}
                    />
                  </div>
                )}
              </div>
            </header>

            {pokemonEvolutionChain && (
              <>
                <section
                  className={`pokemon-evolution type-${detail.types[0].type.name}`}
                >
                  <h3 className="page-title">Pokemon evolution</h3>

                  <div className="evolution-chain">
                    {pokemonEvolutionChain.evolves_to.length ? (
                      <PokemonEvolution evolves_to={[pokemonEvolutionChain]} />
                    ) : (
                      <>
                        {detail?.sprites?.front_default !== null && (
                          <div className="img-wrapper">
                            <img
                              src={detail?.sprites.front_default}
                              alt={`Pokemon is ${detail.name}`}
                            />
                          </div>
                        )}
                        <h5 className="page-subtitle">
                          {detail.name} has no evolution chain
                        </h5>
                      </>
                    )}
                  </div>
                </section>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}
