import Footer from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navbar/Navbar";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import Dashboard from "@/views/Dashboard";

export default function Page() {
  return (
    <>
      <UpdateDarkMode />
      <Navbar />
      <Dashboard />
      <Footer />
    </>
  );
}
