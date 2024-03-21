"use client";

import Image from "next/image";
// import { motion } from "framer-motion";
// import { fadeIn } from "@/utils/motion";
import { TbChevronLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { BookData } from "@/components/BooksData";
import Navbar from "@/components/header/Navbar";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import Buttons from "@/components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  FavoriteBooksActions,
  selectFavoriteBooks,
} from "@/redux/FavoriteBooks";
import toast from "react-hot-toast";
import { ReadingBooksActions, selectReadingBooks } from "@/redux/ReadingBooks";
import Link from "next/link";
import { ReadBooksActions, selectReadBooks } from "@/redux/ReadBooks";

const Book = ({ params }: any) => {
  const title = decodeURIComponent(params.id);
  const book = BookData.find(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  const {
    id,
    imageLinks,
    authors,
    publishedDate,
    description,
    subtitle,
    categories,
    pageCount,
    previewLink,
  } = book as {
    id: number;
    title: string;
    subtitle: string;
    publishedDate: string;
    authors: string[];
    categories: string[];
    pageCount: number;
    imageLinks: string;
    description: string;
    previewLink: string;
  };

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const favoriteBooks = useSelector(selectFavoriteBooks);
  const isFavorite = favoriteBooks.some((favorite) => favorite.id === id);

  const readingNow = useSelector(selectReadingBooks);
  const isReading = readingNow.some((reading) => reading.id === id);

  const read = useSelector(selectReadBooks);
  const isRead = read.some((read) => read.id === id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(FavoriteBooksActions.deleteFavorite(id));
      toast.error("Book Removed from Favorite");
    } else {
      dispatch(
        FavoriteBooksActions.addToFavorite({
          id,
          title,
          imageLinks,
          subtitle,
          authors,
          categories,
          pageCount,
          description,
          publishedDate,
          previewLink,
          quantity: 0,
        })
      );
      toast.success("Book Added to Favorite");
    }
  };

  const handleToggleReading = () => {
    if (isReading) {
      dispatch(ReadingBooksActions.deleteReading(id));
      toast.error("Book Removed from Reading Now");
    } else {
      // Remove the book from the read list if it's already there
      if (isRead) {
        dispatch(ReadBooksActions.deleteRead(id));
        toast.error("Book Removed from Read");
      }
      dispatch(
        ReadingBooksActions.addToReading({
          id,
          title,
          imageLinks,
          subtitle,
          authors,
          categories,
          pageCount,
          description,
          publishedDate,
          previewLink,
          quantity: 0,
        })
      );
      toast.success("Book Added to Reading Now");
    }
  };

  const handleToggleRead = () => {
    if (isRead) {
      dispatch(ReadBooksActions.deleteRead(id));
      toast.error("Book Removed from Read");
    } else {
      if (isReading) {
        dispatch(ReadingBooksActions.deleteReading(id));
        toast.error("Book Removed from Reading Now");
      }
      dispatch(
        ReadBooksActions.addToRead({
          id,
          title,
          imageLinks,
          subtitle,
          authors,
          categories,
          pageCount,
          description,
          publishedDate,
          previewLink,
          quantity: 0,
        })
      );
      toast.success("Book Added to Read");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [loading]);

  return (
    <>
      <Navbar />
      <div className="grid max-w-6xl px-3 py-9 mx-auto md:py-20 lg:py-8 sm:px-6 place-items-start gap-y-5 mb-20">
        <button
          onClick={() => router.push("/")}
          type="button"
          className=" p-1 font-semibold text-center bg-gray-200  mx-1 rounded-full"
        >
          <TbChevronLeft className="w-8 h-8" />
        </button>
        <div className="py-6">
          {loading ? (
            <h1 className="text-xl font-bold">Please Wait...</h1>
          ) : (
            <div>
              <div className="grid sm:grid-cols-3 gap-y-8 gap-x-4 lg:gap-x-10 lg:place-items-center">
                <div className="w-full h-72 sm:col-span-1 sm:h-[500px] relative order-2 sm:order-1">
                  <Image
                    src={`/images/${imageLinks || "pdf.png"}`}
                    layout="fill"
                    alt="cover"
                    quality={100}
                    objectPosition="center"
                    objectFit="contain"
                    loading="lazy"
                  />
                </div>
                <div className="w-full sm:col-span-2 order-1 sm:order-2">
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <h4 className=" text-lg">{subtitle}</h4>
                  <div className=" font-bold text-sm py-1 text-blue-500">
                    <h1>Author(s): {authors.map(String).join(", ")}</h1>
                    <p>Published-Date: {publishedDate}</p>
                  </div>
                  <div className="py-1 flex items-center gap-6 flex-wrap">
                    <h4 className="text-sm font-semibold">
                      Categories:{" "}
                      <span className="text-gray-500">{categories}</span>{" "}
                    </h4>
                    <h4 className="text-sm font-semibold">
                      Page Count:{" "}
                      <span className="text-gray-500">{pageCount}</span>{" "}
                    </h4>
                  </div>

                  <Typography.Paragraph
                    className="text-base"
                    ellipsis={{
                      rows: 10,
                    }}
                  >
                    {description.split(". ").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </Typography.Paragraph>

                  <div>
                    <Buttons
                      handleToggleFavorite={handleToggleFavorite}
                      isFavorite={isFavorite}
                      handleToggleReading={handleToggleReading}
                      isReading={isReading}
                      handleToggleRead={handleToggleRead}
                      isRead={isRead}
                    />
                  </div>
                </div>
              </div>

              <Link
                href="https://google.com"
                target={"_blank"}
                className="flex items-center justify-center"
              >
                <button className=" py-10 hover:underline text-lg text-blue-400 font-semibold hover:text-green-500">
                  See Preview on Google Books
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;
