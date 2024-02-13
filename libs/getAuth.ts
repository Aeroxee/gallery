export default async function getAuth(token: any) {
  const response = await fetch(`${process.env.SERVER_API_URL}/user/auth`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    cache: "no-store",
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return undefined;
  }
}
