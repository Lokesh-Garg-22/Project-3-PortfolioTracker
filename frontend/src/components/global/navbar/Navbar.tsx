"use client";

import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined") {
      setDarkMode(localStorage.them == "dark");
    }
  });

  return (
    <>
      <nav className="h-14 w-full fixed border-b backdrop-blur-md">
        <div className="flex items-center justify-between p-2 m-auto max-w-screen-lg">
          <TypographyH1>Tracker</TypographyH1>
          <div className="flex gap-1">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            {darkMode ? (
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setDarkMode(false);
                  localStorage.setItem("them", "light");
                  document.body.classList.toggle(
                    "dark",
                    localStorage.them == "dark"
                  );
                }}
              >
                <MoonIcon />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setDarkMode(true);
                  localStorage.setItem("them", "dark");
                  document.body.classList.toggle(
                    "dark",
                    localStorage.them == "dark"
                  );
                }}
              >
                <SunIcon />
              </Button>
            )}
          </div>
        </div>
      </nav>
      <div className="h-14" />
    </>
  );
}
