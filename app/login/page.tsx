import FormLogin from "@/components/FormLogin";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login | Aeroxee Blog",
};

function FormLoginFallback() {
  return <>placeholder</>;
}

export default function Login() {
  return (
    <Suspense fallback={<FormLoginFallback />}>
      <FormLogin />
    </Suspense>
  );
}
