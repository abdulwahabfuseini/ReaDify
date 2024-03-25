import type { Metadata } from "next";
import Banner from "@/components/home/Banner";
import Navbar from "@/components/header/Navbar";

export const metadata: Metadata = {
  title: "Readify | Search",
  description: "Search For Your Favorite Book",
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
    </main>
  );
}
