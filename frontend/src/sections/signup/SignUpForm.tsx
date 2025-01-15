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
import { useToast } from "@/hooks/use-toast";
import { fetchBackendUrl, fetchHeaders } from "@/lib/config";
import localdata from "@/lib/localdata";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  cpassword: z.string().min(2).max(50),
});

export default function SignUpForm({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      cpassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password != values.cpassword) {
      form.setError(
        "cpassword",
        { type: "custom", message: "Please enter the same Password!" },
        { shouldFocus: true }
      );
      return;
    }

    const data = {
      name: values.username,
      username: values.username,
      password: values.password,
    };

    const user = await fetch(fetchBackendUrl + "/users/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: fetchHeaders,
    }).then((res) => res.json());

    if (!!user.error) {
      toast({
        title: user.message,
        className: "text-destructive",
      });
    } else {
      localdata.setUser(user);
      setTimeout(() => {
        toast({
          title: "User created successfully",
        });
        router.push("/dashboard");
      }, 2000);
    }
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Re-Enter Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TypographyP>
          Allready have an account?
          <Button variant="link" className="px-2" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </TypographyP>
        <Button
          type="submit"
          onMouseOver={() => {
            router.prefetch("/dashboard");
          }}
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
