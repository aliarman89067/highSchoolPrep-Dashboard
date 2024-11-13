import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthWrapper({
  children,
  classNames,
}: {
  children: ReactNode;
  classNames?: string;
}) {
  return (
    <div className={cn("max-w-4xl w-full mx-auto", classNames)}>{children}</div>
  );
}
