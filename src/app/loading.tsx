"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Loading = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
         <Image
            src="/images/book1.gif"
            alt="logo"
            width={90}
            height={90}
            quality={100}
            priority
            loading="eager"
          unoptimized
          className=" object-contain"
          />
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default Loading;
