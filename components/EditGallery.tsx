"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { Alert } from "./Alert";
import Container from "./Container";

type Props = {
  gallery: any;
};

export default function EditGallery({ gallery }: Props) {
  const [title, setTitle] = useState<string>(gallery.title);
  const [description, setDescription] = useState<string>(gallery.description);
  const [photo, setPhoto] = useState<any>(null);

  const [alertType, setAlertType] = useState<"success" | "error">("error");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setPhoto(file || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (photo != null) {
      formData.append("photo", photo);
    }

    const token = getCookie("token");

    try {
      const response = await fetch(
        `${process.env.SERVER_API_URL}/galleries/${gallery.id}/update`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowAlert(true);
        setAlertType("success");
        setAlertMessage("Updating image successfully.");
        setIsLoading(false);
        return;
      } else {
        setShowAlert(true);
        setAlertType("error");
        setAlertMessage("Failed update image.:" + data.messages);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  return (
    <Container>
      <section className="pt-[100px]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div aria-label="new-posts" className="w-full md:w-8/12">
            <h1 className="mb-4 text-4xl font-extrabold">Add Gallery</h1>
            {showAlert && <Alert type={alertType}>{alertMessage}</Alert>}
            <form action="" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="id_title"
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit`}
                    value={title}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      id="id_description"
                      onChange={(e) => setDescription(e.target.value)}
                      className={`w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit`}
                      cols={30}
                      value={description}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="photo">Photo</label>
                  <input
                    type="file"
                    name="photo"
                    id="id_photo"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-inherit"
                    // required
                  />
                  <Image
                    src={`${process.env.SERVER_API_URL}/${gallery.image}`}
                    alt={gallery.title}
                    width={1200}
                    height={800}
                    className="w-full md:w-1/2 h-auto md:h-[200px]"
                  />
                </div>
              </div>

              <div className="flex">
                <button
                  type="submit"
                  className="text-white px-4 py-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-600 mt-5 w-full"
                >
                  <div className="mx-auto">
                    {isLoading && (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin me-5"
                      />
                    )}
                    <span>Save</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
}
