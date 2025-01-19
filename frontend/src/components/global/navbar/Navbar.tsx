"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypographyH1 } from "@/components/ui/typography";
import { User } from "@/lib/interfaces";
import localdata from "@/lib/localdata";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>();
  const [mobile, setMobile] = useState<boolean>();

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMobile(!mql.matches);

    mql.addEventListener("change", onChange);
    setMobile(!mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (typeof window != "undefined") {
      setUser(localdata.getUser());
      setDarkMode(localdata.getTheme() == "dark");
    }
  }, []);

  function NavButtons() {
    return (
      <>
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
      </>
    );
  }
  function NavMobileButtons() {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    localdata.removeUser();
                    router.push("/");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
            )}
            {darkMode ? (
              <DropdownMenuItem asChild>
                <Button
                  variant="link"
                  className="w-full"
                  onClick={() => {
                    setDarkMode(false);
                    localdata.setTheme("light");
                    document.body.classList.toggle(
                      "dark",
                      localdata.getTheme() == "dark"
                    );
                  }}
                >
                  <MoonIcon /> Dark Mode
                </Button>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Button
                  variant="link"
                  className="w-full"
                  onClick={() => {
                    setDarkMode(true);
                    localdata.setTheme("dark");
                    document.body.classList.toggle(
                      "dark",
                      localdata.getTheme() == "dark"
                    );
                  }}
                >
                  <SunIcon /> Light Mode
                </Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <>
      <nav className="z-20 h-14 w-full fixed border-b backdrop-blur-md">
        <div className="flex items-center justify-between p-2 m-auto max-w-screen-lg">
          <Link href="/">
            <TypographyH1 className="max-sm:text-2xl">Tracker</TypographyH1>
          </Link>
          <div className="flex gap-1">
            {mobile ? <NavMobileButtons /> : <NavButtons />}
          </div>
        </div>
      </nav>
      <div className="h-14" />
    </>
  );
}
