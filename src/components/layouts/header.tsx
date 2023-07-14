"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { useDebounce } from "@/utils";
import {
  IconMovie,
  IconSearch,
  IconSearchMovie,
  IconCategory,
} from "@/components/user-interfaces";
import { useGetMovieSearch } from "../feature/movie-queries";
import { SimpleBlock } from "./simple-block";

function Loading() {
  return (
    <div className="flex justify-center">
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
}

export function Header() {
  const [search, setSearch] = useState("");
  const [isList, setIsList] = useState(false);
  const deb = useDebounce(search, 500);
  const getMovieSearch = useGetMovieSearch(
    {
      query: deb,
      include_adult: false,
      language: "en-US",
      primary_release_year: "",
      page: "1",
      region: "",
      year: "",
    },
    { enabled: !!deb },
  );

  const boxListRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handlerClickToogle(event: Event) {
      const container = document.getElementById("container") as HTMLElement;
      if (!container.contains(event.target as HTMLElement)) {
        setIsList(false);
        setSearch("");
      }
    }
    document.addEventListener("click", handlerClickToogle);
    return () => {
      document.removeEventListener("click", handlerClickToogle);
    };
  }, []);

  function onChangeSearch(value: string) {
    setSearch(value);
  }

  return (
    <div className="h-[66px] w-full bg-black bg-opacity-5 flex items-center absolute left-0 right-0 top-0 z-10">
      <SimpleBlock className="w-ful">
        <div className="flex w-full justify-between items-center">
          <Link href="/">
            <IconMovie />
          </Link>
          <div className="relative">
            <IconSearchMovie className="absolute top-1/2 left-3 -translate-y-[50%]" />
            <input
              id="container"
              ref={boxListRef}
              type="text"
              className="rounded w-[571px] h-9 bg-body bg-opacity-10 px-10 text-white outline-none"
              placeholder="Find movie"
              onChange={(e) => onChangeSearch(e.target.value)}
              onClick={() => setIsList(true)}
              value={search}
            />
            <IconSearch className="absolute right-3 top-1/2 -translate-y-[50%]" />

            {/* List Search */}
            {isList && (
              <div className="absolute z-10 left-0 top-11">
                <div className="inset-0 flex items-end justify-center text-center sm:items-center">
                  <div className="bg-black bg-opacity-90 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 space-y-2 transform rounded-lg text-left shadow-xl transition-all md:w-[630px] w-[223px] max-h-[300px] overflow-y-auto">
                    {getMovieSearch.isFetching ? (
                      <Loading />
                    ) : getMovieSearch.data?.results.length ? (
                      getMovieSearch.data?.results.map((item) => {
                        if (item.poster_path) {
                          return (
                            <Link
                              key={item.id}
                              href={`/movie/${item.id}`}
                              tabIndex={0}
                              className="flex justify-between cursor-pointer text-primary hover:bg-blue-50 hover:text-black p-2"
                            >
                              <p className=" line-clamp-1 text-sm">
                                {item.title}
                              </p>
                            </Link>
                          );
                        }
                      })
                    ) : (
                      <div className="h-20 flex justify-center items-center text-slate-600 dark:text-slate-400">
                        No results found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
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
