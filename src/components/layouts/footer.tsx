import { IconMovieGray } from "@/components/user-interfaces";
import { SimpleBlock } from "./simple-block";

export function Footer() {
  return (
    <div className="h-40 bg-black/30 flex justify-between items-center">
      <SimpleBlock className="w-ful">
        <div className="flex justify-between items-center text-[#929292] text-[13px]">
          <p>© 2021 MoovieTime. All rights reserved.</p>
          <IconMovieGray />
          <p>Made with NextJS</p>
        </div>
      </SimpleBlock>
    </div>
  );
}
