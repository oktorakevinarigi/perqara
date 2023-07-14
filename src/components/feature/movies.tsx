import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../user-interfaces";
import { ContentMovies } from "./content-movies";

export function Movies() {
  return (
    <div>
      <div className="bg-[#E74C3C] h-[6px] w-28 mb-3" />
      <p className="text-primary font-semibold text-2xl mb-14">Movies</p>

      <div className="flex gap-7">
        <div className="w-60 rounded-lg h-fit bg-gradient-to-b from-[#0E1723] to-transparent">
          <p className="text-primary font-semibold p-5 border-b border-white border-opacity-5">
            Sort Result By
          </p>
          <div className="px-5 pt-5 pb-[31px] border-b border-white border-opacity-5">
            <Select>
              <SelectTrigger className="bg-white bg-opacity-[0.13] h-9 text-primary border-none text-sm">
                <SelectValue placeholder="Popularity" />
              </SelectTrigger>
              <SelectContent className="text-white bg-[#111419] border-none rounded-t-none text-sm">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-primary font-semibold p-5 border-b border-white border-opacity-5 mb-[18px]">
            Genres
          </p>
          <div className="px-5 flex flex-col gap-4 pb-5">
            {Array.from(Array(5).keys()).map((item) => (
              <div key={item} className="flex justify-between">
                <p className="text-white">Action</p>
                <input
                  type="checkbox"
                  className="text-red-500 accent-[#E74C3C]"
                />
              </div>
            ))}
          </div>
        </div>
        <ContentMovies />
      </div>
    </div>
  );
}
