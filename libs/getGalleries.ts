export default async function getGalleries(token: any) {
  const response = await fetch(`${process.env.SERVER_API_URL}/galleries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    cache: "no-store",
  });

  const data = await response.json();
  return data;
}
