"use client";

import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { User } from "@/lib/interfaces";
import localdata from "@/lib/localdata";
import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (typeof window != "undefined") {
      setUser(localdata.getUser());
      setDarkMode(localdata.getTheme() == "dark");
    }
  }, []);

  return (
    <>
      <nav className="h-14 w-full fixed border-b backdrop-blur-md">
        <div className="flex items-center justify-between p-2 m-auto max-w-screen-lg">
          <Link href="/">
            <TypographyH1>Tracker</TypographyH1>
          </Link>
          <div className="flex gap-1">
            {user ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    localdata.removeUser();
                    router.push("/");
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
            {darkMode ? (
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setDarkMode(false);
                  localdata.setTheme("light");
                  document.body.classList.toggle(
                    "dark",
                    localdata.getTheme() == "dark"
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
                  localdata.setTheme("dark");
                  document.body.classList.toggle(
                    "dark",
                    localdata.getTheme() == "dark"
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
