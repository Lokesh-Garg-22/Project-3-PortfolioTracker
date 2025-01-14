import Footer from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navbar/Navbar";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import Portfolio from "@/views/Protfolio";

export default function Page() {
  return (
    <>
      <UpdateDarkMode />
      <Navbar />
      <Portfolio />
      <Footer />
    </>
  );
}
