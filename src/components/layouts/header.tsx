import Link from "next/link";
import {
  IconMovie,
  IconSearch,
  IconSearchMovie,
  IconCategory,
} from "@/components/user-interfaces";
import { SimpleBlock } from "./simple-block";

export function Header() {
  return (
    <div className="h-[66px] w-full bg-black bg-opacity-5 flex items-center absolute left-0 right-0 top-0 z-10">
      <SimpleBlock className="w-ful">
        <div className="flex w-full justify-between items-center">
          <IconMovie />
          <div className="relative">
            <IconSearchMovie className="absolute top-1/2 left-3 -translate-y-[50%]" />
            <input
              type="text"
              className="rounded w-[571px] h-9 bg-body bg-opacity-10 px-10 text-white outline-none"
              placeholder="Find movie"
            />
            <IconSearch className="absolute right-3 top-1/2 -translate-y-[50%]" />
          </div>
          <div className="flex gap-3 text-primary items-center">
            <IconCategory />
            <p className="text-sm">Categories</p>
          </div>
          <div className="text-primary flex gap-10 text-sm">
            <Link href="/movies">Movies</Link>
            <Link href="/tv">TV Shows</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
      </SimpleBlock>
    </div>
  );
}
