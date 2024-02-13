export default async function deleteGallery(id: number, token: any) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/galleries/${id}/delete`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (response.status == 204) {
    return true;
  } else {
    false;
  }
}
