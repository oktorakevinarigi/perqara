import Image from "next/image";
import Link from "next/link";

function Card() {
  return (
    <Link href="/1">
      <div className="w-[220px] relative">
        <Image
          src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
          width={220}
          height={330}
          alt="sd"
          className="mb-3"
        />
        <div className="w-12 h-8  absolute right-0 top-0 z-10 flex justify-center items-center bg-[#1E232B] bg-opacity-80">
          <p className=" text-primary text-lg">7.0</p>
        </div>

        <p className="text-primary font-semibold">Wonder Woman 1984</p>
        <p className="text-[#929292] text-sm">2020</p>
      </div>
    </Link>
  );
}

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