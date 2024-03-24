"use client";

import Image from "next/image";
import { TbChevronLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";
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
import { ReadBooksActions, selectReadBooks } from "@/redux/ReadBooks";

import { BookType } from "@/contexts/Types";

const getSingleBook = async (id: string): Promise<BookType | null> => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${id}&key=AIzaSyBaLAcQXx9x97vh638_dNnDg_agsBSESDI`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    if (data.items && data.items.length > 0) {
      return data.items[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to get book:", error);
    return null;
  }
};

const BookInfo = ({ params }: any) => {
  const id = decodeURIComponent(params.id);
  const [book, setBook] = useState<BookType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getSingleBook(id);
      console.log("🚀 ~ fetchBook ~ data:", data);
      setBook(data);
      setLoading(false);
    };

    fetchBook();
  }, [id]);

  const router = useRouter();
  const dispatch = useDispatch();

  const favoriteBooks = useSelector(selectFavoriteBooks);
  const isFavorite = favoriteBooks.some((favorite) => favorite.id === id);

  const readingNow = useSelector(selectReadingBooks);
  const isReading = readingNow.some((reading) => reading.id === id);

  const read = useSelector(selectReadBooks);
  const isRead = read.some((read) => read.id === id);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, [loading]);

  if (loading) {
    return <div className="max-w-7xl mx-auto py-32 text-xl font-semibold">Please Wait...</div>;
  }

  if (!book) {
    return <div className="p-16">Failed to get book</div>;
  }

  const {
    volumeInfo: {
      title,
      subtitle,
      authors,
      publishedDate,
      description,
      categories,
      pageCount,
      previewLink,
      imageLinks,
    },
  } = book;

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(FavoriteBooksActions.deleteFavorite(id));
      toast.error("Book Removed from Favorite");
    } else {
      dispatch(
        FavoriteBooksActions.addToFavorite({
          id,
          volumeInfo: {
            title,
            subtitle,
            authors,
            publishedDate,
            categories,
            pageCount,
            imageLinks,
            description,
            previewLink,
          },
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
      if (isRead) {
        dispatch(ReadBooksActions.deleteRead(id));
        toast.error("Book Removed from Read");
      }
      dispatch(
        ReadingBooksActions.addToReading({
          id,
          volumeInfo: {
            title,
            subtitle,
            authors,
            publishedDate,
            categories,
            pageCount,
            imageLinks,
            description,
            previewLink,
          },
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
          volumeInfo: {
            title,
            subtitle,
            authors,
            publishedDate,
            categories,
            pageCount,
            imageLinks,
            description,
            previewLink,
          },
          quantity: 0,
        })
      );
      toast.success("Book Added to Read");
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid max-w-6xl px-3 py-10 mx-auto md:py-20 lg:py-8 sm:px-6 place-items-start gap-y-5 mb-20">
        <button
          onClick={() => router.push("/")}
          type="button"
          className=" p-1 font-semibold text-center bg-gray-200  mx-1 rounded-full"
        >
          <TbChevronLeft className="w-8 h-8" />
        </button>
        <div className="py-6">
          <div className="grid sm:grid-cols-3 gap-y-8 gap-x-4 lg:gap-x-10 lg:place-items-center">
            <div className="w-full h-72 sm:col-span-1 sm:h-[500px] relative order-2 sm:order-1">
              {imageLinks?.thumbnail && (
                <Image
                  src={imageLinks.thumbnail}
                  alt={title || ""}
                  layout="fill"
                  quality={100}
                  className=" object-contain s"
                  loading="lazy"
                />
              )}
            </div>
            <div className="w-full sm:col-span-2 order-1 sm:order-2">
              <h1 className="text-2xl font-bold">{title}</h1>
              <div className="font-bold text-sm py-1 text-blue-500">
                <h1>Author(s): {authors?.join(", ")}</h1>
                <p>Published-Date: {publishedDate}</p>
              </div>
              <div className="py-1 flex items-center gap-6 flex-wrap">
                <h4 className="text-sm font-semibold">
                  Categories:{" "}
                  <span className="text-gray-500">
                    {categories?.join(", ")}
                  </span>
                </h4>
                <h4 className="text-sm font-semibold">
                  Page Count: <span className="text-gray-500">{pageCount}</span>
                </h4>

                <Typography.Paragraph
                  className="text-base"
                  ellipsis={{ rows: 10 }}
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
        </div>
      </div>
    </>
  );
};

export default BookInfo;
