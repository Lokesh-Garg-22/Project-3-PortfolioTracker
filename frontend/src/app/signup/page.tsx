import Navbar from "@/components/global/navbar/Navbar";
import UpdateDarkMode from "@/utils/UpdateDarkMode";
import SignUp from "@/views/Signup";

export default function Page() {
  return (
    <>
      <UpdateDarkMode />
      <Navbar />
      <SignUp />
    </>
  );
}
