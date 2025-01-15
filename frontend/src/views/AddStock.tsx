import RootDiv from "@/components/container/rootDiv";
import RootSection from "@/components/container/rootSection";
import { TypographyH1 } from "@/components/ui/typography";
import AddStockForm from "@/sections/stock/AddStockForm";

export default function AddStock({ fallbackUrl }: { fallbackUrl?: string }) {
  return (
    <RootDiv variant="image" className="flex items-center bg-cover">
      <RootSection className="w-full sm:w-4/5 bg-background px-6 py-8 sm:py-12 border sm:rounded-lg">
        <TypographyH1 className="text-center mb-2">Add Stock</TypographyH1>
        <AddStockForm fallbackUrl={fallbackUrl} />
      </RootSection>
    </RootDiv>
  );
}
