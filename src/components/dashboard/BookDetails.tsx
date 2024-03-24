"use client";

import { BookType } from "@/contexts/Types";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BookDetails = ({
  volumeInfo: {
    title,
    subtitle,
    authors,
    categories,
    pageCount,
    publishedDate,
    description,
    previewLink,
    imageLinks,
  },
}: BookType) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <h1 className="text-xl font-semibold h-96">Please Wait...</h1>
      ) : (
        <div className="grid sm:grid-cols-3 gap-y-8 gap-x-4 lg:gap-x-10 lg:place-items-center">
          <div className="w-full h-72 sm:col-span-1 sm:h-[400px] relative order-2 sm:order-1">
            {imageLinks && imageLinks.thumbnail && (
              <Image
                fill
                src={imageLinks.thumbnail}
                alt={title || ""}
                className=" object-contain rounded-lg h-48"
              />
            )}
          </div>
          <div className="w-full sm:col-span-2 order-1 sm:order-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <h4 className=" text-lg">{subtitle}</h4>
            <div className=" font-bold text-sm py-1 text-blue-500">
              <h1>Author(s): {authors?.join(", ")}</h1>
              <p>Published-Date: {publishedDate}</p>
            </div>
            <div className="py-1 flex items-center gap-6 flex-wrap">
              <h4 className="text-sm font-semibold">
                Categories:{" "}
                <span className="text-gray-500">{categories?.join(", ")}</span>{" "}
              </h4>
              <h4 className="text-sm font-semibold">
                Page Count: <span className="text-gray-500">{pageCount}</span>{" "}
              </h4>
            </div>

            <Typography.Paragraph
              // key={index}
              className="text-base"
              ellipsis={{
                rows: 10,
              }}
            >
              {description}
            </Typography.Paragraph>
            <a
              href={previewLink}
              target="_blank"
              className="flex items-center justify-center w-full pb-3 hover:underline text-lg text-blue-400 font-semibold hover:text-green-500"
            >
              See Preview on Google Books
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
