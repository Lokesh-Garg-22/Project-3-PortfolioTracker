import RootDiv from "@/components/container/rootDiv";
import RootSection from "@/components/container/rootSection";
import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <RootDiv variant="image">
      <RootSection
        id="Hero"
        className="min-h-[calc(100vh-10rem)] flex flex-col-reverse sm:flex-row justify-center text-center gap-8"
      >
        <div className="w-full flex items-center justify-center">
          <div className="backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center gap-4">
            <TypographyH1 className="border-b-0">
              Welcome to Traker
            </TypographyH1>
            <TypographyH2 className="border-b-0 font-normal">
              A place to track all of your assets
            </TypographyH2>
            <Link href="/signup">
              <Button variant="outline" asChild>
                <TypographyP className="text-lg">Get Started</TypographyP>
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="m-auto size-52 sm:size-80 overflow-clip flex justify-center rounded-md">
            <Image
              src="/Forex.jpg"
              alt="Hero Image"
              width={1440}
              height={810}
              className="max-w-none w-auto h-full"
            />
          </div>
        </div>
      </RootSection>
    </RootDiv>
  );
}
