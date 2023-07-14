import { Card } from "./card";

export function DiscoverMovies() {
  return (
    <>
      <div className="bg-[#E74C3C] h-[6px] w-28 mb-3" />
      <div className="flex justify-between mb-11">
        <p className="text-primary font-semibold text-2xl">Movies</p>
      </div>

      <div className="flex justify-between flex-wrap">
        {Array.from(Array(6).keys()).map((item) => (
          <div key={item} className="mb-9">
            <Card />
          </div>
        ))}
      </div>
    </>
  );
}
