import { faDotCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PokemonDetail from "../../services/models/interfaces/PokemonDetail";
import { PokemonDetailComponentProps } from "../../services/models/types/PokemonDetailComponentProps";
import Loading from "../../shared/Loading";
import ErrorComponent from "../../shared/ErrorComponent";
import PokemonEvolution from "../PokemonEvolution/PokemonEvolution";
import "./PokemonDetailComponent.scss";
import useFetch from "../../services/useFetch";
import EvolutionChain from "../../services/models/interfaces/EvolutionChain";
import PokemonSpecies from "../../services/models/interfaces/PokemonSpecies";

export default function PokemonDetailComponent({
  location,
}: PokemonDetailComponentProps) {
  /** The url is the identifier of our router and pokemon */
  const { name }: { name: string } = useParams();
  /** Store the detail from props.location */
  const [detail, setDetail] = useState<PokemonDetail>(
    location.state?.pokemonDetail
  );
  /** Error Managing */
  const [error, setError] = useState<boolean>(false);
  /** Store the pokemon evolution */
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState<
    EvolutionChain
  >();
  /** Loading const from api */
  const [loading, setLoading] = useState<boolean>(true);

  /** If user access the route directly, we fetch the pokemon detail data */
  const url: string = `https://pokeapi.co/api/v2/pokemon/${name}`;
  useFetch({ url, setData: setDetail, setLoading, setError });

  /* Fetch evolution chain from species */
  useEffect(() => {
    if (detail) {
      const fetchData = async () => {
        try {
          const resDetail = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${detail.id}`
          );
          if (resDetail.ok) {
            const pokemonSpecies: PokemonSpecies = await resDetail.json();
            const response = await fetch(pokemonSpecies.evolution_chain.url);
            if (response.ok) {
              const json: EvolutionChain = await response.json();
              setPokemonEvolutionChain(json);
            } else {
              throw response;
            }
          } else {
            throw resDetail;
          }
        } catch (e) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [detail]);

  return (
    <>
      {error && <ErrorComponent />}

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
                    {pokemonEvolutionChain.chain.evolves_to?.length ? (
                      <PokemonEvolution
                        evolves_to={[pokemonEvolutionChain.chain]}
                      />
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
