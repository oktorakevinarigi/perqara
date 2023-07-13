import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientOptions));
