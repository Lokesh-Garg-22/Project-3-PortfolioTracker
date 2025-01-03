"use client";

import localdata from "@/lib/localdata";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckAuthentication(logged = false) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window != "undefined") {
      if (logged) {
        if (!localdata.getUser()) router.push("/");
      } else {
        if (localdata.getUser()) router.push("/dashboard");
      }
    }
  });
  return <></>;
}
