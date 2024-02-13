"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Alert } from "./Alert";

export default function FormLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const next = searchParams.get("next");

  useEffect(() => {
    if (next != null) {
      setShowAlert(true);
      setAlertMessage("Authentication is required.");
    }
  }, [next]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(`${process.env.SERVER_API_URL}/get-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setShowAlert(true);
      setAlertMessage(data.message);
      setIsLoading(false);
      return;
    } else {
      setCookie("token", data.token, {
        secure: false,
        maxAge: 60 * 6 * 24,
        sameSite: "strict",
      });

      if (next != null) {
        window.location.href = next;
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[96%] md:w-[78%] lg:w-[30%]">
      <div className="flex flex-col gap-5">
        <div className="p-5 border border-gray-300 dark:border-gray-600">
          <h1 className="mb-4 text-2xl font-extrabold text-center">
            Aeroxee Login
          </h1>
          <form action="" method="post" onSubmit={handleSubmit}>
            {showAlert && (
              <Alert type="error">
                <p>{alertMessage}</p>
              </Alert>
            )}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="username"
                id="id_username"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit"
                placeholder="Email atau username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                id="id_password"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit"
                placeholder="Kata sandi"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-600 py-2"
              >
                {isLoading && (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="me-4 animate-spin"
                  />
                )}
                Login
              </button>
              <Link href="/" className="text-xs text-sky-600">
                Lupa sandi?
              </Link>
            </div>
          </form>
        </div>
        <div className="p-5 border border-gray-300 dark:border-gray-600">
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-sky-600">
              Register here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
