"use client";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

import { getGenre } from "@/utils";
import { ULR_IMAGE } from "@/constants";
import { Card } from "./card";
import { useGetMovieRecommendations, useGetMovieGenres } from "./movie-queries";

export function Recommendation() {
  const router = useParams();
  const id = router.id;
  const getMovieGenres = useGetMovieGenres({ language: "en" });
  const getMovieRecommendations = useGetMovieRecommendations({ movie_id: id });

  if (!getMovieRecommendations.data?.results.length) {
    return null;
  }

  return (
    <>
      <p className="text-white font-semibold text-sm mb-9">
        RECOMMENDATION MOVIES
      </p>

      <div className="flex flex-wrap gap-10">
        {getMovieRecommendations.data?.results.slice(0, 5).map((item) => (
          <div key={item.id} className="mb-9">
            <Card
              id={item.id}
              urlImage={ULR_IMAGE + item.poster_path}
              title={item.title}
              genre={getGenre(
                item.genre_ids,
                getMovieGenres.data?.genres || [],
              )}
              year={
                item.release_date ? dayjs(item.release_date).format("YYYY") : ""
              }
              ratings={item.vote_average}
            />
          </div>
        ))}
      </div>
    </>
  );
}
