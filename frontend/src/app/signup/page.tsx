import Navbar from "@/components/global/navbar/Navbar";
import CheckAuthentication from "@/utils/CheckAuthentication";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import SignUp from "@/views/Signup";

export default function Page() {
  return (
    <>
      <CheckAuthentication logged={true} />
      <UpdateDarkMode />
      <Navbar />
      <SignUp />
    </>
  );
}
