"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH2 } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { fetchBackendUrl, fetchHeaders } from "@/lib/config";
import { PortfolioStock } from "@/lib/interfaces";
import localdata from "@/lib/localdata";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const { toast } = useToast();
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState<boolean>();

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMobile(!mql.matches);

    mql.addEventListener("change", onChange);
    setMobile(!mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let total = 0;
    stocks.forEach((ele) => {
      total += ele.quantity * ele.price;
    });
    setTotal(total);
  }, [stocks]);

  useEffect(() => {
    if (typeof window != "undefined") {
      fetch(fetchBackendUrl + "/portfolio", {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(localdata.getUser()),
      })
        .then((res) => res.json())
        .then((res: Array<any> | any) => {
          if (res.error) {
            toast({
              title: res.message,
              className: "text-destructive",
            });
            return;
          }
          const data: PortfolioStock[] = res.map((ele: any) => {
            return {
              symbol: ele.stock.symbol,
              name: ele.stock.name,
              quantity: ele.quantity,
              price: ele.stock.price,
              id: ele.id,
              stockId: ele.stock.id,
              userId: ele.user.id,
            };
          });
          setStocks(data);
          setLoading(false);
        });
    }
  }, []);

  return (
    <section className="m-2 sm:m-8">
      <TypographyH2>Portfolio</TypographyH2>
      <div className="my-4 border-2 flex flex-col rounded bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Symbol</TableHead>
              {!mobile && <TableHead>Stock</TableHead>}
              <TableHead>Quantity</TableHead>
              {!mobile && <TableHead>Value Per Stock</TableHead>}
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <PortfolioSkeleton />
            ) : (
              stocks.map((ele, id) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{ele.symbol}</TableCell>
                  {!mobile && <TableCell>{ele.name}</TableCell>}
                  <TableCell>{ele.quantity}</TableCell>
                  {!mobile && <TableCell>${ele.price}</TableCell>}
                  <TableCell className="text-right">
                    ${ele.price * ele.quantity}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {mobile ? (
                <TableCell colSpan={2}>Total</TableCell>
              ) : (
                <TableCell colSpan={4}>Total</TableCell>
              )}
              {loading ? (
                <TableCell className="text-right">
                  <Skeleton className="w-full h-6" />
                </TableCell>
              ) : (
                <TableCell className="text-right">
                  ${total.toFixed(3)}
                </TableCell>
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex sm:flex-row flex-col gap-x-4 gap-y-2">
        <Button asChild>
          <Link href="/addStock">
            <PlusIcon /> Add Stock
          </Link>
        </Button>
        <Button asChild>
          <Link href="/portfolio">Update Portfolio</Link>
        </Button>
      </div>
    </section>
  );
}

function PortfolioSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, id) => (
        <TableRow key={id}>
          <TableCell colSpan={10} className="p-2">
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
