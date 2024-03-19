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
import { FavoriteBooksActions, selectFavoriteBooks } from "@/redux/FavoriteBooks";
import toast from "react-hot-toast";
import { ReadingBooksActions, selectReadingBooks } from "@/redux/ReadingBooks";
import Link from "next/link";

const Book = ({ params }: any) => {
  const title = decodeURIComponent(params.id);
  const book = BookData.find(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  const { id, imageLinks, authors, publishedDate, description, subtitle } =
    book as {
      id: number;
      title: string;
      subtitle: string;
      publishedDate: string;
      authors: string[];
      imageLinks: string;
      description: string;
    };

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const favoriteBooks = useSelector(selectFavoriteBooks);
  const isFavorite = favoriteBooks.some((favorite) => favorite.id === id);

  const readingNow = useSelector(selectReadingBooks);
  const isReading = readingNow.some((reading) => reading.id === id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(FavoriteBooksActions.deleteFavorite(id));
      toast.success("Book Removed to Favorite");
    } else {
      dispatch(
        FavoriteBooksActions.addToFavorite({
          imageLinks,
          id,
          title,
          quantity: 0,
        })
      );
      toast.success("Book Added to Favorite");
    }
  };

  const handleToggleReading = () => {
    if (isReading) {
      dispatch(ReadingBooksActions.deleteReading(id));
      toast.success("Book Removed to Reading Now");
    } else {
      dispatch(
        ReadingBooksActions.addToReading({
          imageLinks,
          id,
          title,
          quantity: 0,
        })
      );
      toast.success("Book Added to Reading Now");
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
      <div className="grid max-w-6xl px-3 py-8 mx-auto md:py-14 sm:px-6 place-items-start gap-y-5">
        <button
          onClick={() => router.push("/")}
          type="button"
          className=" p-1 font-semibold text-center bg-gray-200  mx-1 light-background rounded-full"
        >
          <TbChevronLeft className="w-8 h-8" />
        </button>
        <div className="py-8">
          {loading ? (
            <h1 className="text-xl font-bold">Please Wait...</h1>
          ) : (
            <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-8  gap-x-10 place-items-center">
              <div className="w-80 h-72 sm:col-span-1 sm:h-96 relative">
                <Image
                  src={`/images/${imageLinks}`}
                  // width={160}
                  // height={160}
                  fill
                  alt="cover"
                  quality={100}
                  loading="lazy"
                  objectFit="contain"
                />
              </div>
              <div className="w-full sm:col-span-1 lg:col-span-2">
                <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
                <h4 className="font-semibold text-lg">{subtitle}</h4>
                <div className=" font-bold text-sm py-1">
                  <h1>
                    author(s):{" "}
                    <span className="text-slate-500">
                      {authors.toLocaleString()}
                    </span>
                  </h1>
                  <p>
                    Published-Date:{" "}
                    <span className="text-slate-400">{publishedDate}</span>{" "}
                  </p>
                </div>
                <Typography.Paragraph
                  // className="text-sm"
                  ellipsis={{
                    rows: 8,
                    expandable: true,
                    symbol: "Read Book",
                  }}
                >
                  {description}
                </Typography.Paragraph>
                <div>
                  <Buttons
                    handleToggleFavorite={handleToggleFavorite}
                    isFavorite={isFavorite}
                    handleToggleReading={handleToggleReading}
                    isReading={isReading}
                  />
                </div>
              </div>
            </div>
              <Link href="https://google.com" target={"_blank"}>
                <button className="flex items-center justify-center py-6 hover:underline text-lg text-blue-400 w-full font-semibold hover:text-green-500">See Preview on Google Books</button>
              </Link>
            </div>

          )}
        </div>
      </div>
    </>
  );
};

export default Book;
