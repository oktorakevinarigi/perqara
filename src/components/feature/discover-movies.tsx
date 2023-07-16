"use client";
import { useState } from "react";
import dayjs from "dayjs";

import { ULR_IMAGE } from "@/constants";
import { getGenre, cn } from "@/utils";
import { Spinner } from "@/components/layouts";
import { Card } from "./card";
import {
  useGetMoviePopular,
  useGetMovieGenres,
  useGetMovieUpcoming,
} from "./movie-queries";

type IGetCard = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
};

function getCard(item: IGetCard, genres: { id: number; name: string }[]) {
  return (
    <div key={item.id}>
      <Card
        id={item.id}
        urlImage={item.poster_path ? ULR_IMAGE + item.poster_path : ""}
        title={item.title}
        year={item.release_date ? dayjs(item.release_date).format("YYYY") : ""}
        ratings={item.vote_average}
        genre={getGenre(item.genre_ids, genres || [])}
      />
    </div>
  );
}

export function DiscoverMovies() {
  const [state, setState] = useState<"popular" | "upcoming">("popular");
  const query = { language: "en-US", page: "1", region: "" };
  const getMovieGenres = useGetMovieGenres({ language: "en" });
  const getMoviePopular = useGetMoviePopular(query);
  const getMovieUpcoming = useGetMovieUpcoming(query, {
    enabled: state === "upcoming",
  });

  function onChange(data: "popular" | "upcoming") {
    setState(data);
  }

  return (
    <>
      <div className="bg-[#E74C3C] h-[6px] w-28 mb-3" />
      <div className="flex justify-between mb-11">
        <p className="text-primary font-semibold text-sm sm:text-2xl">
          Discover Movies
        </p>
        <div className="flex text-primary gap-1 sm:gap-5 text-xs sm:text-sm">
          <div
            className={cn(
              "px-4 py-[6px] rounded-full cursor-pointer m-auto",
              state === "popular" ? "bg-[#FF0000]" : "bg-black/20",
            )}
            onClick={() => onChange("popular")}
          >
            Popularity
          </div>
          <div
            className={cn(
              "text-primary px-4 py-[6px] rounded-full cursor-pointer text-center",
              state === "upcoming" ? "bg-[#FF0000]" : "bg-black/20",
            )}
            onClick={() => onChange("upcoming")}
          >
            Release Date
          </div>
        </div>
      </div>

      <div className="flex gap-[25px] flex-wrap justify-center sm:justify-start">
        {getMoviePopular.isLoading ||
        (getMovieUpcoming.isLoading && state === "upcoming") ? (
          <div className="flex justify-center w-full mb-9">
            <Spinner />
          </div>
        ) : state === "popular" ? (
          getMoviePopular.data?.results
            .slice(0, 10)
            .map((item) => getCard(item, getMovieGenres.data?.genres || []))
        ) : (
          getMovieUpcoming.data?.results
            .slice(0, 10)
            .map((item) => getCard(item, getMovieGenres.data?.genres || []))
        )}
      </div>
    </>
  );
}
