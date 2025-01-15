import Footer from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navbar/Navbar";
import CheckAuthentication from "@/utils/CheckAuthentication";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import Portfolio from "@/views/Protfolio";

export default function Page() {
  return (
    <>
      <CheckAuthentication />
      <UpdateDarkMode />
      <Navbar />
      <Portfolio />
      <Footer />
    </>
  );
}
