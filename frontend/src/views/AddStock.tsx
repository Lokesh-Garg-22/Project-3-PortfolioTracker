import RootDiv from "@/components/container/rootDiv";
import RootSection from "@/components/container/rootSection";
import { TypographyH1 } from "@/components/ui/typography";
import AddStockForm from "@/sections/stock/AddStockForm";

export default function AddStock() {
  return (
    <RootDiv variant="image" className="flex items-center bg-cover">
      <RootSection className="w-full sm:w-4/5 bg-background px-6 py-12 border rounded-lg">
        <TypographyH1 className="text-center">Add Stock</TypographyH1>
        <AddStockForm />
      </RootSection>
    </RootDiv>
  );
}
