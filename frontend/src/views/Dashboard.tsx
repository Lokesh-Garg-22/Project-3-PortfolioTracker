import RootDiv from "@/components/container/rootDiv";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import Portfolio from "@/sections/dashboard/Portfolio";
import Stats from "@/sections/dashboard/Stats";

export default function Dashboard() {
  return (
    <RootDiv>
      <Stats />
      <Portfolio />
    </RootDiv>
  );
}
