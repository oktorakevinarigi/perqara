import {
  IconMovie,
  IconSearch,
  IconSearchMovie,
  IconCategory,
} from "@/components/user-interfaces";
import { SimpleBlock } from "./simple-block";

export function Header() {
  return (
    <div className="h-[66px] w-full bg-gray-default flex items-center">
      <SimpleBlock className="w-ful">
        <div className="flex w-full justify-between items-center">
          <IconMovie />
          <div className="relative">
            <IconSearchMovie className="absolute top-1/2 left-3 -translate-y-[50%]" />
            <input
              type="text"
              className="rounded w-[571px] h-9 bg-body px-10 text-white"
              placeholder="Find movie"
            />
            <IconSearch className="absolute right-3 top-1/2 -translate-y-[50%]" />
          </div>
          <div className="flex gap-3 text-primary items-center">
            <IconCategory />
            <p>Categories</p>
          </div>
          <div className="text-primary flex gap-10">
            <p>Movies</p>
            <p>TV Shows</p>
            <p>Login</p>
          </div>
        </div>
      </SimpleBlock>
    </div>
  );
}
