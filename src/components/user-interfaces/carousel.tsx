"use client";
import { useEffect, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/utils/cn";

type CarouselProps<Item> = {
  slides: Array<Item>;
  options?: EmblaOptionsType;
  renderSlide: (arg: { slide: Item; index: number }) => React.ReactNode;
  showDotButton?: boolean;
};

const TWEEN_FACTOR = 6.2;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export function Carousel<Item extends { id: number | string }>(
  props: CarouselProps<Item>,
) {
  const { slides, options, renderSlide, showDotButton = true } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000 }),
  ]);
  const [tweenValues, setTweenValues] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
      return numberWithinRange(tweenValue, 0, 1);
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll();
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("scroll", () => {
      flushSync(() => onScroll());
    });
    emblaApi.on("reInit", onScroll);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onScroll, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {slides.map((slide, index) => (
            <div
              className={cn(
                "flex flex-grow-0 flex-shrink-0 basis-[42%] min-w-0 w-0 pl-4 relative",
                tweenValues.length && tweenValues[index] === 0 && "opacity-50",
              )}
              key={slide.id}
            >
              {renderSlide({ slide, index })}
            </div>
          ))}
        </div>
      </div>

      {showDotButton && (
        <div className="flex relative justify-center mt-[36px]">
          <div className="flex gap-2">
            {scrollSnaps.map((id, idx) => (
              <div
                key={id}
                className={`${
                  idx === selectedIndex
                    ? "w-[60px] h-3 bg-[#E74C3C]"
                    : "bg-[#FFFFFF] bg-opacity-50 w-3 h-3"
                } rounded-full cursor-pointer`}
                onClick={() => scrollTo(idx)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
