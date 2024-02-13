export default async function getUserInfo(id: number) {
  const response = await fetch(`${process.env.SERVER_API_URL}/user?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();
  return data;
}
