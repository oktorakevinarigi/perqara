"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Highlighter from "react-highlight-words";

import { useDebounce } from "@/utils";
import {
  IconMovie,
  IconSearch,
  IconSearchMovie,
  IconCategory,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/user-interfaces";
import { useGetMovieSearch, useGetMovieGenres } from "../feature/movie-queries";
import { SimpleBlock } from "./simple-block";
import { Spinner } from "./spinner";

export function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isList, setIsList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const deb = useDebounce(search, 500);

  const getMovieGenres = useGetMovieGenres({ language: "en" });
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

  function onMovies(id: number) {
    setIsOpen(false);
    router.push(`/movies?genre=${id}`);
  }

  return (
    <div className="h-[66px] w-full bg-black bg-opacity-5 flex items-center absolute left-0 right-0 top-0 z-50">
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
              <div className="absolute z-50 left-0 top-11">
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
                              href={`/${item.id}`}
                              tabIndex={0}
                              className="text-primary flex justify-between cursor-pointer hover:bg-blue-50 hover:text-black p-2"
                            >
                              <Highlighter
                                highlightClassName="font-semibold bg-transparent text-primary"
                                searchWords={[deb]}
                                textToHighlight={item.title}
                                className="font-light line-clamp-1 text-sm"
                              />
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
          <div className="flex gap-3 items-center border-none">
            <DropdownMenu
              open={isOpen}
              onOpenChange={() => setIsOpen((prev) => !prev)}
            >
              <DropdownMenuTrigger className="outline-none">
                <div className="flex gap-3 items-center text-sm font-semibold">
                  <IconCategory />
                  <p className="text-primary">Categories</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                {getMovieGenres.data?.genres.map((item) => (
                  <DropdownMenuLabel
                    key={item.id}
                    className="text-xs font-semibold text-[#1E232B] cursor-pointer hover:bg-black/50 hover:text-white"
                    onClick={() => {
                      onMovies(item.id);
                    }}
                  >
                    {item.name}
                  </DropdownMenuLabel>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-primary flex gap-10 text-sm font-semibold">
            <Link href="/movies">Movies</Link>
            <Link href="/tv">TV Shows</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
      </SimpleBlock>
    </div>
  );
}
