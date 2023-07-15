import { ContentMovies } from "./content-movies";
import { Filter } from "./filter";

export function Movies() {
  return (
    <div>
      <div className="bg-[#E74C3C] h-[6px] w-28 mb-3" />
      <p className="text-primary font-semibold text-2xl mb-14">Movies</p>

      <div className="flex gap-7">
        <Filter />
        <ContentMovies />
      </div>
    </div>
  );
}
