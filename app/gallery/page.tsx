import { Metadata } from "next";

import GalleryImages from "@/components/GalleryImages";
import getGalleries from "@/libs/getGalleries";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | Aeroxee Blog",
};

export default async function Gallery() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const galleries = await getGalleries(token?.value);

  return (
    <>
      {galleries.length < 1 ? (
        <div className="w-full h-screen relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl font-extrabold text-center">
              Gallery Empty
            </h1>
            <div className="flex items-center justify-center mt-4">
              <Link
                href="/dashboard/galleries/add"
                className="text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-md"
              >
                Add Gallery
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <GalleryImages galleries={galleries} />
      )}
    </>
  );
}
