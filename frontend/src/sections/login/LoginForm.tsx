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
});

export default function LoginForm({
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
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await fetch(fetchBackendUrl + "/users/login", {
      method: "POST",
      body: JSON.stringify(values),
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
          title: "Login successfully",
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
        <TypographyP>
          Don&apos;t have an account?
          <Button variant="link" className="px-2" asChild>
            <Link href="/signup">SignUp</Link>
          </Button>
        </TypographyP>
        <Button
          type="submit"
          onMouseOver={() => {
            router.prefetch("/dashboard");
          }}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
