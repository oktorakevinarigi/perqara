"use client";
import Image from "next/image";
import { Carousel, IconStar } from "../user-interfaces";

export function Banner() {
  return (
    <div className="my-14">
      <Carousel
        slides={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
        options={{ loop: true }}
        renderSlide={() => (
          <div className="flex items-center">
            <Image
              src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              width={243}
              height={364}
              alt=""
            />
            <div className="bg-black text-white h-[324px] w-[300px] p-6">
              <div className="flex gap-1 items-center">
                <IconStar width="18px" height="18px" />
                <p className="text-lg font-bold">7.3</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[28px]">Space Sweepers</p>
                <div className="flex gap-1 font-normal items-center">
                  <p>2021</p>
                  <div className="h-[6px] w-[6px] rounded-full bg-white bg-opacity-50" />
                  <p>Sci-Fi</p>
                </div>
                <p className="text-xs font-normal">
                  When the crew of a space junk collector ship called The
                  Victory discovers a humanoid robot named Dorothy thats known
                  to be a weapon of mass destruction, they get involved in a
                  risky business deal which puts their lives at stake.
                </p>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
