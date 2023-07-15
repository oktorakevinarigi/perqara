/* eslint-disable @typescript-eslint/no-explicit-any */
import CoookieBrowser from "js-cookie";
import { saveAs } from "file-saver";

type ISource = "browser" | "server";
type IOptions = (
  | {
      responseType?: "json";
    }
  | {
      responseType: "binary";
      fileName: string;
    }
  | {
      responseType: "blob";
      blobConfig?: any;
    }
) & {
  config?: RequestInit;
  requestType?: "json" | "formData";
  tokenName?: string;
};
type IFetch = { options?: IOptions; headers?: Headers };

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function getDefaultHeaders({ requestType }: Pick<IOptions, "requestType">) {
  if (requestType === "json") {
    return DEFAULT_HEADERS;
  }
}

function OptionsDefault(options?: IOptions) {
  const blobConfig = { type: "application/pdf" };
  return {
    requestType: options?.requestType ?? "json",
    responseType: options?.responseType ?? "json",
    fileName: options?.responseType === "binary" ? options.fileName ?? "" : "",
    tokenName: options?.tokenName ?? "token",
    blobConfig:
      options?.responseType === "blob"
        ? options?.blobConfig ?? blobConfig
        : blobConfig,
  };
}

function getAuthorization({
  tokenName,
  source,
}: {
  tokenName: string;
  source: ISource;
}) {
  if (source === "browser") {
    const result = CoookieBrowser.get();
    if (result[tokenName]) {
      return {
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      };
    }
  } else if (source === "server") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { cookies } = require("next/headers");
    const result = cookies().get(tokenName);
    if (result) {
      return {
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      };
    }
  }
}

function getHeaders({
  headers,
  options,
  source,
}: IFetch & { source: ISource }) {
  if (headers) {
    return {
      ...getDefaultHeaders({ requestType: options?.requestType || "json" }),
      ...getAuthorization({ tokenName: options?.tokenName || "token", source }),
      ...headers,
    };
  }
  return {
    ...getDefaultHeaders({ requestType: options?.requestType || "json" }),
    ...getAuthorization({ tokenName: options?.tokenName || "token", source }),
  };
}

export function getErrorMessage(error: any) {
  let errorMessage = "";
  let errorStatus = null;
  if (error) {
    errorStatus = error.statusCode;
    errorMessage = error.message;
  } else {
    errorMessage = "Error";
  }
  return {
    message: errorMessage,
    status: errorStatus,
  };
}

function ResultResponese(res: Response, result: any, callback: () => void) {
  if (!res.ok) {
    if (res.status === 404) {
      throw { statusCode: 404, message: result.message, ...result };
    } else {
      throw result
        ? { statusCode: res.status, ...result }
        : { statusCode: res.status, message: "Network response was not ok" };
    }
  }
  return callback();
}

export async function handleResponse(res: Response, options?: IOptions) {
  if (options && options.responseType === "json") {
    const result = await res.json();
    return ResultResponese(res, result, () => {
      // if (result.status !== 'success') {
      //   throw { statusCode: result.status, ...result }
      // } else {
      return result;
      // }
    });
  } else if (options && options.responseType === "binary") {
    const result = await res.blob();
    return ResultResponese(res, result, () => {
      saveAs(result, options.fileName);
      return result;
    });
  } else if (options && options.responseType === "blob") {
    const result = await res.blob();
    return ResultResponese(res, result, () => {
      const createBlob = new Blob([result], options.blobConfig);
      return URL.createObjectURL(createBlob);
    });
  }
}

