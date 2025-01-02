import Navbar from "@/components/global/navbar/Navbar";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import Home from "@/views/Home";

export default function Page() {
  return (
    <>
      <UpdateDarkMode />
      <Navbar />
      <Home />
    </>
  );
}
