import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Aeroxee Blog",
};

export default function Home() {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[96%] md:w-auto">
        <h1 className="text-4xl font-extrabold text-center">
          Welcome To Gallery Web
        </h1>
      </div>
    </div>
  );
}
