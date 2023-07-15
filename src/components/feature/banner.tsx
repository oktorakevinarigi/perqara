"use client";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

import { ULR_IMAGE } from "@/constants";
import { getGenre } from "@/utils";
import { Carousel, IconStar } from "../user-interfaces";
import { useGetMoviePopular, useGetMovieGenres } from "./movie-queries";

export function Banner() {
  const query = { language: "en-US", page: "1", region: "" };
  const getMoviePopular = useGetMoviePopular(query);
  const getMovieGenres = useGetMovieGenres({ language: "en" });

  return (
    <div className="my-14">
      <Carousel
        slides={getMoviePopular.data?.results.slice(0, 6) || []}
        options={{ loop: true }}
        renderSlide={({ slide }) => (
          <Link href={`/${slide.id}`} className="flex items-center">
            <Image
              src={ULR_IMAGE + slide.poster_path}
              width={243}
              height={364}
              alt=""
            />
            <div className="bg-black text-white h-[324px] w-[300px] p-6">
              <div className="flex gap-1 items-center">
                <IconStar width="18px" height="18px" />
                <p className="text-lg font-bold">{slide.vote_average}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[28px] leading-[28px]">{slide.title}</p>
                <div className="flex gap-1 font-normal items-center">
                  <p>
                    {slide.release_date
                      ? dayjs(slide.release_date).format("YYYY")
                      : null}
                  </p>
                  <div className="h-[6px] w-[6px] rounded-full bg-white bg-opacity-50" />
                  <p>
                    {getGenre(
                      slide.genre_ids,
                      getMovieGenres.data?.genres || [],
                    )}
                  </p>
                </div>
                <p className="text-xs font-normal line-clamp-5">
                  {slide.overview}
                </p>
              </div>
            </div>
          </Link>
        )}
      />
    </div>
  );
}
