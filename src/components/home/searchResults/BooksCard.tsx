
import { BookType } from "@/contexts/Types";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BooksCard = ({ title, description, imageLinks }: BookType) => {
  return (
    <div>
      <Link href={`/search/${title}`}>
        <div className="flex flex-col gap-y-2 hover:scale-110 p-2">
        <div className="w-full h-44 relative">
        <Image
            src={`/images/${imageLinks || "pdf.png"}`}
           fill
            alt="cover"
            quality={100}
            loading="lazy"
            objectFit="contain"
          
          />
        </div>
          <div>
            <h1 className="font-semibold text-center text-sm">{title}</h1>

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
