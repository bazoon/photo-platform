import {useState} from "react";
import {asyncGet, asyncPut} from "../api";

export default function() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  const getApi = (url, params = {}) => asyncGet(url, params).fork(e => setError(e), data => setData(data));
  const putApi = (url, params = {}) => {
    console.log(33,params);
    asyncPut(`${url}/${params.id}`, params).fork(e => setError(e), d => {
      setData(
        data.map(item => item.id === params.id ? ({...item, ...d}) : item)
      );
    });
  };
  return [data, error, {getApi, putApi}];
}
