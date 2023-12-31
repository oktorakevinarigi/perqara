import {
  useQuery,
  useInfiniteQuery,
  type UseQueryOptions,
  type InfiniteData,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import {
  FetcherArgs,
  cleanQuery,
  FetchError,
  fetchBrowser,
  queryToString,
} from "@/utils";
import { URL_API } from "@/constants";
import {
  MovieListResponse,
  MovieDetailResponse,
  MovieSearchResponse,
  MovieGenresResponse,
  MovieRecommendationsResponse,
  MovieReviewsResponse,
} from "./movie-model";

type MovieQuery = {
  language: string;
  page: string;
  region: string;
};
type MovieDetailQuery = {
  movie_id: string;
  append_to_response: string;
  language: string;
};
type MovieSearchQuery = {
  query: string;
  include_adult: boolean;
  language: string;
  primary_release_year: string;
  page: string;
  region: string;
  year: string;
};
type MovieGenresQuery = { language: string };
type MovieRecomendationsQuery = { movie_id: string };
type MovieReviewsQuery = { movie_id: string };
type MovieDiscoverQuery = {
  language: string;
  page: string;
  with_genres: string;
  sort_by: string;
};

export const MoviePopularKeys = {
  all: ["MOVIE_POPULAR"],
  lists: () => [...MoviePopularKeys.all, "LISTS"],
  list: (query: MovieQuery) => [...MoviePopularKeys.lists(), cleanQuery(query)],
};
export const MovieUpcomingKeys = {
  all: ["MOVIE_UPCOMING"],
  lists: () => [...MovieUpcomingKeys.all, "LISTS"],
  list: (query: MovieQuery) => [
    ...MovieUpcomingKeys.lists(),
    cleanQuery(query),
  ],
};
export const MovieKeys = {
  all: ["MOVIE"],
  lists: () => [...MovieKeys.all, "LISTS"],
  list: (query: MovieQuery) => [...MovieKeys.lists(), cleanQuery(query)],
  details: () => [...MovieKeys.all, "DETAIL"],
  detail: (query: MovieDetailQuery) => [
    ...MovieKeys.details(),
    cleanQuery(query),
  ],
  searchs: () => [...MovieKeys.all, "DETAIL"],
  search: (query: MovieSearchQuery) => [
    ...MovieKeys.searchs(),
    cleanQuery(query),
  ],
};

export const MovieGenresKeys = {
  all: ["MOVIE_GENRES"],
  lists: () => [...MovieGenresKeys.all, "LISTS"],
  list: (query: MovieGenresQuery) => [
    ...MovieGenresKeys.lists(),
    cleanQuery(query),
  ],
};

export const MovieRecommendationsKeys = {
  all: ["MOVIE_RECOMMENDATIONS"],
  lists: () => [...MovieRecommendationsKeys.all, "LISTS"],
  list: (query: MovieRecomendationsQuery) => [
    ...MovieRecommendationsKeys.lists(),
    cleanQuery(query),
  ],
};

export const MovieReviewsKeys = {
  all: ["MOVIE_REVIEWS"],
  lists: () => [...MovieReviewsKeys.all, "LISTS"],
  list: (query: MovieReviewsQuery) => [
    ...MovieReviewsKeys.lists(),
    cleanQuery(query),
  ],
};

export const MovieDiscoverKeys = {
  all: ["MOVIE_DISCOVER"],
  infiniteLists: () => [...MovieDiscoverKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: MovieDiscoverQuery) => [
    ...MovieDiscoverKeys.infiniteLists(),
    cleanQuery(query),
  ],
};

export const getMoviePopular = async ({
  fetch,
  query,
}: FetcherArgs<MovieQuery>) => {
  return await fetch.get<MovieListResponse>(
    `${URL_API}/3/movie/popular${queryToString(query)}`,
    { options: { config: { next: { revalidate: 60 } } } },
  );
};
export type MoviePopularCache = Awaited<ReturnType<typeof getMoviePopular>>;
export function useGetMoviePopular<TData = MoviePopularCache>(
  query: MovieQuery,
  options?: UseQueryOptions<MoviePopularCache, FetchError, TData>,
) {
  return useQuery<MoviePopularCache, FetchError, TData>(
    MoviePopularKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMoviePopular({ fetch, query });
    },
    options,
  );
}

export const getMovieUpcoming = async ({
  fetch,
  query,
}: FetcherArgs<MovieQuery>) => {
  return await fetch.get<MovieListResponse>(
    `${URL_API}/3/movie/upcoming${queryToString(query)}`,
  );
};
export type MovieUpcomingCache = Awaited<ReturnType<typeof getMovieUpcoming>>;
export function useGetMovieUpcoming<TData = MovieUpcomingCache>(
  query: MovieQuery,
  options?: UseQueryOptions<MovieUpcomingCache, FetchError, TData>,
) {
  return useQuery<MovieUpcomingCache, FetchError, TData>(
    MovieUpcomingKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieUpcoming({ fetch, query });
    },
    options,
  );
}

