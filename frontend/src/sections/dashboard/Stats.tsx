"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH3, TypographyH2 } from "@/components/ui/typography";
import { fetchBackendUrl, fetchHeaders } from "@/lib/config";
import localdata from "@/lib/localdata";
import { cn } from "@/lib/utils";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";

export default function Stats() {
  const [stats, setStats] = useState<{
    quantity: number;
    avarageValue: number;
    totalValue: number;
  }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window != "undefined") {
      fetch(fetchBackendUrl + "/portfolio/stats", {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(localdata.getUser()),
      })
        .then((res) => res.json())
        .then((res) => {
          setStats(res);
          setLoading(false);
        });
    }
  }, []);

  function StatComponent({
    className,
    label,
    value,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    label: string | ReactNode;
    value: string | number | ReactNode;
  }) {
    return loading ? (
      <Skeleton className="max-w-60 w-full min-h-20 sm:min-h-40 grow m-2" />
    ) : (
      <div
        className={cn(
          "max-w-60 w-full grow m-2 p-2 sm:p-4 border-2 rounded-lg text-center bg-background",
          className
        )}
        {...props}
      >
        <TypographyH3 className="border-0 sm:min-h-16 max-sm:text-xl">
          {label}
        </TypographyH3>
        <div className="border my-2" />
        <TypographyH2 className="border-0 p-0 max-sm:text-2xl">
          {value}
        </TypographyH2>
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-8 flex flex-col sm:flex-row justify-around items-center">
      <StatComponent label={"Total Stocks"} value={stats?.quantity} />
      <StatComponent
        label={
          <>
            Avarage Value
            <br />
            Per Stock
          </>
        }
        value={<>${stats?.avarageValue.toFixed(3)}</>}
      />
      <StatComponent
        label={
          <>
            Total Value
            <br />
            of Stocks
          </>
        }
        value={<>${stats?.totalValue.toFixed(3)}</>}
      />
    </section>
  );
}
