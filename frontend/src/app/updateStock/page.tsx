import Footer from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navbar/Navbar";
import UpdateStock from "@/views/UpdateStock";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const stockId =
    typeof (await searchParams).stockId == "string"
      ? ((await searchParams).stockId as string)
      : undefined;

  return (
    <>
      <Navbar />
      <UpdateStock stockId={stockId} />
      <Footer />
    </>
  );
}
