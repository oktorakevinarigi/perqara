"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

import { ULR_IMAGE } from "@/constants";
import { IconStar } from "../user-interfaces";
import { SimpleBlock } from "../layouts";
import { useGetMovieDetail } from "./movie-queries";

function Divider() {
  return <div className="border-r border-white border-opacity-20 h-10" />;
}

export function BannerDetail() {
  const router = useParams();
  const id = router.id;
  const getMovieDetail = useGetMovieDetail({
    movie_id: id,
    language: "en-US",
    append_to_response: "",
  });

  return (
    <div>
      <div className="h-[468px] bg-red-400 relative mb-8">
        <Image
          src={ULR_IMAGE + getMovieDetail.data?.backdrop_path}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          alt={getMovieDetail.data?.title || ""}
          priority
        />

        <SimpleBlock>
          <div className="absolute -bottom-28 z-10 flex">
            <Image
              src={ULR_IMAGE + getMovieDetail.data?.poster_path}
              width={220}
              height={330}
              alt={getMovieDetail.data?.title || ""}
              priority
            />
            <div className="text-white ml-[30px] mt-5">
              <p className="text-lg">2020</p>
              <p className="text-4xl">{getMovieDetail.data?.title}</p>
              <p className="text-sm">
                {getMovieDetail.data?.genres
                  .map((item) => item.name)
                  .join(", ")}
              </p>
            </div>
          </div>
        </SimpleBlock>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 h-20 flex items-center gap-8 pl-[290px]">
          <div className="flex items-center">
            <div className="flex gap-4 items-center mr-3">
              <IconStar height="32px" width="32px" />
              <p className="text-4xl text-white">
                {getMovieDetail.data?.vote_average}
              </p>
            </div>
            <div className="uppercase text-xs min-w-[80px]">
              <p className="text-black text-opacity-50">User Score</p>
              <p className="text-white">
                {getMovieDetail.data?.vote_count} Votes
              </p>
            </div>
          </div>
          <Divider />
          <div className="uppercase text-xs">
            <p className="text-black text-opacity-50">Status</p>
            <p className="text-white">{getMovieDetail.data?.status}</p>
          </div>
          <Divider />
          <div className="uppercase text-xs">
            <p className="text-black text-opacity-50">language</p>
            <p className="text-white">
              {getMovieDetail.data?.original_language}
            </p>
          </div>
          <Divider />
          <div className="uppercase text-xs">
            <p className="text-black text-opacity-50">budget</p>
            <p className="text-white">${getMovieDetail.data?.budget}</p>
          </div>
          <Divider />
          <div className="uppercase text-xs">
            <p className="text-black text-opacity-50">production</p>
            <p className="text-white">
              {getMovieDetail.data?.production_companies
                .map((item) => item.name)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm ml-[290px] max-w-[526px]">
        <p className="text-[#F00] font-semibold">OVERVIEW</p>
        <p className="leading-7">{getMovieDetail.data?.overview}</p>
      </div>
    </div>
  );
}
