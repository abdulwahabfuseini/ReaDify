"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  FavoriteBooksActions,
  selectFavoriteBooks,
} from "@/redux/FavoriteBooks";
import { Button, Popconfirm } from "antd";
import { useSession } from "next-auth/react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import FavoriteCard from "./FavoriteCard";

const FavBooks = () => {
  const FavoriteBooks = useSelector(selectFavoriteBooks);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  const ClearBooks = () => {
    dispatch(FavoriteBooksActions.clearFavorite());
    toast.success("Favorite Cart Cleared Successfully");
  };

  const cancel = () => {
    toast.error("You Clicked on No");
  };

  return (
    <div className="w-full">
      <div>
        {FavoriteBooks.length === 0 ? (
          <div className="max-w-lg mx-auto grid place-items-center py-20 gap-y-4">
            <h1 className=" text-center  text-xl font-semibold  ">
              Your Favorite Cart is Empty! return to the home page, Search for a
              book and added it to your favorite
            </h1>
            <Button
              type="primary"
              onClick={() => router.push("/")}
              className="bg-green-600 font-semibold text-lg h-11"
            >
              Return Home
            </Button>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h1 className="text-2xl font-semibold pb-4">Favorite Book(s)</h1>
              <Popconfirm
                title="Clear Your Favorite Cart"
                description={`${session?.user?.name}, Are you sure want to clear your Favorite?`}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
                onConfirm={ClearBooks}
                onCancel={cancel}
                color="#F1E6E6"
                okText="Confirm"
                cancelText="Cancel"
              >
                <Button
                  danger
                  type="primary"
                  className="h-10 font-semibold mb-2 text-lg border-2 rounded-lg bg-red-600"
                >
                  Clear Cart
                </Button>
              </Popconfirm>
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2 flex-wrap justify-center sm:justify-start items-center  w-full my-6 mb-20">
              {FavoriteBooks.map((favorite) => (
                <FavoriteCard
                  key={favorite?.id}
                  id={favorite?.id}
                  title={favorite?.title}
                  subtitle={favorite?.subtitle}
                  imageLinks={favorite?.imageLinks}
                  authors={favorite?.authors}
                  categories={favorite?.categories}
                  description={favorite?.description}
                  publishedDate={favorite?.publishedDate}
                  previewLink={favorite?.previewLink}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavBooks;
