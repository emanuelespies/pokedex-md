import React, { useState } from "react";
import PokemonDetail from "../services/models/interfaces/PokemonDetail";
import { PokemonImageProps } from "../services/models/types/PokemonImageProps";
import useFetch from "../services/useFetch";
import ErrorComponent from "./ErrorComponent";
import Loading from "./Loading";

export default function PokemonImage({ name }: PokemonImageProps) {
  /** store the detail from props.location */
  const [detail, setDetail] = useState<PokemonDetail>();
  /** loading const from api */
  const [loading, setLoading] = useState<boolean>(true);
  /** Error Managing */
  const [error, setError] = useState<boolean>(false);

  /** If user access the route directly, we fetch the pokemon detail data */
  const url: string = `https://pokeapi.co/api/v2/pokemon/${name}`;
  useFetch({ url, setData: setDetail, setLoading, setError });

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorComponent />}
      {detail?.sprites.front_default !== null && (
        <img src={detail?.sprites.front_default} alt={`Pokemon is ${name}`} />
      )}
    </>
  );
}
