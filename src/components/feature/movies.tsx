import { ContentMovies } from "./content-movies";
import { Filter } from "./filter";

export function Movies() {
  return (
    <>
      <div className="bg-[#E74C3C] h-[6px] w-28 mb-3" />
      <p className="text-primary font-semibold text-2xl mb-14">Movies</p>

      <div className="flex gap-5 items-center flex-col sm:flex-row sm:items-start">
        <Filter />
        <ContentMovies />
      </div>
    </>
  );
}
