import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/utils";

type SimpleBlockProps = {
  children: ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function SimpleBlock({ children, ...restProps }: SimpleBlockProps) {
  const { className, ...rest } = restProps;
  return (
    <div
      className={cn("w-[1280px] max-w-[1280px] ms-auto me-auto", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
