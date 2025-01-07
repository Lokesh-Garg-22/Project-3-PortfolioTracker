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
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import { PlusIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export default function PortfolioTable() {
  const stocks = [
    {
      stockId: 937,
      symbol: "NIFTY",
      stock: "Nifity50",
      quantity: 5,
      value: 50,
    },
    {
      stockId: 937,
      symbol: "MSFT",
      stock: "Microsoft",
      quantity: 2,
      value: 421.58,
    },
    {
      stockId: 937,
      symbol: "META",
      stock: "Meta Platforms (Facebook)",
      quantity: 1,
      value: 607.27,
    },
  ];
  let total = 0;
  stocks.forEach((ele) => {
    total += ele.quantity * ele.value;
  });

  return (
    <section className="p-8">
      <div className="my-4 border-2 flex flex-col rounded bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Symbol</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Value Per Stock</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((ele, id) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{ele.symbol}</TableCell>
                <TableCell className="capitalize">{ele.stock}</TableCell>
                <TableCell>{ele.quantity}</TableCell>
                <TableCell>${ele.value}</TableCell>
                <TableCell className="text-right">
                  ${ele.value * ele.quantity}
                </TableCell>
                <TableCell className="text-right gap-2 flex justify-end">
                  <Button asChild size="sm" className="px-2" variant="outline">
                    <Link href={`/updateStock?stockId=${ele.stockId}`}>
                      <SettingsIcon />
                    </Link>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="px-2" variant="destructive">
                        <Trash2Icon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will remove the{" "}
                          <b>{ele.stock}</b> stock from your portfolio.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            alert("//TODO");
                          }}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                <Button asChild size="sm" className="px-2" variant="outline">
                  <Link href="/addStock">
                    <PlusIcon /> Add Stock
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">${total.toFixed(3)}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}
