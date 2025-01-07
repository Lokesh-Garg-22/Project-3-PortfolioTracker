import RootDiv from "@/components/container/rootDiv";
import Portfolio from "@/sections/dashboard/Portfolio";
import Stats from "@/sections/dashboard/Stats";

export default function Dashboard() {
  return (
    <RootDiv variant="image">
      <Stats />
      <Portfolio />
    </RootDiv>
  );
}
