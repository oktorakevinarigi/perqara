import { IconMovieGray } from "@/components/user-interfaces";
import { SimpleBlock } from "./simple-block";

export function Footer() {
  return (
    <div className="h-40 bg-black/30 flex justify-between items-center">
      <SimpleBlock className="flex justify-between items-center text-[#929292] text-[13px] flex-col gap-4 sm:flex-row">
        <p className="text-center">© 2021 MoovieTime. All rights reserved.</p>
        <IconMovieGray />
        <p>Made with NextJS</p>
      </SimpleBlock>
    </div>
  );
}
