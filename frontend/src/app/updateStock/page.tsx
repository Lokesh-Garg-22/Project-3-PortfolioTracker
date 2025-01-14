import Footer from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navbar/Navbar";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import UpdateStock from "@/views/UpdateStock";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id =
    typeof (await searchParams).id == "string"
      ? ((await searchParams).id as string)
      : undefined;

  return (
    <>
      <UpdateDarkMode />
      <Navbar />
      <UpdateStock id={id} />
      <Footer />
    </>
  );
}
