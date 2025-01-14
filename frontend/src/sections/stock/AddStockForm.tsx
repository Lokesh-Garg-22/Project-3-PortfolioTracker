"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TypographyP } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { fetchBackendUrl, fetchHeaders } from "@/lib/config";
import { stock } from "@/lib/interfaces";
import localdata from "@/lib/localdata";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  stock: z.string(),
  quantity: z.string().nonempty("Enter a Value!"),
});

export default function AddStockForm({
  className,
  fallbackUrl = "/dashboard",
  fallbackDelay = 2000,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  fallbackUrl?: string;
  fallbackDelay?: number;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock: "",
      quantity: "",
    },
  });
  const [stocks, setStocks] = useState<stock[]>([]);

  useEffect(() => {
    fetch(fetchBackendUrl + "/stocks", {
      method: "GET",
      headers: fetchHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        setStocks(res);
      });
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.stock == "") {
      form.setError("stock", {
        message: "Select Stock",
      });
      return;
    }

    const user = localdata.getUser();
    let quantity;
    try {
      quantity = parseInt(values.quantity as string);
    } catch (e) {
      form.setError("quantity", { message: "Enter a Number!" });
      return;
    }

    fetch(fetchBackendUrl + "/portfolio/stock/add", {
      method: "post",
      headers: fetchHeaders,
      body: JSON.stringify({
        user,
        stock: stocks.find((ele) => ele.symbol == values.stock),
        quantity,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast({
            title: res.message,
            className: "text-destructive",
          });
          return;
        }
        toast({
          title: "Stock added successfully",
        });
        setTimeout(() => {
          router.push(fallbackUrl);
        }, fallbackDelay);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => {
            const [open, setOpen] = useState(false);
            const [value, setValue] = useState(form.getValues("stock"));

            return (
              <>
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {value
                            ? stocks.find((stock) => stock.symbol == value)
                                ?.symbol
                            : "Select stock..."}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search stock..." />
                          <CommandList>
                            <CommandEmpty>No stock found.</CommandEmpty>
                            <CommandGroup>
                              {stocks.map((stock) => (
                                <CommandItem
                                  key={stock.symbol}
                                  value={stock.symbol}
                                  onSelect={(currentValue) => {
                                    const valueToSet =
                                      currentValue == value ? "" : currentValue;
                                    setValue(valueToSet);
                                    form.setValue("stock", valueToSet);
                                    form.clearErrors("stock");
                                    setOpen(false);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value == stock.symbol
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {stock.symbol}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {value && (
                  <StockDetails
                    stock={stocks.find((stock) => stock.symbol == value)}
                  />
                )}
              </>
            );
          }}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Quantity"
                  type="number"
                  min={1}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit">Add</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            Go Back
          </Button>
        </div>
      </form>
    </Form>
  );
}

function StockDetails({
  stock = { name: "", price: 0, symbol: "", id: 0, lastUpdated: "" },
}: {
  stock?: stock;
}) {
  return (
    <>
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input disabled value={stock.name} className="capitalize" />
        </FormControl>
      </FormItem>
      <FormItem>
        <FormLabel>Price</FormLabel>
        <FormControl>
          <Input disabled value={"$" + stock.price} className="capitalize" />
        </FormControl>
      </FormItem>
    </>
  );
}
