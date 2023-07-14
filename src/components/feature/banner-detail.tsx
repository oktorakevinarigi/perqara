import Image from "next/image";

import { IconStar } from "../user-interfaces";
import { SimpleBlock } from "../layouts";

function Divider() {
  return <div className="border-r border-white border-opacity-20 h-10" />;
}

export function BannerDetail() {
  return (
    <div>
      <div className="h-[468px] bg-red-400 relative mb-8">
        <Image
          src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
          fill
          style={{ objectFit: "cover" }}
          alt=""
        />

        <SimpleBlock>
          <div className="absolute -bottom-28 z-10 flex">
            <Image
              src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              width={220}
              height={330}
              alt=""
            />
            <div className="text-white ml-[30px] mt-5">
              <p className="text-lg">2020</p>
              <p className="text-4xl">Wonder Woman 1984</p>
              <p className="text-sm">Fantasy, Action, Adventure</p>
            </div>
          </div>
        </SimpleBlock>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 h-20 flex items-center gap-8 pl-[290px]">
          <div className="flex">
            <div className="flex gap-4 items-center mr-3">
              <IconStar height="32px" width="32px" />
              <p className="text-4xl text-white">7.0</p>
            </div>
            <div className="uppercase text-xs">
              <p className="text-black text-opacity-50">User Score</p>
              <p className="text-white">3621 Votes</p>
            </div>
          </div>
          <Divider />
          <div className="uppercase text-xs">
            <p className="text-black text-opacity-50">Status</p>
            <p className="text-white">Released</p>
          </div>
          <Divider />
          <div className="uppercase text-xs">
            <p className="text-black text-opacity-50">language</p>
            <p className="text-white">english</p>
          </div>
          <Divider />
          <div className="uppercase text-xs">
            <p className="text-black text-opacity-50">budget</p>
            <p className="text-white">$200,000,000.00</p>
          </div>
          <Divider />
          <div className="uppercase text-xs">
            <p className="text-black text-opacity-50">production</p>
            <p className="text-white">DC Entertainment</p>
          </div>
        </div>
      </div>

      <SimpleBlock className="text-sm ml-[290px] max-w-[526px]">
        <p className="text-[#F00] font-semibold">OVERVIEW</p>
        <p className="leading-7">
          Wonder Woman comes into conflict with the Soviet Union during the Cold
          War in the 1980s and finds a formidable foe by the name of the
          Cheetah.
        </p>
      </SimpleBlock>
    </div>
  );
}
