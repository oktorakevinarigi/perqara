import Image from "next/image";
import Link from "next/link";

import { IconStar } from "../user-interfaces";

type CardProps = {
  id: number;
  urlImage: string;
  title: string;
  year: string;
  ratings: number;
  genre: string;
};

export function Card(props: CardProps) {
  const { id, urlImage, title, year, ratings, genre } = props;

  return (
    <div className="w-[220px] relative group">
      <div className="hidden group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:right-0 group-hover:h-[330px] group-hover:bg-black group-hover:bg-opacity-80 group-hover:z-20 group-hover:flex group-hover:flex-col group-hover:items-center group-hover:justify-center group-hover:gap-12">
        <div className="flex gap-1 items-center">
          <IconStar width="18px" height="18px" />
          <p className="text-white text-lg font-bold">{ratings}</p>
        </div>
        <p className="text-white text-center px-2">{genre}</p>
        <Link
          href={`/${id}`}
          className="bg-[#FF0000] px-8 py-2 rounded-full cursor-pointer text-primary font-bold text-sm"
        >
          View
        </Link>
      </div>
      <Image
        src={urlImage || "/images/no-images.jpg"}
        width={220}
        height={330}
        alt={title}
        style={{ objectFit: "cover" }}
        className="mb-3"
      />
      <div className="w-12 h-8  absolute right-0 top-0 z-10 flex justify-center items-center bg-[#1E232B] bg-opacity-80">
        <p className=" text-primary text-lg">{ratings}</p>
      </div>

      <p className="text-primary font-semibold line-clamp-2">{title}</p>
      <p className="text-[#929292] text-sm">{year}</p>
    </div>
  );
}
