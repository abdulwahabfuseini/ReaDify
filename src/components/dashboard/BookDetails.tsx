import { BookType } from "@/contexts/Types";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
interface Data {
  description: string;
}
const BookDetails = ({
  title,
  imageLinks,
  subtitle,
  authors,
  categories,
  pageCount,
  publishedDate,
  description,
  previewLink,
}: BookType) => {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-y-8 gap-x-4 lg:place-items-center  pt-6 sm:pt-2">
        <div className="w-full h-72 sm:col-span-1 sm:h-[500px] relative order-2 sm:order-1">
          <Image
            src={`/images/${imageLinks || "pdf.png"}`}
            objectFit="contain"
            fill
            alt="cover"
            quality={100}
            loading="lazy"
          />
        </div>
        <div className="w-full sm:col-span-2 order-1 sm:order-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h4 className=" text-lg">{subtitle}</h4>
          <div className=" font-bold text-sm py-1 text-blue-500">
            <h1>Author(s): {authors?.toLocaleString()}</h1>
            <p>Published-Date: {publishedDate}</p>
          </div>
          <div className="pt-1 flex items-center gap-6 flex-wrap">
            <h4 className="text-sm font-semibold">
              Categories: <span className="text-gray-500">{categories}</span>{" "}
            </h4>
            <h4 className="text-sm font-semibold">
              Page Counts: <span className="text-gray-500">{pageCount}</span>{" "}
            </h4>
          </div>

          <Typography.Paragraph
            className="text-base"
            ellipsis={{
              rows: 10,
            }}
          >
            {description &&
              description
                .split(". ")
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </Typography.Paragraph>
        </div>
      </div>
      <Link
        href="https://google.com"
        target={"_blank"}
        className="flex items-center justify-center"
      >
        <button className=" pt-2 hover:underline text-lg text-blue-400 font-semibold hover:text-green-500">
          See Preview on Google Books
        </button>
      </Link>
    </div>
  );
};

export default BookDetails;
