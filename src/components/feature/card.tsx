import Image from "next/image";
import Link from "next/link";

import { IconStar } from "../user-interfaces";

export function Card() {
  return (
    <div className="w-[220px] relative group">
      <div className="hidden group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:right-0 group-hover:bottom-14 group-hover:bg-black group-hover:z-20 group-hover:flex group-hover:flex-col group-hover:items-center group-hover:justify-center group-hover:gap-12">
        <div className="flex gap-1 items-center">
          <IconStar width="18px" height="18px" />
          <p className="text-white text-lg font-bold">7.3</p>
        </div>
        <p className="text-white">Action</p>
        <Link
          href="/1"
          className="bg-[#FF0000] px-8 py-2 rounded-full cursor-pointer text-primary font-bold text-sm"
        >
          View
        </Link>
      </div>
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
  );
}
