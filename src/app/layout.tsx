import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/contexts/Providers";
import ToastContext from "@/contexts/ToastContext";
import Loading from "./loading";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Readify | Search",
  description: "Search For your Favorite Book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full text-black overflow-x-hidden">
        <Loading>
          <Providers>
            <ToastContext />
            {children}
            <ChatBot show={false} />
          </Providers>
        </Loading>
      </body>
    </html>
  );
}
