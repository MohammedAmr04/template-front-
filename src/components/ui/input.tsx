import * as React from "react";
import { CloudUpload, Image, Search } from "lucide-react";

import { Label } from "./label";
import { cn } from "@/utils/cn";

const baseClasses =
  "text-text-primary focus-visible:border-brand bg-bg-light placeholder:text-text-disabled flex w-full rounded-lg border-none p-4 text-base transition-colors placeholder:text-sm focus-visible:outline-none disabled:cursor-not-allowed md:text-sm disabled:opacity-50";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    uploadDesign?: "dashed" | "empty";
    icon?: () => React.ReactNode;
  }
>(({ className, type, uploadDesign = "dashed", icon, ...props }, ref) => {
  // Input type search
  if (type === "search") {
    return (
      <div className="relative rounded-full">
        <input
          type={type}
          className={cn(baseClasses, "relative rounded-full border ps-12 text-muted-foreground", className)}
          ref={ref}
          {...props}
        />
        <Search
          className={cn(
            "absolute start-5 top-1/2 z-50 size-[18px] -translate-y-1/2 text-muted-foreground",
            props.disabled && "dark:text-zinc-600",
          )}
        />
      </div>
    );
  }

  // Input type file
  if (type === "file") {
    const isDashed = uploadDesign === "dashed";

    return (
      <div
        className={cn(
          "relative",
          isDashed && "rounded-lg border-2 border-dashed bg-bg-light",
        )}
      >
        <Label
          htmlFor={props.id}
          className={cn(
            "absolute top-1/2 flex h-full w-full -translate-y-1/2 cursor-pointer items-center justify-between gap-[6px] text-sm text-text-muted",
            isDashed && "h-full rounded-lg bg-bg-light p-4",
          )}
        >
          <span className="flex items-center gap-2">
            {/* eslint-disable jsx-a11y/alt-text  */}
            {isDashed && <Image className="size-5" />}
            {props.placeholder}
          </span>
          {icon ? icon() : <CloudUpload className="size-5" />}
        </Label>

        <input
          type="file"
          className={cn(
            baseClasses,
            "truncate text-zinc-800 file:hidden",
            !isDashed && "hidden",
            "pe-[30%]",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }

  return (
    <input type={type} className={cn(baseClasses, className)} ref={ref} {...props} />
  );
});
Input.displayName = "Input";

export { Input };
