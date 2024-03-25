"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      return window.scrollY > 40 ? setSticky(true) : setSticky(false);
    });
  });

  return (
    <div
      className={`${
        sticky ? "top-0 left-0 fixed w-full transition-all ease-linear" : ""
      }  sm:px-6 px-4 py-2 z-50 bg-white shadow shadow-blue-500/40`}
    >
      <div className=" max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/">
          {" "}
          <div className="flex items-center sm:gap-1 ">
            <Image
              src="/images/book2.gif"
              alt="logo"
              width={60}
              height={60}
              priority
              quality={100}
              className=" object-contain"
              loading="eager"
              unoptimized
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
              REA<span className="text-yellow-400">DIFY</span>
            </h1>
          </div>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 text-lg font-bold">
          <Link href="/myBooks">My Books</Link>
          {session?.user && (
            <Image
              src={session?.user?.image || ""}
              width={40}
              height={40}
              loading="eager"
              alt="profile"
              className="rounded-full object-contain border"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
