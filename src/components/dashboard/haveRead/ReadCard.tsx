"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Button, Popconfirm } from "antd";
import { useSession } from "next-auth/react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ReadBooksActions, selectReadBooks } from "@/redux/ReadBooks";
import { FaBookOpen, FaRegHeart } from "react-icons/fa";


const ReadCard = () => {
  const HaveRead = useSelector(selectReadBooks);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  const ClearBooks = () => {
    dispatch(ReadBooksActions.clearRead());
    toast.success("Read Cart Cleared Successfully");
  };

  const cancel = () => {
    toast.error("You Clicked on No");
  };

  return (
    <div className="w-full">
      <div>
        {HaveRead.length === 0 ? (
          <div className="max-w-lg mx-auto grid place-items-center py-20 gap-y-4">
            <h1 className=" text-center  text-xl font-semibold  ">
              Your Read Cart is Empty! Return to the home page, Search for a
              book and added it to your read
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
            <div className="flex items-center justify-between flex-wrap gap-3 z-20">
              <h1 className="text-2xl font-semibold pb-4">
               Have Read Book(s)
              </h1>
              <Popconfirm
                title="Clear Your Reading Now Cart"
                description={`${session?.user?.name}, Are you sure want to clear your Reading?`}
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
                  className="h-10 mb-2 text-lg border-2 rounded-lg bg-red-600"
                >
                  Clear Cart
                </Button>
              </Popconfirm>
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2 flex-wrap justify-center sm:justify-start items-center  w-full my-6 mb-20">
              {HaveRead.map((read) => (
                <div key={read.id}>
                  <Image
                    src={`/images/${read?.imageLinks  || "/images/pdf.png"}`}
                    width={190}
                    height={250}
                    alt="cover"
                    quality={100}
                    loading="lazy"
                    objectFit="contain"
                  />
                 
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadCard;
