import { Dispatch, SetStateAction, useEffect } from "react";

export default function useFetch({
  url,
  setData,
  setLoading,
  setError,
}: {
  url: string;
  setData: Dispatch<SetStateAction<any>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (url) init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
}
