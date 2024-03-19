"use client";

import { FaBookOpen, FaBookReader, FaHeart } from "react-icons/fa";

const Buttons = ({ handleToggleFavorite, isFavorite, handleToggleReading, isReading }: any) => {
  return (
    <div className="flex items-center flex-wrap gap-2 my-2">
      <button
        onClick={handleToggleFavorite}
        className={`${isFavorite ? "bg-green-600 text-white" : ""} flex items-center gap-1 p-1.5 rounded hover:bg-green-500 hover:text-white border-2`}
      >
        <FaHeart />
        <span>Favorite</span>
      </button>
      <button
        onClick={handleToggleReading}
        className={`${isReading ? "bg-red-600 text-white" : ""} flex items-center gap-1 p-1.5 rounded hover:bg-green-500 hover:text-white border-2`}
      >
        <FaBookReader />
        <span>Reading Now</span>
      </button>
      <button className="flex items-center gap-1 p-1.5 rounded hover:bg-green-500 hover:text-white border-2">
        <FaBookOpen />
        <span>Have read</span>
      </button>
    </div>
  );
};

export default Buttons;
