import { Button } from "@/components/ui/button";
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
import Link from "next/link";

export default function Portfolio() {
  const stocks = [
    { symbol: "NIFTY", stock: "Nifity50", quantity: 5, value: 50 },
    { symbol: "MSFT", stock: "Microsoft", quantity: 2, value: 421.58 },
    {
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
    <section className="m-8">
      <TypographyH2>Portfolio</TypographyH2>
      <div className="my-4 border-2 flex flex-col rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Symbol</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Value Per Stock</TableHead>
              <TableHead className="text-right">Amount</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">${total.toFixed(3)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/addstock">Add Stock</Link>
        </Button>
        <Button asChild>
          <Link href="/portfolio">Update Portfolio</Link>
        </Button>
      </div>
    </section>
  );
}
