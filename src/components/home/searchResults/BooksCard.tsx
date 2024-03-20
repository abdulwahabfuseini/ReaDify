
import { BookType } from "@/contexts/Types";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BooksCard = ({ title, description, imageLinks }: BookType) => {
  return (
    <div>
      <Link href={`/search/${title}`}>
        <div className="flex flex-col items-center justify-center gap-4 border-2 p-2">
          <Image
            src={`/images/${imageLinks || "/images/pdf.png"}`}
            width={160}
            height={160}
            alt="cover"
            quality={100}
            loading="lazy"
            objectFit="contain"
          />
          <div>
            <h1 className="font-semibold text-center">{title}</h1>

            <Typography.Paragraph
              className="text-sm"
              ellipsis={{
                rows: 2,
                expandable: true,
                symbol: "Read More",
              }}
            >
              {description}
            </Typography.Paragraph>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BooksCard;
