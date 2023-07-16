"use client";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

import { IconStar } from "../user-interfaces";
import { useGetMovieReviews } from "./movie-queries";

type ICardReview = {
  name: string;
  date: string;
  ratings: number | null;
  content: string;
};

function CardReview(item: ICardReview) {
  return (
    <div className="bg-[#F9F9F9] rounded-[14px] p-6 w-full sm:w-[582px]">
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-sm font-bold">{item.name}</p>
          <p className="text-xs text-gray-default">{item.date}</p>
        </div>
        {item.ratings ? (
          <div className="bg-[#C4C4C4] bg-opacity-20 p-1 flex rounded-md gap-[6px]">
            <IconStar className="mt-2" />
            <p className="text-4xl font-semibold">{item.ratings}</p>
          </div>
        ) : null}
      </div>
      <p className="italic text-sm ">{item.content}</p>
    </div>
  );
}

export function Review() {
  const router = useParams();
  const id = router.id;
  const getMovieReviews = useGetMovieReviews({ movie_id: id });

  if (!getMovieReviews.data?.results.length) {
    return null;
  }

  return (
    <>
      <p className="text-[#F00] text-sm font-semibold mb-6">REVIEWS</p>

      <div className="flex flex-col justify-between gap-[34px] sm:flex-row">
        {getMovieReviews.data?.results
          .slice(0, 2)
          .map((item) => (
            <CardReview
              key={item.id}
              name={item.author_details.name}
              date={
                item.updated_at
                  ? dayjs(item.updated_at).format("MMMM DD, YYYY")
                  : ""
              }
              content={item.content}
              ratings={item.author_details.rating}
            />
          ))}
      </div>
    </>
  );
}
