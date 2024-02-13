import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Aeroxee Blog",
};

export default function About() {
  return (
    <>
      <header className="w-full h-screen relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl font-extrabold text-center">About Aeroxee</h1>
          <p className="mt-3 text-center font-extralight">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit sunt
            nulla laudantium mollitia similique totam ad voluptate culpa amet
            aut, minima ipsum ut! Commodi dolores aperiam quos alias.
            Reprehenderit, maiores.
          </p>
        </div>
      </header>
    </>
  );
}
