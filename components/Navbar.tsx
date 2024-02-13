"use client";

import {
  faArrowLeft,
  faBars,
  faMoon,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Navigation component
 * @returns JSX.Element
 */
const Navbar = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const [isDark, setIsDark] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const logoutAction = () => {
    deleteCookie("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = getCookie("token");

    if (token == null || token == "") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    const navbar = document.querySelector("#navbar");

    window.onscroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      if (scrollPosition > 50) {
        navbar?.classList.add("shadow");
      } else {
        navbar?.classList.remove("shadow");
      }
    };

    const navbarLinks = document.querySelectorAll("#navbarLinks");
    for (let i = 0; i < navbarLinks.length; i++) {
      navbarLinks[i].addEventListener("click", () => {
        setShow(false);
      });
    }
  });

  useEffect(() => {
    if (isDark) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      {pathname === "/login" || pathname === "/register" ? (
        ""
      ) : (
        <nav
          id="navbar"
          className="p-3 fixed top-0 left-0 right-0 z-40 bg-white/50 dark:bg-gray-900/50 backdrop-filter backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-4 w-full md:w-auto">
              {pathname.startsWith("/posts") ? (
                <button type="button" onClick={() => router.back()}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              ) : (
                <Link href="/" className="text-xl font-extrabold">
                  Aeroxee
                </Link>
              )}
              <button
                type="button"
                className="md:hidden"
                onClick={() => setShow(true)}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>

            {/* Links */}
            <div
              ref={navRef}
              className={`flex items-start md:items-center flex-col md:flex-row gap-5 md:gap-4 absolute md:static md:visible md:opacity-100 top-0 ${
                show
                  ? "left-0 opacity-100 visible"
                  : "-left-[600px] invisible opacity-0"
              } bg-white dark:bg-gray-900 md:bg-inherit dark:md:bg-inherit w-[60%] md:w-auto h-screen md:h-auto z-40 shadow-md md:shadow-none p-5 md:p-0 transition-all duration-200 ease-in-out`}
            >
              <div className="my-4 flex items-center justify-between w-full md:hidden">
                <Link href={"/"} className="text-2xl font-extrabold">
                  Aeroxee
                </Link>
                <button type="button" onClick={() => setShow(false)}>
                  <FontAwesomeIcon icon={faX} size="lg" />
                </button>
              </div>
              {pathname.startsWith("/dashboard") ? (
                <>
                  <Link
                    id="navbarLinks"
                    href="/dashboard"
                    className="text-sm text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                    prefetch={false}
                  >
                    Dashboard
                  </Link>
                  <Link
                    id="navbarLinks"
                    href="/dashboard/galleries/"
                    className="text-sm text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                    prefetch={false}
                  >
                    Galleries
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => logoutAction()}
                    className="text-white text-sm px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-700 active:bg-rose-600"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    id="navbarLinks"
                    href="/"
                    className="text-sm text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                    prefetch={false}
                  >
                    Home
                  </Link>
                  <Link
                    id="navbarLinks"
                    href="/about"
                    className="text-sm text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                    prefetch={false}
                  >
                    About
                  </Link>
                  <Link
                    id="navbarLinks"
                    href="/gallery"
                    className="text-sm text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                    prefetch={false}
                  >
                    Gallery
                  </Link>

                  <Link
                    id="navbarLinks"
                    href="/dashboard"
                    className="text-sm text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                    prefetch={false}
                  >
                    Dashboard
                  </Link>

                  {isLogin ? (
                    <Link
                      href="/login"
                      onClick={() => logoutAction()}
                      className="text-white text-sm px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-700 active:bg-rose-600"
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="text-white text-sm px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 active:bg-sky-600"
                    >
                      Login
                    </Link>
                  )}
                </>
              )}

              <button type="button" onClick={() => setIsDark(!isDark)}>
                <FontAwesomeIcon icon={faMoon} />
              </button>
            </div>
            {/* Links */}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
