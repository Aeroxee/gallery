"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Alert } from "./Alert";

export default function FormRegister() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("error");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(`${process.env.SERVER_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setShowAlert(true);
      setAlertType("success");
      setAlertMessage(
        `Account with username ${username} successfully to registered. Please login now.`
      );
      setIsLoading(false);
      return;
    } else {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(data.message);
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[96%] md:w-[78%] lg:w-[30%]">
      <div className="flex flex-col gap-5">
        <div className="p-5 border border-gray-300 dark:border-gray-600">
          <h1 className="mb-4 text-2xl font-extrabold text-center">
            Aeroxee Register
          </h1>
          <form action="" method="post" onSubmit={handleSubmit}>
            {showAlert && <Alert type={alertType}>{alertMessage}</Alert>}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="first_name"
                id="id_first_name"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit"
                placeholder="First name"
              />
              <input
                type="text"
                name="last_name"
                id="id_last_name"
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit"
                placeholder="Last name"
              />
              <input
                type="text"
                name="username"
                id="id_username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit"
                placeholder="Username"
              />
              <input
                type="email"
                name="email"
                id="id_email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit"
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                id="id_password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit"
                placeholder="Kata sandi"
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
            </div>
          </form>
        </div>
        <div className="p-5 border border-gray-300 dark:border-gray-600">
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-sky-600">
              Login here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
