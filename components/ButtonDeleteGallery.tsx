"use client";

import deleteGallery from "@/libs/deleteGallery";

type Props = {
  id: number;
  token: any;
};

export default function ButtonDeleteGallery({ id, token }: Props) {
  const handleClick = async () => {
    const statusDelete = await deleteGallery(id, token);
    if (statusDelete) {
      window.alert("Successfully delete gallery image.");
      window.location.reload();
    } else {
      window.alert("Failed delete gallery image.");
    }
  };

  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className="bg-rose-600 hover:bg-rose-700 active:bg-rose-600 px-4 py-2 text-white"
    >
      Delete
    </button>
  );
}
