"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FavoriteBooksActions } from "@/redux/FavoriteBooks";
import Image from "next/image";
import { FaBookOpen, FaInfo, FaTrashAlt } from "react-icons/fa";
import { ReadingBooksActions, selectReadingBooks } from "@/redux/ReadingBooks";
import { BookType } from "@/contexts/Types";
import BookDetails from "../BookDetails";
import { Modal } from "antd";

const FavoriteCard = ({
  id,
  title,
  imageLinks,
  authors,
  subtitle,
  categories,
  publishedDate,
  description,
  previewLink,
}: BookType) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenDetails = () => {
    setOpenModal(true);
  };
  const dispatch = useDispatch();

  const DeleteBooks = () => {
    dispatch(FavoriteBooksActions.deleteFavorite(id));
    toast.success("Book Deleted from Favorite");
  };

  const readingNow = useSelector(selectReadingBooks);
  const isReading = readingNow.some((reading) => reading.id === id);

  const handleToggleReading = () => {
    if (isReading) {
      dispatch(ReadingBooksActions.deleteReading(id));
      toast.success("Book Removed from Reading Now");
    } else {
      dispatch(
        ReadingBooksActions.addToReading({
          id,
          title,
          imageLinks,
          subtitle,
          authors,
          categories,
          description,
          publishedDate,
          previewLink,
          quantity: 0,
        })
      );
      toast.success("Book Added to Reading Now");
    }
  };

  return (
    <div>
      <div className=" border-2 sm:w-40 h-44 relative">
        <Image
          src={`/images/${imageLinks || "/images/pdf.png"}`}
          fill
          alt="cover"
          quality={100}
          loading="lazy"
          className=" object-cover w-full"
        />

        <div className="absolute top-1 left-0 flex items-center gap-1.5">
          <button className="bg-gray-300 p-1.5 rounded-full" onClick={handleOpenDetails}>
            <FaInfo />
           
          </button>
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
                  description={description}
                  publishedDate={publishedDate}
                  previewLink={previewLink}
                />
              </Modal>
            )}
          <button className="bg-gray-300 p-1.5 rounded-full" onClick={handleToggleReading}>
            <FaBookOpen />
          </button>
          <button className="bg-gray-300 p-1.5 rounded-full" onClick={DeleteBooks}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
