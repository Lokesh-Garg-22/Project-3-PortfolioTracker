import { TypographyH3, TypographyH2 } from "@/components/ui/typography";

export default function Stats() {
  return (
    <section className="p-8 flex justify-around">
      <div className="max-w-60 grow p-4 border-2 rounded-lg text-center bg-background">
        <TypographyH3 className="border-0 min-h-16">Total Stocks</TypographyH3>
        <div className="border my-2" />
        <TypographyH2 className="border-0 p-0">X</TypographyH2>
      </div>
      <div className="max-w-60 grow p-4 border-2 rounded-lg text-center bg-background">
        <TypographyH3 className="border-0 min-h-16">
          Avarage Value
          <br />
          Per Stock
        </TypographyH3>
        <div className="border my-2" />
        <TypographyH2 className="border-0 p-0">Y</TypographyH2>
      </div>
      <div className="max-w-60 grow p-4 border-2 rounded-lg text-center bg-background">
        <TypographyH3 className="border-0 min-h-16">
          Total Value
          <br />
          of Stocks
        </TypographyH3>
        <div className="border my-2" />
        <TypographyH2 className="border-0 p-0">Z</TypographyH2>
      </div>
    </section>
  );
}
