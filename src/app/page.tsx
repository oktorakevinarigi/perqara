import { dehydrate, Hydrate } from "@tanstack/react-query";
import { HomePage } from "@/components/pages";
import { getQueryClient } from "@/utils/query-client";
import {
  getMoviePopular,
  MoviePopularKeys,
  getMovieGenres,
  MovieGenresKeys,
} from "@/components/feature";
import { fetchNode } from "@/utils";

export default async function Home() {
  const fetch = fetchNode();
  const queryClient = getQueryClient();

  const queryGenre = { language: "en" };
  const queryPopular = { language: "en-US", page: "1", region: "" };

  await Promise.all([
    queryClient.prefetchQuery(MoviePopularKeys.list(queryPopular), () =>
      getMoviePopular({ query: queryPopular, fetch }),
    ),
    queryClient.prefetchQuery(MovieGenresKeys.list(queryGenre), () =>
      getMovieGenres({ query: queryGenre, fetch }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomePage />
    </Hydrate>
  );
}
