"use client";

import { BookType } from "@/contexts/Types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BooksCard = ({ title, imageLinks }: BookType) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [isLoading]);

  return (
    <div>
      <Link href={`/search/${title}`}>
        <div className="flex flex-col gap-y-2 hover:scale-110 p-2">
          <div className="w-full h-44 relative">
            {isLoading ? (
              <div className="image-placeholder w-full"></div>
            ) : (
              <Image
                src={`/images/${imageLinks || "pdf.png"}`}
                fill
                alt="cover"
                quality={100}
                loading="lazy"
                objectFit="contain"
              />
            )}
          </div>
          <div>
            {isLoading ? (
              <div className="title-placeholder"></div>
            ) : (
              <h1 className="font-semibold text-center text-sm">{title}</h1>
            )}

            {/* <Typography.Paragraph
              className="text-sm"
              ellipsis={{
                rows: 2,
                expandable: true,
                symbol: "Read More",
              }}
            >
              {description}
            </Typography.Paragraph> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BooksCard;