export function fetchBrowser() {
  async function get<TResponse>(url: string, param?: IFetch) {
    return await fetch(url, {
      method: "GET",
      headers: getHeaders({ ...param, source: "browser" }),
      ...(param && param.options && { ...param.options.config }),
    })
      .then((data) => handleResponse(data, OptionsDefault(param?.options)))
      .then((data) => data as TResponse)
      .catch((e) => Promise.reject(getErrorMessage(e)));
  }

  async function post<TResponse>(
    url: string,
    body: any = null,
    param?: IFetch,
  ) {
    return await fetch(url, {
      method: "POST",
      ...(body && {
        body:
          OptionsDefault(param?.options).requestType === "json"
            ? JSON.stringify(body)
            : body,
      }),
      headers: getHeaders({ ...param, source: "browser" }),
      ...(param && param.options && { ...param.options.config }),
    })
      .then((data) => handleResponse(data, OptionsDefault(param?.options)))
      .then((data) => data as TResponse)
      .catch((e) => Promise.reject(getErrorMessage(e)));
  }

  async function put<TResponse>(url: string, body: any = null, param?: IFetch) {
    return await fetch(url, {
      method: "PUT",
      ...(body && {
        body:
          OptionsDefault(param?.options).requestType === "json"
            ? JSON.stringify(body)
            : body,
      }),
      headers: getHeaders({ ...param, source: "browser" }),
      ...(param && param.options && { ...param.options.config }),
    })
      .then((data) => handleResponse(data, OptionsDefault(param?.options)))
      .then((data) => data as TResponse)
      .catch((e) => Promise.reject(getErrorMessage(e)));
  }

  async function _delete<TResponse>(
    url: string,
    body: any = null,
    param?: IFetch,
  ) {
    return await fetch(url, {
      method: "DELETE",
      ...(body && {
        body:
          OptionsDefault(param?.options).requestType === "json"
            ? JSON.stringify(body)
            : body,
      }),
      headers: getHeaders({ ...param, source: "browser" }),
      ...(param && param.options && { ...param.options.config }),
    })
      .then((data) => handleResponse(data, OptionsDefault(param?.options)))
      .then((data) => data as TResponse)
      .catch((e) => Promise.reject(getErrorMessage(e)));
  }

  return {
    get,
    post,
    put,
    delete: _delete,
  };
}

export function fetchNode() {
  async function get<TResponse>(url: string, param?: IFetch) {
    return await fetch(url, {
      method: "GET",
      headers: getHeaders({ ...param, source: "server" }),
      ...(param && param.options && { ...param.options.config }),
    })
      .then((data) => handleResponse(data, OptionsDefault(param?.options)))
      .then((data) => data as TResponse)
      .catch((e) => Promise.reject(getErrorMessage(e)));
  }

  async function post<TResponse>(
    url: string,
    body: any = null,
    param?: IFetch,
  ) {
    return await fetch(url, {
      method: "POST",
      ...(body && {
        body:
          OptionsDefault(param?.options).requestType === "json"
            ? JSON.stringify(body)
            : body,
      }),
      headers: getHeaders({ ...param, source: "server" }),
      ...(param && param.options && { ...param.options.config }),
    })
      .then((data) => handleResponse(data, OptionsDefault(param?.options)))
      .then((data) => data as TResponse)
      .catch((e) => Promise.reject(getErrorMessage(e)));
  }

  async function put<TResponse>(url: string, body: any = null, param?: IFetch) {
    return await fetch(url, {
      method: "PUT",
      ...(body && {
        body:
          OptionsDefault(param?.options).requestType === "json"
            ? JSON.stringify(body)
            : body,
      }),
      headers: getHeaders({ ...param, source: "server" }),
      ...(param && param.options && { ...param.options.config }),
    })
      .then((data) => handleResponse(data, OptionsDefault(param?.options)))
      .then((data) => data as TResponse)
      .catch((e) => Promise.reject(getErrorMessage(e)));
  }

  async function _delete<TResponse>(
    url: string,
    body: any = null,
    param?: IFetch,
  ) {
    return await fetch(url, {
      method: "DELETE",
      ...(body && {
        body:
          OptionsDefault(param?.options).requestType === "json"
            ? JSON.stringify(body)
            : body,
      }),
      headers: getHeaders({ ...param, source: "server" }),
      ...(param && param.options && { ...param.options.config }),
    })
      .then((data) => handleResponse(data, OptionsDefault(param?.options)))
      .then((data) => data as TResponse)
      .catch((e) => Promise.reject(getErrorMessage(e)));
  }

  return {
    get,
    post,
    put,
    delete: _delete,
  };
}

export type Fetch = ReturnType<typeof fetchBrowser>;
export type FetchError = ReturnType<typeof getErrorMessage>;

export type Query = Record<
  string,
  string | string[] | number | boolean | null | undefined
>;
export interface FetcherArgs<LocalQuery extends Query = Query> {
  fetch: Fetch;
  query: LocalQuery;
}

export interface OptionalFetcherArgs<LocalQuery extends Query = Query> {
  fetch: Fetch;
  query?: LocalQuery;
}
