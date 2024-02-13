export default async function getGallery(id: number, token: any) {
  const response = await fetch(
    `${process.env.SERVER_API_URL}/galleries/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();
  return data;
}
