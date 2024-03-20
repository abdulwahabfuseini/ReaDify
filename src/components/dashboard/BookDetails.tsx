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
  publishedDate,
  description,
  previewLink,
}: BookType) => {
  const splitIntoParagraphs = (text: string): string[] => {
    const maxLength = 300; // Maximum characters per paragraph
    const paragraphs: string[] = [];
    let currentParagraph = "";

    // Split text into paragraphs
    text.split(" ").forEach((word) => {
      if ((currentParagraph + word).length > maxLength) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = "";
      }
      currentParagraph += word + " ";
    });

    // Add the last paragraph
    if (currentParagraph.trim() !== "") {
      paragraphs.push(currentParagraph.trim());
    }

    return paragraphs;
  };
  const descriptionParagraphs = description
    ? splitIntoParagraphs(description)
    : [];
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-y-8 gap-x-4 lg:place-items-center">
        <div className="w-full h-72 sm:col-span-1 sm:h-[500px] relative order-2 sm:order-1">
          <Image
            src={`/images/${imageLinks}`}
            // width={160}
            // height={160}
            fill
            alt="cover"
            quality={100}
            loading="lazy"
            className=" object-contain sm:object-cover"
          />
        </div>
        <div className="w-full sm:col-span-2 order-1 sm:order-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h4 className=" text-lg">{subtitle}</h4>
          <div className=" font-bold text-sm py-1 text-blue-500">
            <h1>Author(s): {authors}</h1>
            <p>Published-Date: {publishedDate}</p>
          </div>
          <div className="py-1 flex items-center gap-6 flex-wrap">
            <h4 className="text-sm font-semibold">
              Categories: <span className="text-gray-500">{categories}</span>{" "}
            </h4>
          </div>

          <Typography.Paragraph
            className="text-base"
            ellipsis={{
              rows: 10,
            }}
          >
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Typography.Paragraph>
        </div>
      </div>
      <Link
        href="https://google.com"
        target={"_blank"}
        className="flex items-center justify-center"
      >
        <button className=" pt-4 hover:underline text-lg text-blue-400 font-semibold hover:text-green-500">
          See Preview on Google Books
        </button>
      </Link>
    </div>
  );
};

export default BookDetails;
