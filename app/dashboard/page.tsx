import Container from "@/components/Container";
import getAuth from "@/libs/getAuth";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard | Aeroxee Blog",
};

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const user = await getAuth(token?.value);

  return (
    <>
      <Container>
        <section className="pt-[100px]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">{user.full_name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl text-sky-600">Photo</h4>
                {user.galleries.length}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
