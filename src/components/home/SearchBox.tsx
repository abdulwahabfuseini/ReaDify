"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Books from "./searchResults/Books";
import { BookType } from "@/contexts/Types";

const PAGE_SIZE = 12;

const SearchBox = () => {
  const [sticky, setSticky] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<BookType[]>([]);
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBaLAcQXx9x97vh638_dNnDg_agsBSESDI`
      );
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      return window.scrollY > 250 ? setSticky(true) : setSticky(false);
    });
  }, []);

  // const [currentPage, setCurrentPage] = useState(1);

  // const totalPages = Math.ceil(setSearchResults.length / PAGE_SIZE);
  // const currentPageData = setSearchResults.slice(
  //   (currentPage - 1) * PAGE_SIZE,
  //   currentPage * PAGE_SIZE
  // );

  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

  // const goToPreviousPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

  // const goToNextPage = () => {
  //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  // };


  return (
    <div>
      <div
        className={`${
          sticky
            ? "fixed top-16 lg:top-3 shadow-blue-500/20 bg-white shadow-lg lg:shadow-none left-0 right-0 lg:bg-transparent p-3 lg:p-0 lg:left-[20vw] lg:right-[20vw] z-50  sm:mx-0 sm:flex justify-center"
            : "absolute left-0 right-0 w-full px-3 sm:px-6 -bottom-6"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className={`${
            sticky ? "shadow-none" : "shadow-xl"
          } flex sm:mx-auto sm:bg-white  backdrop:none sm:w-[79vw] border-2 border-yellow-400 lg:w-[50vw]`}
        >
          <input
            type="search"
            placeholder="What are you looking for?"
            value={search}
            onChange={handleInputChange}
            className="w-full px-2 sm:px-4 text-lg outline-none col-span-2 py-2.5 text-black rounded-none"
          />
          <button
            type="submit"
            className="px-3 py-2.5 bg-yellow-400  lg:px-8 font-semibold col-span-1 text-xl"
          >
            <FaSearch className="sm:hidden text-white" />
            <span className="hidden sm:block text-white font-semibold"> Search</span>
          </button>
        </form>
      </div>
      <div className="max-w-7xl  mx-auto my-28 sm:px-5">
        <div >
          {searchResults.length > 0 ? (
            <div>
              <h1 className=" font-semibold text-left text-lg sm:text-xl">
                Search Results for {search}
              </h1>
              <div className="grid grid-cols-2 sm:grid-auto-fit-xs gap-2 pt-6">
                {searchResults.map((book) => (
                  <Books key={book.id} searchResult={book} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xl text-left font-semibold">Search For a book</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
