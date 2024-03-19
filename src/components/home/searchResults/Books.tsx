"use client";

import { useEffect, useState } from "react";
import BooksCard from "./BooksCard";
import { BookData } from "@/components/BooksData";

const Books = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [loading]);

  return (
    <div className="text-left">
      <h1 className=" font-semibold text-lg sm:text-xl">Search Books</h1>
      {/* <div className="grid grid-auto-fit-xl w-full py-6 gap-2">
        {books.map((book: any, index: number) => {
          let thumbnail = book.volumeInfo.imageLinks.smallThumbnail;
          return (
            <div key={index}>
              <Image
                src={thumbnail}
                alt="cover"
                width={90}
                height={90}
                loading="eager"
                quality={100}
                className=" object-contain "
              />
            </div>
          );
        })}
      </div> */}
      <div className="py-6">
        {loading ? (
          <h1 className="text-xl font-bold">Please Wait...</h1>
        ) : (
          <div className="grid grid-cols-2 sm:grid-auto-fit-xs gap-1.5 sm:gap-2">
            {" "}
            {BookData.map((book) => (
              <BooksCard
                key={book.id}
                id={book.id}
                title={book.title}
                imageLinks={book.imageLinks}
               
                description={book.description}
              
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
