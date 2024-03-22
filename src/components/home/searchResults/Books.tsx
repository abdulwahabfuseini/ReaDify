import { useState } from "react";
import { BookType } from "@/contexts/Types";
import Image from "next/image";

const Books = ({ searchResult }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="text-left">
      
      <div className="py-6">
        <div>
          <div className="grid grid-cols-2 sm:grid-auto-fit-xs gap-1.5 sm:gap-2">
            <div key={searchResult.id}>
              <div className="flex justify-center">
                {searchResult.volumeInfo.imageLinks &&
                  searchResult.volumeInfo.imageLinks.thumbnail && (
                    <Image
                      width={500}
                      height={500}
                      src={searchResult.volumeInfo.imageLinks.thumbnail}
                      alt={searchResult.volumeInfo.title}
                      className=" object-cover rounded-lg"
                    />
                  )}
              </div>
              <h2 className="text-xl font-semibold">
                {searchResult.volumeInfo.title}
              </h2>
              <div className="text-gray-600">
                <p>Authors: {searchResult.volumeInfo.authors?.join(", ")}</p>
                <p>Published Date: {searchResult.volumeInfo.publishedDate}</p>
                <p>
                  Categories: {searchResult.volumeInfo.categories?.join(", ")}
                </p>
                <p>Language: {searchResult.volumeInfo.language}</p>
                <p>Page Count: {searchResult.volumeInfo.pageCount}</p>
                <p>Print Type: {searchResult.volumeInfo.printType}</p>
                <p>Publisher: {searchResult.volumeInfo.publisher}</p>
                <p>
                  Preview Link:{" "}
                  <a
                    href={searchResult.volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {searchResult.volumeInfo.previewLink}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
