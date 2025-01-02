"use client";

import { useEffect } from "react";

export default function UpdateDarkMode() {
  useEffect(() => {
    if (typeof window != "undefined") {
      document.body.classList.toggle("dark", localStorage.them == "dark");
    }
  });
  return <></>;
}
