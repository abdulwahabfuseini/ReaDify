"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Popconfirm } from "antd";
import { useSession } from "next-auth/react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ReadCard from "./ReadCard";
import { ReadBooksActions, selectReadBooks } from "@/redux/ReadBooks";

const HaveBook = () => {
  const ReadBooks = useSelector(selectReadBooks);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  const ClearBooks = () => {
    dispatch(ReadBooksActions.clearRead());
    toast.success("Read List Cleared Successfully");
  };

  const cancel = () => {
    toast.error("You Clicked on No");
  };

  return (
    <div className="w-full">
      <div>
        {ReadBooks.length === 0 ? (
          <div className="max-w-lg mx-auto grid place-items-center py-20 gap-y-4">
            <h1 className=" text-center  text-xl font-semibold  ">
              Your Have Read List is Empty! Click on Favorite or Reading Now on
              the sidebar, select a book and added it to your Have Read List.
            </h1>
            {/* <Button
              type="primary"
              onClick={() => router.push("/")}
              className="bg-green-600 font-semibold text-lg h-11"
            >
              Return Home
            </Button> */}
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h1 className="text-2xl font-semibold pb-4">Have Read Book(s)</h1>
              <Popconfirm
                title="Clear Your Have Read List"
                description={`${session?.user?.name}, Are you sure want to clear your Have Read List?`}
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
                  Clear List
                </Button>
              </Popconfirm>
            </div>
            <div className="grid grid-cols-2 gap-y-4 sm:flex gap-2 flex-wrap justify-center sm:justify-start items-center  w-full my-6 mb-20">
              {ReadBooks.map((read) => (
                <ReadCard
                  key={read?.id}
                  id={read?.id}
                  volumeInfo={read?.volumeInfo}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HaveBook;
