import Image from "next/image";
import React from "react";
import SearchBox from "./SearchBox";

const Banner = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-64  md:h-96 relative">
        <Image
          src="/images/banner2.jpg"
          alt="logo"
          fill
          quality={100}
          priority
          loading="eager"
          className="w-full object-cover"
        />
        <div className="top-0 left-0 right-0 bg-black absolute w-full h-64  md:h-96 bg-opacity-50  text-center py-6 px-4">
          <div className="grid place-content-center place-items-center w-full h-full">
            <h1 className="max-w-sm sm:max-w-xl mx-auto text-white text-2xl font-bold sm:text-4xl md:max-w-2xl uppercase left-10">
              Search for your Favorite book on{" "}
              <span className="text-yellow-500">Rea<span className="text-white">dify</span></span>
            </h1>
          
          </div>
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default Banner;
