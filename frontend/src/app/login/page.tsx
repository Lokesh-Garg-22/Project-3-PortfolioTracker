import Navbar from "@/components/global/navbar/Navbar";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import Login from "@/views/Login";

export default function Page() {
  return (
    <>
      <UpdateDarkMode />
      <Navbar />
      <Login />
    </>
  );
}
