import AddGallery from "@/components/AddGallery";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Add Post | Aeroxee Blog",
};

export default function Post() {
  return (
    <>
      <AddGallery />
    </>
  );
}
