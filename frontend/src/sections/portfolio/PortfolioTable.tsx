"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { fetchBackendUrl, fetchHeaders } from "@/lib/config";
import type { PortfolioStock } from "@/lib/interfaces";
import localdata from "@/lib/localdata";
import { PlusIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PortfolioTable() {
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

  function onClickDelete(stock: PortfolioStock) {
    fetch(fetchBackendUrl + "/portfolio/stock/delete", {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify({ user: localdata.getUser(), id: stock.id }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          toast({
            title: res.message,
            className: "text-destructive",
          });
          return;
        }
        toast({
          title: "Stock deleted successfully",
        });
        setStocks((stocks) => stocks.filter((ele) => stock.id != ele.id));
      });
  }

  return (
    <section className="p-4 sm:p-8">
      <div className="my-4 border-2 flex flex-col rounded bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Symbol</TableHead>
              {!mobile && <TableHead>Stock</TableHead>}
              <TableHead>Quantity</TableHead>
              {!mobile && <TableHead>Value Per Stock</TableHead>}
              {!mobile && <TableHead className="text-right">Amount</TableHead>}
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <PortfolioTableSkeleton />
            ) : (
              stocks.map((ele, id) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{ele.symbol}</TableCell>
                  {!mobile && (
                    <TableCell className="capitalize">{ele.name}</TableCell>
                  )}
                  <TableCell>{ele.quantity}</TableCell>
                  {!mobile && <TableCell>${ele.price}</TableCell>}
                  {!mobile && (
                    <TableCell className="text-right">
                      ${ele.price * ele.quantity}
                    </TableCell>
                  )}
                  <TableCell className="text-right gap-2 flex justify-end">
                    <Button
                      asChild
                      size="sm"
                      className="px-2"
                      variant="outline"
                    >
                      <Link href={`/updateStock?id=${ele.id}`}>
                        <SettingsIcon />
                      </Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="px-2"
                          variant="destructive"
                        >
                          <Trash2Icon />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will remove the{" "}
                            <b>{ele.name}</b> stock from your portfolio.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              onClickDelete(ele);
                            }}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                <Button asChild size="sm" className="px-2" variant="outline">
                  <Link href="/addStock?fallback=/portfolio">
                    <PlusIcon /> Add Stock
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              {mobile ? (
                <TableCell colSpan={2}>Total Amount</TableCell>
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
              {!mobile && <TableCell className="text-right"></TableCell>}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}

function PortfolioTableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, id) => (
        <TableRow key={id}>
          <TableCell colSpan={10}>
            <Skeleton className="w-full h-6 sm:h-12" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
