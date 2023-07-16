"use client";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { ULR_IMAGE } from "@/constants";
import { getGenre } from "@/utils";
import { Spinner } from "@/components/layouts";
import {
  useGetInfiniteMovieDiscover,
  useGetMovieGenres,
} from "./movie-queries";
import { Card } from "./card";

export function ContentMovies() {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  const sort = searchParams.get("sort");

  const getMovieGenres = useGetMovieGenres({ language: "en" });
  const getMovieDiscover = useGetInfiniteMovieDiscover(
    {
      language: "",
      page: "1",
      sort_by: sort || "",
      with_genres: genre || "",
    },
    { keepPreviousData: true, staleTime: Infinity },
  );

  function onLoadMore() {
    getMovieDiscover.fetchNextPage();
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
        {getMovieDiscover.data?.pages
          .map((page) => page.results ?? [])
          .flat()
          .map((item) => (
            <div key={item.id}>
              <Card
                id={item.id}
                urlImage={ULR_IMAGE + item.poster_path}
                genre={getGenre(
                  item.genre_ids,
                  getMovieGenres.data?.genres || [],
                )}
                ratings={item.vote_average}
                title={item.title}
                year={
                  item.release_date
                    ? dayjs(item.release_date).format("YYYY")
                    : ""
                }
              />
            </div>
          ))}
      </div>

      {getMovieDiscover.isFetching ? <Spinner /> : null}
      {getMovieDiscover.hasNextPage ? (
        <button
          className="text-primary text-sm font-semibold py-2 bg-[#F00] rounded-full w-[151px] m-auto mt-5"
          onClick={onLoadMore}
        >
          Load More
        </button>
      ) : null}
    </div>
  );
}
