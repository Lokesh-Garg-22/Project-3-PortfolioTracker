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
import { TypographyP } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  stock: z.string(),
  quantity: z.string(),
});

export default function UpdateStockForm({
  className,
  id,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  id?: string | undefined;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock: "",
      quantity: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("//TODO");
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Stock</FormLabel>
              <FormControl>
                <Input placeholder="stock" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="quantity"
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
