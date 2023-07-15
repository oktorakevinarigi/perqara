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
import { Spinner } from "./spinner";

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
                      <Spinner />
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
