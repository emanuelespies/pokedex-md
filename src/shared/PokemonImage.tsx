import React, { useEffect, useState } from "react";
import { PokemonImageProps } from "../services/models/types/PokemonImageProps";
import pokeApiService from "../services/pokeApiService";
import Loading from "./Loading";

export default function PokemonImage({ name }: PokemonImageProps) {
  /** store the detail from props.location */
  const [image, setImage] = useState<string>();
  /** loading const from api */
  const [loading, setLoading] = useState<boolean>(true);

  /** prevent change of state on unmount */
  const isMounted = React.useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  /** get pokemon image */
  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await pokeApiService.fetchPokemonDetailByName(
        name,
        setLoading
      );
      if (!apiResult.message && isMounted.current) {
        setImage(apiResult.result.sprites?.front_default);
      }
    };
    fetchData();
  }, [name]);

  return (
    <>
      {loading && <Loading />}
      {image !== null && <img src={image} alt={`Pokemon is ${name}`} />}
    </>
  );
}
