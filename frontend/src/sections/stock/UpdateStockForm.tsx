"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fetchBackendUrl, fetchHeaders } from "@/lib/config";
import { PortfolioStock } from "@/lib/interfaces";
import localdata from "@/lib/localdata";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  quantity: z.string(),
});

export default function UpdateStockForm({
  className,
  id,
  fallbackDelay = 2000,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  id?: string | undefined;
  fallbackDelay?: number;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [stock, setStock] = useState<PortfolioStock>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: "",
    },
  });

  useEffect(() => {
    fetch(fetchBackendUrl + "/portfolio/stock", {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify({ user: localdata.getUser(), id }),
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
        setStock({
          symbol: res.stock.symbol,
          name: res.stock.name,
          quantity: res.quantity,
          price: res.stock.price,
          id: res.id,
          stockId: res.stock.id,
          userId: res.user.id,
        });
        form.setValue("quantity", res.quantity);
      });
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    let quantity;
    try {
      quantity = parseInt(values.quantity as string);
    } catch (e) {
      form.setError("quantity", { message: "Enter a Number!" });
      return;
    }

    fetch(fetchBackendUrl + "/portfolio/stock/update", {
      method: "post",
      headers: fetchHeaders,
      body: JSON.stringify({
        user: localdata.getUser(),
        portfolioStock: { id, quantity },
        id,
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
          title: "Stock updated successfully",
        });
        setTimeout(() => {
          router.push("/portfolio");
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
        <FormItem>
          <FormLabel>Select Stock</FormLabel>
          <FormControl>
            <Input value={stock?.symbol || ""} disabled />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Select Name</FormLabel>
          <FormControl>
            <Input value={stock?.name || ""} disabled />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Select Price</FormLabel>
          <FormControl>
            <Input value={stock?.price || 0} disabled />
          </FormControl>
        </FormItem>
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
          <Button type="submit">Update</Button>
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
