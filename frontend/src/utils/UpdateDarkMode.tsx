"use client";

import localdata from "@/lib/localdata";
import { useEffect } from "react";

export default function UpdateDarkMode() {
  useEffect(() => {
    if (typeof window != "undefined") {
      document.body.classList.toggle("dark", localdata.getTheme() == "dark");
    }
  }, []);
  return <></>;
}