export const getMovieDetail = async ({
  fetch,
  query,
}: FetcherArgs<MovieDetailQuery>) => {
  const { movie_id, ...rest } = query;
  return await fetch.get<MovieDetailResponse>(
    `${URL_API}/3/movie/${movie_id}${queryToString(rest)}`,
    { options: { config: { next: { revalidate: 60 } } } },
  );
};
export type MovieDetailCache = Awaited<ReturnType<typeof getMovieDetail>>;
export function useGetMovieDetail<TData = MovieDetailCache>(
  query: MovieDetailQuery,
  options?: UseQueryOptions<MovieDetailCache, FetchError, TData>,
) {
  return useQuery<MovieDetailCache, FetchError, TData>(
    MovieKeys.detail(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieDetail({ fetch, query });
    },
    options,
  );
}

export const getMovieSearch = async ({
  fetch,
  query,
}: FetcherArgs<MovieSearchQuery>) => {
  return await fetch.get<MovieSearchResponse>(
    `${URL_API}/3/search/movie${queryToString(query)}`,
  );
};
export type MovieSearchCache = Awaited<ReturnType<typeof getMovieSearch>>;
export function useGetMovieSearch<TData = MovieSearchCache>(
  query: MovieSearchQuery,
  options?: UseQueryOptions<MovieSearchCache, FetchError, TData>,
) {
  return useQuery<MovieSearchCache, FetchError, TData>(
    MovieKeys.search(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieSearch({ fetch, query });
    },
    options,
  );
}

export const getMovieGenres = async ({
  fetch,
  query,
}: FetcherArgs<MovieGenresQuery>) => {
  return await fetch.get<MovieGenresResponse>(
    `${URL_API}/3/genre/movie/list${queryToString(query)}`,
    { options: { config: { next: { revalidate: 60 } } } },
  );
};
export type MovieGenresCache = Awaited<ReturnType<typeof getMovieGenres>>;
export function useGetMovieGenres<TData = MovieGenresCache>(
  query: MovieGenresQuery,
  options?: UseQueryOptions<MovieGenresCache, FetchError, TData>,
) {
  return useQuery<MovieGenresCache, FetchError, TData>(
    MovieGenresKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieGenres({ fetch, query });
    },
    options,
  );
}

export const getMovieRecommedations = async ({
  fetch,
  query,
}: FetcherArgs<MovieRecomendationsQuery>) => {
  return await fetch.get<MovieRecommendationsResponse>(
    `${URL_API}/3/movie/${query.movie_id}/recommendations`,
    { options: { config: { next: { revalidate: 60 } } } },
  );
};
export type MovieRecommedationsCache = Awaited<
  ReturnType<typeof getMovieRecommedations>
>;
export function useGetMovieRecommendations<TData = MovieRecommedationsCache>(
  query: MovieRecomendationsQuery,
  options?: UseQueryOptions<MovieRecommedationsCache, FetchError, TData>,
) {
  return useQuery<MovieRecommedationsCache, FetchError, TData>(
    MovieRecommendationsKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieRecommedations({ fetch, query });
    },
    options,
  );
}

export const getMovieReviews = async ({
  fetch,
  query,
}: FetcherArgs<MovieReviewsQuery>) => {
  return await fetch.get<MovieReviewsResponse>(
    `${URL_API}/3/movie/${query.movie_id}/reviews`,
    { options: { config: { next: { revalidate: 60 } } } },
  );
};
export type MovieReviewsCache = Awaited<ReturnType<typeof getMovieReviews>>;
export function useGetMovieReviews<TData = MovieReviewsCache>(
  query: MovieReviewsQuery,
  options?: UseQueryOptions<MovieReviewsCache, FetchError, TData>,
) {
  return useQuery<MovieReviewsCache, FetchError, TData>(
    MovieReviewsKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieReviews({ fetch, query });
    },
    options,
  );
}

export const getMovieDiscover = async ({
  fetch,
  query,
}: FetcherArgs<MovieDiscoverQuery>) => {
  return await fetch.get<MovieSearchResponse>(
    `${URL_API}/3/discover/movie${queryToString(query)}`,
    { options: { config: { next: { revalidate: 60 } } } },
  );
};
export type MovieDiscoverCache = Awaited<ReturnType<typeof getMovieDiscover>>;

export type InfiniteMovieDiscoverCache = InfiniteData<MovieDiscoverCache>;
export function useGetInfiniteMovieDiscover<TData = InfiniteMovieDiscoverCache>(
  query: MovieDiscoverQuery,
  options?: UseInfiniteQueryOptions<MovieDiscoverCache, FetchError, TData>,
) {
  const result = useInfiniteQuery<MovieDiscoverCache, FetchError, TData>(
    MovieDiscoverKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = fetchBrowser();
      return getMovieDiscover({
        fetch,
        query: { ...query, page: pageParam || "1" },
      });
    },
    {
      select: options?.select as unknown as (
        data: InfiniteMovieDiscoverCache,
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => {
        if (lastPage.results.length < 20) {
          return undefined;
        }
        return lastPage.page + 1;
      },
      ...options,
    },
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}
