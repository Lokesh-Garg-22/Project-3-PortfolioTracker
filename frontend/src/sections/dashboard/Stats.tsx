"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH3, TypographyH2 } from "@/components/ui/typography";
import { fetchBackendUrl, fetchHeaders } from "@/lib/config";
import localdata from "@/lib/localdata";
import { useEffect, useState } from "react";

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

  return (
    <section className="p-8 flex justify-around">
      {loading ? (
        <Skeleton className="max-w-60 min-h-40 grow" />
      ) : (
        <div className="max-w-60 grow p-4 border-2 rounded-lg text-center bg-background">
          <TypographyH3 className="border-0 min-h-16">
            Total Stocks
          </TypographyH3>
          <div className="border my-2" />
          <TypographyH2 className="border-0 p-0">
            {stats?.quantity}
          </TypographyH2>
        </div>
      )}
      {loading ? (
        <Skeleton className="max-w-60 min-h-40 grow" />
      ) : (
        <div className="max-w-60 grow p-4 border-2 rounded-lg text-center bg-background">
          <TypographyH3 className="border-0 min-h-16">
            Avarage Value
            <br />
            Per Stock
          </TypographyH3>
          <div className="border my-2" />
          <TypographyH2 className="border-0 p-0">
            ${stats?.avarageValue.toFixed(3)}
          </TypographyH2>
        </div>
      )}
      {loading ? (
        <Skeleton className="max-w-60 min-h-40 grow" />
      ) : (
        <div className="max-w-60 grow p-4 border-2 rounded-lg text-center bg-background">
          <TypographyH3 className="border-0 min-h-16">
            Total Value
            <br />
            of Stocks
          </TypographyH3>
          <div className="border my-2" />
          <TypographyH2 className="border-0 p-0">
            ${stats?.totalValue.toFixed(3)}
          </TypographyH2>
        </div>
      )}
    </section>
  );
}
