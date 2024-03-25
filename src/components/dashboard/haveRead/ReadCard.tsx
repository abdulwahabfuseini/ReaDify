"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  FavoriteBooksActions,
  selectFavoriteBooks,
} from "@/redux/FavoriteBooks";
import Image from "next/image";
import { FaInfo } from "react-icons/fa";
import { ReadingBooksActions, selectReadingBooks } from "@/redux/ReadingBooks";
import { BookType } from "@/contexts/Types";
import BookDetails from "../BookDetails";
import { Modal, Popover } from "antd";
import { ReadBooksActions, selectReadBooks } from "@/redux/ReadBooks";

const ReadCard = ({
  id,
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
  const [popUp, setPopUp] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  const handleOpenDetails = () => {
    setOpenModal(true);
    setPopUp(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setPopUp(newOpen);
  };

  const dispatch = useDispatch();

  const DeleteBook = () => {
    dispatch(ReadBooksActions.deleteRead(id));
    toast.success("Book Deleted from Have Read");
  };

  const favoriteBooks = useSelector(selectFavoriteBooks);
  const isFavorite = favoriteBooks.some((favorite) => favorite.id === id);

  const read = useSelector(selectReadBooks);
  const isRead = read.some((read) => read.id === id);

  const readingNow = useSelector(selectReadingBooks);
  const isReading = readingNow.some((reading) => reading.id === id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(FavoriteBooksActions.deleteFavorite(id));
      toast.success("Book Removed from Favorite");
    } else {
      dispatch(
        FavoriteBooksActions.addToFavorite({
          id,
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
          quantity: 0,
        })
      );
      toast.success("Book Added to Reading Now");
    }
  };
  return (
    <div className="grid gap-2">
      <div className="w-full h-44 relative">
        {isLoading ? (
          <div className="image-placeholder sm:w-36"></div>
        ) : (
          <div className=" sm:w-36 h-44 relative">
            {imageLinks && imageLinks.thumbnail && (
              <Image
                src={imageLinks.thumbnail || "/images/pdf.png"}
                alt={title || ""}
                fill
                quality={100}
                loading="lazy"
                objectFit="contain"
              />
            )}
          </div>
        )}

        <div className="absolute top-2 right-8 gap-2">
          <Popover
            content={
              <div className="grid pt-2">
                <button
                  className="flex items-center gap-3 hover:bg-gray-200 text-base font-semibold border-b p-2"
                  onClick={handleOpenDetails}
                >
                  <Image
                    src="/images/info.png"
                    alt="logo"
                    width={24}
                    height={24}
                    priority
                    quality={100}
                    className=" object-contain"
                    loading="eager"
                  />
                  <span>Book Details</span>
                </button>
                <button
                  className="flex items-center gap-3 hover:bg-gray-200 text-base font-semibold border-b p-2"
                  onClick={handleToggleFavorite}
                >
                  <Image
                    src="/images/heart.png"
                    alt="logo"
                    width={24}
                    height={24}
                    priority
                    quality={100}
                    className=" object-contain"
                    loading="eager"
                  />
                  <span>Favorite</span>
                </button>
                <button
                  className="flex items-center gap-3 hover:bg-gray-200 text-base font-semibold border-b p-2"
                  onClick={handleToggleReading}
                >
                  <Image
                    src="/images/open-book.png"
                    alt="logo"
                    width={24}
                    height={24}
                    priority
                    quality={100}
                    className=" object-contain"
                    loading="eager"
                  />
                  <span>Reading Now</span>
                </button>
                <button
                  className="flex items-center gap-3 hover:bg-gray-200 text-base font-semibold p-2"
                  onClick={DeleteBook}
                >
                  <Image
                    src="/images/bin.png"
                    alt="logo"
                    width={24}
                    height={24}
                    priority
                    quality={100}
                    className=" object-contain"
                    loading="eager"
                  />
                  <span>Delete</span>
                </button>
              </div>
            }
            title="BOOK INFORMATION"
            trigger="click"
            open={popUp}
            onOpenChange={handleOpenChange}
          >
            <button className="bg-white text-base shadow-xl p-1.5 rounded-full">
              <FaInfo />
            </button>
          </Popover>
          {openModal && (
            <Modal
              open={openModal}
              width={900}
              onOk={() => setOpenModal(false)}
              onCancel={() => setOpenModal(false)}
              footer={[]}
            >
              <BookDetails
                volumeInfo={{
                  title,
                  subtitle,
                  authors,
                  categories,
                  pageCount,
                  publishedDate,
                  description,
                  previewLink,
                  imageLinks,
                }}
                id={""}
              />
            </Modal>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="title-placeholder w-40"></div>
      ) : (
        <h1 className="font-semibold text-center w-40 text-sm">{title}</h1>
      )}
    </div>
  );
};

export default ReadCard;
