"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const UserProvider = () => {
  return (
    <div className="grid gap-y-3 w-full ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl  font-bold">
          REA<span className="text-yellow-400">DIFY</span>
        </h1>
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
      </div>
      <div className="flex items-center justify-center md:mt-16">
        <Image
          src="/images/book1.gif"
          unoptimized
          width={150}
          height={150}
          alt="logo"
          className=" object-contain my-8 sm:my-6"
        />
      </div>

      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-5 justify-center w-full bg-red-300 text-white px-4 py-2 border text-lg font-semibold rounded-lg"
      >
        <Image
          src="/images/googlesvg.png"
          alt="google"
          width={30}
          height={30}
          className="object-contain"
        />
        <h1>Continue with Google</h1>
      </button>
      <button
        onClick={() => signIn("github")}
        className="flex items-center justify-center bg-black text-white bg-opacity-80 gap-5 px-4 py-2 border  text-lg font-semibold rounded-lg"
      >
        <Image
          src="/images/githubw.png"
          alt="github"
          width={30}
          height={30}
          className="object-contain"
        />
        <h1>Continue with Github</h1>
      </button>
    </div>
  );
};

export default UserProvider;
