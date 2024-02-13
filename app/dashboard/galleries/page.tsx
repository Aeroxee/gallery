import ButtonDeleteGallery from "@/components/ButtonDeleteGallery";
import Container from "@/components/Container";
import getGalleries from "@/libs/getGalleries";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Posts | Aeroxee Blog",
};

export default async function Posts() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  // const user = await getAuth(token?.value);

  const galleries = await getGalleries(token?.value);
  return (
    <>
      <Container>
        <section className="pt-[100px]">
          <div className="flex flex-col md:flex-row gap-8">
            <div aria-label="new-posts" className="w-full">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="font-extrabold text-lg md:text-4xl mb-4">
                    Your Gallery
                  </h1>
                  <Link href="/dashboard/galleries/add" legacyBehavior>
                    <button
                      type="button"
                      className="bg-sky-600 hover:bg-sky-700 active:bg-sky-600 text-white text-sm px-4 py-2 rounded-md"
                    >
                      Add Photo
                    </button>
                  </Link>
                </div>
                <div className="columns-2 md:columns-4 gap-4">
                  {galleries.map((gallery: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="border border-gray-300 dark:border-gray-600 rounded-md mb-4"
                      >
                        <div className="relative group">
                          <Image
                            src={`${process.env.SERVER_API_URL}/${gallery.image}`}
                            alt="article"
                            width={1200}
                            height={800}
                            className="w-full h-auto rounded-md"
                          />
                          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800/70 dark:bg-gray-900/70 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div className="flex flex-col gap-2">
                                <Link
                                  href={`/dashboard/galleries/edit/${gallery.id}`}
                                  legacyBehavior
                                >
                                  <button
                                    type="button"
                                    className="bg-sky-600 hover:bg-sky-700 active:bg-sky-600 px-4 py-2 text-white"
                                  >
                                    Edit
                                  </button>
                                </Link>
                                <ButtonDeleteGallery
                                  token={token?.value}
                                  id={gallery.id}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
