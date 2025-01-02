import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function RootDiv({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={cn("min-h-[calc(100vh-3.5rem)]", className)} {...props}>
      {children}
    </div>
  );
}
