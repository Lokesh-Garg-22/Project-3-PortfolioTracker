import RootDiv from "@/components/container/rootDiv";
import RootSection from "@/components/container/rootSection";
import { TypographyH1 } from "@/components/ui/typography";
import UpdateStockForm from "@/sections/stock/UpdateStockForm";

export default function UpdateStock({
  stockId,
}: {
  stockId?: string | undefined;
}) {
  return (
    <RootDiv variant="image" className="flex items-center bg-cover">
      <RootSection className="w-full sm:w-4/5 bg-background px-6 py-12 border rounded-lg">
        <TypographyH1 className="text-center">Update Stock</TypographyH1>
        <UpdateStockForm stockId={stockId} />
      </RootSection>
    </RootDiv>
  );
}
