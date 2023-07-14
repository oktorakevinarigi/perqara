import { Card } from "./card";

export function DiscoverMovies() {
  return (
    <div>
      <div className="bg-[#E74C3C] h-[6px] w-28 mb-3" />
      <div className="flex justify-between mb-11">
        <p className="text-primary font-semibold text-2xl">Discover Movies</p>
        <div className="flex text-primary gap-5 text-sm">
          <div className="bg-[#FF0000] px-4 py-[6px] rounded-full cursor-pointer">
            Popularity
          </div>
          <div className="text-primary px-4 py-[6px] bg-black/20 rounded-full cursor-pointer">
            Release Date
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap">
        {Array.from(Array(6).keys()).map((item) => (
          <div key={item} className="mb-9">
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
}
