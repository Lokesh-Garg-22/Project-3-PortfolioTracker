import Navbar from "@/components/global/navbar/Navbar";
import CheckAuthentication from "@/utils/CheckAuthentication";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import Login from "@/views/Login";

export default function Page() {
  return (
    <>
      <CheckAuthentication logged={true} />
      <UpdateDarkMode />
      <Navbar />
      <Login />
    </>
  );
}
