"use client";

import Container from "@/components/Container";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Captions } from "yet-another-react-lightbox/plugins";

type Props = {
  galleries: any;
};

type ImageType = {
  title: string;
  src: string;
  description: string;
  id: number;
  user_id: number;
};

export default function GalleryImages({ galleries }: Props) {
  const [index, setIndex] = useState(-1);
  const Images: ImageType[] = [];

  for (let i = 0; i < galleries.length; i++) {
    const img: ImageType = {
      title: galleries[i].title,
      src: `${process.env.SERVER_API_URL}/${galleries[i].image}`,
      description: galleries[i].description,
      id: galleries[i].id,
      user_id: galleries[i].user_id,
    };
    Images.push(img);
  }

  return (
    <>
      <Container className="pt-[100px]">
        <div className="columns-2 md:columns-3 gap-2 md:gap-4">
          {Images.map((value: ImageType, index: number) => (
            <div key={index} className="mb-2 md:mb-4 cursor-pointer">
              <Image
                src={value.src}
                alt=""
                width={1200}
                height={800}
                className="w-full h-auto cursor-pointer rounded-lg"
                onClick={() => setIndex(index)}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,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"
              />
            </div>
          ))}
        </div>
      </Container>

      <Lightbox
        index={index}
        slides={Images}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Captions]}
      />
    </>
  );
}
