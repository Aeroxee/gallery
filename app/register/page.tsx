import FormRegister from "@/components/FormRegister";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Aeroxee Blog",
};

export default function Register() {
  return <FormRegister />;
}
