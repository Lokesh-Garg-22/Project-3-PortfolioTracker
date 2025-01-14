import Footer from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navbar/Navbar";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import AddStock from "@/views/AddStock";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const fallback =
    typeof (await searchParams).fallback == "string"
      ? ((await searchParams).fallback as string)
      : undefined;

  return (
    <>
      <UpdateDarkMode />
      <Navbar />
      <AddStock fallbackUrl={fallback} />
      <Footer />
    </>
  );
}
