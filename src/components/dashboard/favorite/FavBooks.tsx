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
import { BookType } from "@/contexts/Types";

const FavBooks = () => {
  const favoriteBooks = useSelector(selectFavoriteBooks)
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  const clearBooks = () => {
    dispatch(FavoriteBooksActions.clearFavorite());
    toast.success("Favorite List Cleared Successfully");
  };

  const cancel = () => {
    toast.error("You Clicked on No");
  };

  return (
    <div className="w-full">
      <div>
        {favoriteBooks.length === 0 ? (
          <div className="max-w-lg mx-auto grid place-items-center py-20 gap-y-4">
            <h1 className=" text-center  text-xl font-semibold  ">
              Your Favorite List is Empty! click on Reading Now, Have Read on
              the sidebar to add a book or return to the home page, Search for a
              book and added it to your Favorite List
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
                title="Clear Your Favorite List"
                description={`${session?.user?.name}, Are you sure want to clear your Favorite List?`}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "white",
                    }}
                  />
                }
                onConfirm={clearBooks}
                onCancel={cancel}
                color="volcano"
                className="text-white"
                okText="Confirm"
                cancelText="Cancel"
              >
                <Button
                  danger
                  type="primary"
                  className="h-10 font-semibold mb-2 text-lg border-2 rounded-lg bg-red-600"
                >
                  Clear List
                </Button>
              </Popconfirm>
            </div>
            <div className="grid grid-cols-2 place-items-center sm:flex gap-y-4 flex-wrap justify-center sm:justify-start items-center  w-full my-6 mb-20">
              {favoriteBooks.map((favorite) => (
                <FavoriteCard
                  key={favorite?.id}
                  id={favorite?.id}
                  volumeInfo={favorite?.volumeInfo}
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
