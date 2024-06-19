
import DashBoard from "@/components/dashboard/DashBoard";
import Navbar from "@/components/header/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readify | My Books",
  description: "Add a book your favorite or read list",
};
const MyBooks = () => {
  return (
    <div className=" overflow-hidden h-screen">
      <Navbar />
      <DashBoard />
    </div>
  );
};

export default MyBooks;
