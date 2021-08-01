import {useState} from "react";
import {asyncGet, asyncPut, asyncPost} from "../api";
import identity from "crocks/combinators/identity";
import {isFunction} from "lodash/fp";

const useAsync = (config = {}) => {
  const {get = asyncGet, put = asyncPut, post = asyncPost, mapFn = identity, tapFn} = config;
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(undefined);
  const [error, setError] = useState(undefined);

  const getApi = (url, params = {}) => {
    setIsLoading(true);
    get(url, params).fork(e => { setError(e); setIsLoading(false);}, data => { setData(data); setIsLoading(false); });
  };
  const putApi = (url, params = {}) => {
    setIsLoading(true);
    put(`${url}/${params.id}`, params).fork(e => { setError(e); setIsLoading(false); }, d => {
      const data = mapFn(d); 
      setData(data);
      if (isFunction(tapFn)) {
        tapFn(data);
      }
      setIsLoading(false);
    });
  };

  const postApi = (url, params = {}) => {
    post(url, params).fork(e => setError(e), d => {
      const data = mapFn(d); 
      setData(data);
      if (isFunction(tapFn)) {
        tapFn(data);
      }
    });
  };

  return [
    data,
    isLoading,
    {
      get: getApi,
      put: putApi,
      post: postApi
    },
    error,
  ];
};

export default useAsync;
