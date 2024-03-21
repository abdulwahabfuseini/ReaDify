"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Popconfirm } from "antd";
import { useSession } from "next-auth/react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ReadingCard from "./ReadingCard";
import { ReadingBooksActions, selectReadingBooks } from "@/redux/ReadingBooks";

const NowBooks = () => {
  const ReadingBooks = useSelector(selectReadingBooks);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  const ClearBooks = () => {
    dispatch(ReadingBooksActions.clearReading());
    toast.success("Reading Now Cart Cleared Successfully");
  };

  const cancel = () => {
    toast.error("You Clicked on No");
  };

  return (
    <div className="w-full">
      <div>
        {ReadingBooks.length === 0 ? (
          <div className="max-w-lg mx-auto grid place-items-center py-20 gap-y-4">
            <h1 className=" text-center  text-xl font-semibold  ">
              Your Reading Now Cart is Empty! return to the home page, Search for a
              book and added it to your reading
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
              <h1 className="text-2xl font-semibold pb-4">Reading Now Book(s)</h1>
              <Popconfirm
                title="Clear Your Reading Now Cart"
                description={`${session?.user?.name}, Are you sure want to clear your Reading Now?`}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "white",
                    }}
                  />
                }
                onConfirm={ClearBooks}
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
                  Clear Cart
                </Button>
              </Popconfirm>
            </div>
            <div className="grid grid-cols-2 gap-y-4 sm:flex gap-2 flex-wrap justify-center sm:justify-start items-center  w-full my-6 mb-20">
              {ReadingBooks.map((reading) => (
                <ReadingCard
                  key={reading?.id}
                  id={reading?.id}
                  title={reading?.title}
                  subtitle={reading?.subtitle}
                  imageLinks={reading?.imageLinks}
                  authors={reading?.authors}
                  categories={reading?.categories}
                  pageCount={reading?.pageCount}
                  description={reading?.description}
                  publishedDate={reading?.publishedDate}
                  previewLink={reading?.previewLink}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NowBooks;
