"use client";

import React, { useEffect, useState } from "react";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Favorite from "./favorite/Favorite";
import HaveRead from "./haveRead/HaveRead";
import ReadingNow from "./readingNow/ReadingNow";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import Login from "@/app/(routes)/login/page";
import { useSelector } from "react-redux";
import { selectFavoriteBooks } from "@/redux/FavoriteBooks";
import { selectReadingBooks } from "@/redux/ReadingBooks";
import { selectReadBooks } from "@/redux/ReadBooks";


const DashBoard = () => {
  const [toggle, setToggle] = useState(false);
  const [filter, setFilter] = useState("favorite");
  const [content, setContent] = useState(Favorite);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const FavoriteBooks = useSelector(selectFavoriteBooks);
  const ReadingBooks = useSelector(selectReadingBooks);
  const ReadBooks = useSelector(selectReadBooks);

  useEffect(() => {
    if (filter == "favorite") {
      setContent(Favorite);
    }
    if (filter == "have Read") {
      setContent(HaveRead);
    }
    if (filter == "reading Now") {
      setContent(ReadingNow);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [filter]);

  return (
    <>
      {!session?.user ? (
        <div className="cursor-pointer flex ">
          {/* ==== Tablet & Large Screens ====  */}
          <aside
            className={`${
              toggle ? "w-16  " : "w-80"
            }    relative h-screen hidden lg:block  shadow-lg shadow-blue-500/40`}
          >
            <button
              onClick={() => setToggle((prev) => !prev)}
              className="top-14 -right-4  absolute bg-gray-200 rounded-full p-2"
            >
              {toggle ? (
                <FaChevronRight className="w-4 h-4" />
              ) : (
                <FaChevronLeft FaChevronRight className="w-4 h-4" />
              )}
            </button>
            <button className="flex items-center text-sm font-bold gap-3 lg:gap-4 mt-6 w-full px-4 overflow-hidden">
              <Image
                src={session?.user?.image || ""}
                alt="logo"
                width={32}
                height={32}
                priority
                quality={100}
                className=" object-contain rounded-full"
                loading="eager"
              />
              <span
                className={`${toggle ? "hidden" : "block"} truncate uppercase`}
              >
                {session?.user?.name}
              </span>
            </button>
            <div className="grid pt-12 pb-24 ">
              <button
                onClick={() => {
                  setFilter("favorite");
                  setToggle(false);
                }}
                className={`${
                  filter === "favorite" ? "activeBtn" : ""
                } border-t py-3 px-4 flex items-center text-lg gap-3 lg:gap-4 `}
              >
                <Image
                  src="/images/heart.png"
                  alt="logo"
                  width={30}
                  height={30}
                  priority
                  quality={100}
                  className=" object-contain"
                  loading="eager"
                />
                <span className={`${toggle ? "hidden" : "block"}`}>
                  Favorite <span>({FavoriteBooks.length})</span>
                </span>
              </button>
              <button
                onClick={() => {
                  setFilter("reading Now");
                  setToggle(false);
                }}
                className={`${
                  filter === "reading Now" ? "activeBtn" : ""
                } border-t py-3 px-4 flex items-center text-lg gap-3 lg:gap-4 w-full overflow-hidden`}
              >
                <Image
                  src="/images/open-book.png"
                  alt="logo"
                  width={30}
                  height={30}
                  priority
                  quality={100}
                  className=" object-contain"
                  loading="eager"
                />
                <span className={`${toggle ? "hidden" : "block"} truncate`}>
                  Reading Now <span>({ReadingBooks.length})</span>
                </span>
              </button>
              <button
                onClick={() => {
                  setFilter("have Read");
                  setToggle(false);
                }}
                className={`${
                  filter === "have Read" ? "activeBtn" : ""
                } border-t border-b py-3  flex items-center text-lg gap-3 lg:gap-4 px-4 w-full overflow-hidden`}
              >
                <Image
                  src="/images/check.png"
                  alt="logo"
                  width={30}
                  height={30}
                  priority
                  quality={100}
                  className=" object-contain"
                  loading="eager"
                />
                <span className={`${toggle ? "hidden" : "block"} truncate`}>
                  Have Read <span>({ReadBooks.length})</span>
                </span>
              </button>
              <button
                className=" my-20  w-full py-3  hover:bg-gray-200 flex items-center text-lg gap-3 lg:gap-4 px-4"
                onClick={() => {
                  signOut();
                  router.push("/");
                  setToggle(false);
                }}
              >
                <Image
                  src="/images/logout.png"
                  alt="logo"
                  width={30}
                  height={30}
                  priority
                  quality={100}
                  className=" object-contain"
                  loading="eager"
                />
                <span className={`${toggle ? "hidden" : "block"} `}>
                  Logout
                </span>
              </button>
            </div>
          </aside>

          <main
            className={`${
              toggle ? "left-16" : "left-80"
            }  shadow-inner h-screen overflow-y-auto py-8 sm:py-8 sm:px-6 px-3 w-full`}
          >
            <div className=" lg:hidden">
              <button onClick={() => setToggle(true)}>
                <FaBars className="w-8 h-8 mb-4" />
              </button>
              {/* ===== Mobile Screen Sidebar ====  */}
              {toggle && (
                <aside className="bg-black w-full h-screen top-16 left-0 fixed bg-opacity-60 z-50">
                  <div className="bg-white relative py-6  w-72 sm:w-80 h-screen shadow-xl overflow-auto">
                    <button
                      onClick={() => setToggle(false)}
                      className="top-3 right-4 z-50 cursor-pointer absolute"
                    >
                      <AiOutlineClose className=" w-6 h-6 rounded-full" />
                    </button>
                    <button className="flex items-center text-sm font-bold gap-3 lg:gap-4 mt-6 w-full px-4 overflow-hidden">
                      <Image
                        src={session?.user?.image || ""}
                        alt="logo"
                        width={32}
                        height={32}
                        priority
                        quality={100}
                        className=" object-contain rounded-full"
                        loading="eager"
                      />
                      <span className="truncate uppercase">
                        {session?.user?.name}
                      </span>
                    </button>
                    <div className="grid pt-12 pb-24 ">
                      <button
                        onClick={() => {
                          setFilter("favorite");
                          setToggle(false);
                        }}
                        className={`${
                          filter === "favorite" ? "activeBtn" : ""
                        } border-t py-3 px-4 flex items-center text-lg gap-3 lg:gap-4 `}
                      >
                        <Image
                          src="/images/heart.png"
                          alt="logo"
                          width={30}
                          height={30}
                          priority
                          quality={100}
                          className=" object-contain"
                          loading="eager"
                        />
                        <span>
                          Favorite <span>({FavoriteBooks.length})</span>{" "}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setFilter("reading Now");
                          setToggle(false);
                        }}
                        className={`${
                          filter === "reading Now" ? "activeBtn" : ""
                        } border-t py-3 px-4 flex items-center text-lg gap-3 lg:gap-4`}
                      >
                        <Image
                          src="/images/open-book.png"
                          alt="logo"
                          width={30}
                          height={30}
                          priority
                          quality={100}
                          className=" object-contain"
                          loading="eager"
                        />
                        <span>
                          Reading Now <span>({ReadingBooks.length})</span>
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setFilter("have Read");
                          setToggle(false);
                        }}
                        className={`${
                          filter === "have Read" ? "activeBtn" : ""
                        } border-t border-b py-3  flex items-center text-lg gap-3 lg:gap-4 px-4`}
                      >
                        <Image
                          src="/images/check.png"
                          alt="logo"
                          width={30}
                          height={30}
                          priority
                          quality={100}
                          className=" object-contain"
                          loading="eager"
                        />
                        <span>
                          Have Read <span>({ReadBooks.length})</span>
                        </span>
                      </button>
                      <button
                        className=" my-20  w-full py-3  hover:bg-gray-200 flex items-center text-lg gap-3 lg:gap-4 px-4"
                        onClick={() => {
                          signOut();
                          router.push("/");
                          setToggle(false);
                        }}
                      >
                        <Image
                          src="/images/logout.png"
                          alt="logo"
                          width={30}
                          height={30}
                          priority
                          quality={100}
                          className=" object-contain"
                          loading="eager"
                        />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </aside>
              )}
            </div>
            <div>
              {loading ? (
                <h1 className="text-2xl font-semibold">Please Wait...</h1>
              ) : (
                <div>{content}</div>
              )}
            </div>
          </main>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default DashBoard;
