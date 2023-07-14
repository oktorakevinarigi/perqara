import { IconStar } from "../user-interfaces";

function CardReview() {
  return (
    <div className="bg-[#F9F9F9] rounded-[14px] h-[284px] p-6">
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-sm font-bold">SWITCH.</p>
          <p className="text-xs text-gray-default">December 18, 2020</p>
        </div>
        <div className="bg-[#C4C4C4] bg-opacity-20 p-1 w-24 flex rounded-md gap-[6px]">
          <IconStar className="mt-2" />
          <p className="text-4xl font-semibold">7.0</p>
        </div>
      </div>
      <p className="italic text-sm ">
        It isnt as easy as saying Wonder Woman 1984 is a good or bad movie. The
        pieces are there, and there are moments I adore, but it does come across
        as a bit of a mess, even though the action sequences are breathtaking.
        If youre a fan of the original film, youll be more willing to take the
        ride, but for those more indifferent, it may be a bit of a blander sit.
        If you can and are planning to watch it, the theatrical experience is
        the way to go - there is nothing like seeing these stunning sets, fun
        action scenes and hearing Zimmers jaw-dropping score like on the big
        screen. - Chris dos Santos... read the rest.
      </p>
    </div>
  );
}

export function Review() {
  return (
    <div>
      <p className="text-[#F00] text-sm font-semibold mb-6">REVIEWS</p>

      <div className="flex justify-between gap-[34px]">
        {CardReview()}
        {CardReview()}
      </div>
    </div>
  );
}
