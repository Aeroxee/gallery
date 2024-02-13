"use client";

import Image from "next/image";
import Link from "next/link";

type BoxArticlesProps = {
  article: any;
};

export default function BoxArticle({ article }: BoxArticlesProps) {
  const truncateText = article.content
    .replace(/<\/?[^>]+(>|$)/g, "") // Menghapus tag HTML
    .split(" ")
    .slice(0, 20)
    .join(" ");

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-md">
      <Image
        src={`${process.env.SERVER_API_URL}/${article.logo}`}
        alt="article"
        width={1200}
        height={800}
        className="w-full h-[250px] rounded-t-md"
      />
      <div className="p-4 text-sm font-extralight flex flex-col items-start gap-2">
        <Link href={`/posts/${article.slug}`} prefetch={false} legacyBehavior>
          <h4 className="text-lg font-extrabold text-sky-600 cursor-pointer">
            {article.title}
          </h4>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: truncateText }}></p>
      </div>
    </div>
  );
}
