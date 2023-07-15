import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

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

export const MoviePlayingKeys = {
  all: ["MOVIE_PLAYING"],
  lists: () => [...MoviePlayingKeys.all, "LISTS"],
  list: (query: MovieQuery) => [...MoviePlayingKeys.lists(), cleanQuery(query)],
};
export const MoviePopularKeys = {
  all: ["MOVIE_POPULAR"],
  lists: () => [...MoviePopularKeys.all, "LISTS"],
  list: (query: MovieQuery) => [...MoviePopularKeys.lists(), cleanQuery(query)],
};
export const MovieTopRatedKeys = {
  all: ["MOVIE_TOP_RATED"],
  lists: () => [...MovieTopRatedKeys.all, "LISTS"],
  list: (query: MovieQuery) => [
    ...MovieTopRatedKeys.lists(),
    cleanQuery(query),
  ],
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

export const getMoviePlaying = async ({
  fetch,
  query,
}: FetcherArgs<MovieQuery>) => {
  return await fetch.get<MovieListResponse>(
    `${URL_API}/3/movie/now_playing${queryToString(query)}`,
  );
};
export type MoviePlayingCache = Awaited<ReturnType<typeof getMoviePlaying>>;
export function useGetMoviePlaying<TData = MoviePlayingCache>(
  query: MovieQuery,
  options?: UseQueryOptions<MoviePlayingCache, FetchError, TData>,
) {
  return useQuery<MoviePlayingCache, FetchError, TData>(
    MoviePlayingKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMoviePlaying({ fetch, query });
    },
    options,
  );
}

export const getMoviePopular = async ({
  fetch,
  query,
}: FetcherArgs<MovieQuery>) => {
  return await fetch.get<MovieListResponse>(
    `${URL_API}/3/movie/popular${queryToString(query)}`,
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

export const getMovieTopRated = async ({
  fetch,
  query,
}: FetcherArgs<MovieQuery>) => {
  return await fetch.get<MovieListResponse>(
    `${URL_API}/3/movie/top_rated${queryToString(query)}`,
  );
};
export type MovieTopRatedCache = Awaited<ReturnType<typeof getMovieTopRated>>;
export function useGetMovieTopRated<TData = MovieTopRatedCache>(
  query: MovieQuery,
  options?: UseQueryOptions<MovieTopRatedCache, FetchError, TData>,
) {
  return useQuery<MovieTopRatedCache, FetchError, TData>(
    MovieTopRatedKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieTopRated({ fetch, query });
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
