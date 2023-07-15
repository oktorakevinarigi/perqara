import { dehydrate, Hydrate } from "@tanstack/react-query";

import { fetchNode, getQueryClient } from "@/utils";
import {
  MovieGenresKeys,
  getMovieGenres,
  getMovieDiscover,
  MovieDiscoverKeys,
} from "@/components/feature";
import { MoviesPage } from "@/components/pages";

type MoviesProps = {
  searchParams: {
    genre: string;
    page: string;
    sort: string;
  };
};

export default async function Movies(props: MoviesProps) {
  const fetch = fetchNode();
  const queryClient = getQueryClient();

  const queryDiscover = {
    language: "",
    page: "1",
    with_genres: props.searchParams.genre || "",
    sort_by: props.searchParams.sort || "",
  };
  const queryGenre = { language: "en" };

  await Promise.all([
    queryClient.fetchInfiniteQuery(
      MovieDiscoverKeys.infiniteList(queryDiscover),
      async () =>
        await getMovieDiscover({
          fetch,
          query: queryDiscover,
        }),
    ),
    queryClient.prefetchQuery(MovieGenresKeys.list(queryGenre), () =>
      getMovieGenres({ query: queryGenre, fetch }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MoviesPage />
    </Hydrate>
  );
}
