import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";

import { Query } from "./fetch";

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientOptions));

export function cleanQuery(query: Query) {
  return Object.keys(query).reduce(
    (cleanedQuery, queryKey) =>
      query[queryKey]
        ? { ...cleanedQuery, [queryKey]: query[queryKey] }
        : { ...cleanedQuery },
    {} as Query,
  );
}

export function queryToString(query: Query) {
  return (
    "?" +
    Object.keys(query)
      .map((queryKey) =>
        query[queryKey] ? `${queryKey}=${query[queryKey]}` : null,
      )
      .filter(Boolean)
      .join("&")
  );
}
