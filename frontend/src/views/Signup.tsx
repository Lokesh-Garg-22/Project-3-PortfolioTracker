import RootDiv from "@/components/container/rootDiv";
import RootSection from "@/components/container/rootSection";
import { TypographyH1 } from "@/components/ui/typography";
import SignUpForm from "@/sections/signup/SignUpForm";

export default function SignUp() {
  return (
    <RootDiv className="flex items-center bg-[url(/bg.jpg)] bg-no-repeat bg-bottom bg-fixed bg-cover bg-blend-overlay bg-white/80 dark:bg-black/80">
      <RootSection className="w-full sm:w-4/5 bg-white px-6 py-12 border rounded-lg">
        <TypographyH1 className="text-center">Sign Up</TypographyH1>
        <SignUpForm className="mt-8" />
      </RootSection>
    </RootDiv>
  );
}
