import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { DetailedHTMLProps, HTMLAttributes } from "react";

const rootDivVariants = cva("min-h-[calc(100vh-3.5rem)]", {
  variants: {
    variant: {
      default: "",
      image:
        "bg-[url(/bg.jpg)] bg-no-repeat bg-bottom bg-fixed bg-auto bg-blend-overlay bg-white/80 dark:bg-black/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function RootDiv({
  children,
  className,
  variant,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  VariantProps<typeof rootDivVariants>) {
  return (
    <div className={cn(rootDivVariants({ variant, className }))} {...props}>
      {children}
    </div>
  );
}
