import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function RootSection({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <section
      className={cn("max-w-screen-lg mx-auto p-2", className)}
      {...props}
    >
      {children}
    </section>
  );
}
