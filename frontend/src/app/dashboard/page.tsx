import Footer from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navbar/Navbar";
import CheckAuthentication from "@/utils/CheckAuthentication";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import Dashboard from "@/views/Dashboard";

export default function Page() {
  return (
    <>
      <UpdateDarkMode />
      <CheckAuthentication />
      <Navbar />
      <Dashboard />
      <Footer />
    </>
  );
}
