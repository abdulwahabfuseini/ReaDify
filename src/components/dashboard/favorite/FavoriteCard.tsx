"use client";

import React, { useState } from "react";
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

const FavoriteCard = ({
  id,
  title,
  imageLinks,
  authors,
  subtitle,
  categories,
  pageCount,
  publishedDate,
  description,
  previewLink,
}: BookType) => {
  const [popUp, setPopUp] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenDetails = () => {
    setOpenModal(true);
    setPopUp(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setPopUp(newOpen);
  };

  const dispatch = useDispatch();

  const DeleteBook = () => {
    dispatch(FavoriteBooksActions.deleteFavorite(id));
    toast.success("Book Deleted from Favorite");
  };



  const read = useSelector(selectReadBooks);
  const isRead = read.some((read) => read.id === id);

  const readingNow = useSelector(selectReadingBooks);
  const isReading = readingNow.some((reading) => reading.id === id);

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

  return (
    <div className="grid gap-2">
      <div className="w-full h-44 relative">
        <Image
          src={`/images/${imageLinks || "pdf.png"}`}
          fill
          alt="cover"
          quality={100}
          loading="lazy"
          className=" object-contain w-full"
        />

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
                  className="flex items-center gap-3 hover:bg-gray-200 text-base font-semibold border-b p-2"
                  onClick={handleToggleRead}
                >
                  <Image
                    src="/images/check.png"
                    alt="logo"
                    width={24}
                    height={24}
                    priority
                    quality={100}
                    className=" object-contain"
                    loading="eager"
                  />
                  <span>Have Read</span>
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
            <button className="bg-white shadow-xl p-1.5 rounded-full">
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
                id={id}
                title={title}
                imageLinks={imageLinks}
                subtitle={subtitle}
                authors={authors}
                categories={categories}
                pageCount={pageCount}
                description={description}
                publishedDate={publishedDate}
                previewLink={previewLink}
              />
            </Modal>
          )}
        </div>
      </div>
      <h1 className="w-40 text-center  text-sm font-semibold">{title}</h1>
    </div>
  );
};

export default FavoriteCard;
