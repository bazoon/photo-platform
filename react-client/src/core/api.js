import Async from "crocks/Async";
import {keys} from "lodash/fp";
import {isPromise} from "crocks";

function makeUrl(url, params) {
  return keys(params).length > 0 ? `/${url}?${new URLSearchParams(params).toString()}` : `/${url}`;
}

export const responseIsJson = (response) => {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.includes("application/json");
};

function processResponse(r, resolve, reject) {
  if (r.status === 401) {
    window.location = "/login";
  }

  if (!r.ok && responseIsJson(r)) {
    r.json().then(x => {
      if (!x.success && (x.message || x.errorMessage)) {
        reject({errorMessage: x.message || x.errorMessage, errors: x.errors});
      } else {
        reject(x);
      }
    });
  } else if (r.ok && r.status === 204) {
    resolve({});
  } else if (!r.ok) {
    reject(r);
  } else if (r.status === 500) {
    reject(r);
  } else {
    r.json().then(resolve).catch(reject);
  }
}

export const asyncGet = (url, params) => Async((reject, resolve) => {
  fetch(makeUrl(url, params)).then(r => processResponse(r, resolve, reject)).catch(reject);
});


export const asyncPost = (url, params, json = true) => Async((reject, resolve) => {
  const headers = {};
  if (json) {
    headers["Content-Type"] = "application/json";
  }

  if (isPromise(params)) {
    params.then(payload => {
      fetch(makeUrl(url), {
        method: "POST",
        headers,
        body: payload instanceof FormData ? payload: JSON.stringify(payload),
      }, json).then(r => processResponse(r, resolve, reject)).catch(reject);
    });
  } else {
    fetch(makeUrl(url), {
      method: "POST",
      headers,
      body: params instanceof FormData ? params: JSON.stringify(params),
    }, json).then(r => processResponse(r, resolve, reject)).catch(reject);
  }

});

export const asyncPut = (url, params, json = true) => Async((reject, resolve) => {
  const headers = {};
  if (json) {
    headers["Content-Type"] = "application/json";
  }

  if (isPromise(params)) {
    params.then(payload => {
      fetch(makeUrl(url), {
        method: "PUT",
        headers,
        body: payload instanceof FormData ? payload: JSON.stringify(payload),
      }, json).then(r => processResponse(r, resolve, reject)).catch(reject);
    });
  } else {
    fetch(makeUrl(url), {
      method: "PUT",
      headers,
      body: params instanceof FormData ? params: JSON.stringify(params),
    }, json).then(r => processResponse(r, resolve, reject)).catch(reject);
  }
});

export const asyncDel = (url, params) => Async((reject, resolve) => {
  fetch(makeUrl(url), {method: "DELETE", body: params}).then(r => processResponse(r, resolve, reject)).catch(reject);
});

