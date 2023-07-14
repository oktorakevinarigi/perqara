import { Card } from "./card";

export function Recommendation() {
  return (
    <>
      <p className="text-white font-semibold text-sm mb-9">
        RECOMMENDATION MOVIES
      </p>

      <div className="flex justify-between flex-wrap">
        {Array.from(Array(5).keys()).map((item) => (
          <div key={item} className="mb-9">
            <Card />
          </div>
        ))}
      </div>
    </>
  );
}
