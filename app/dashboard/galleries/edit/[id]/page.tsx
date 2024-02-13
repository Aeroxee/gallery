import EditGallery from "@/components/EditGallery";
import getGallery from "@/libs/getGallery";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";

type Props = {
  params: { id: number };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const gallery = await getGallery(params.id, token?.value);

  return {
    title: gallery.title + " | Edit",
  };
}

export default async function Edit({ params }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token?.value) return;
  const gallery = await getGallery(params.id, token?.value);

  return <EditGallery gallery={gallery} />;
}
