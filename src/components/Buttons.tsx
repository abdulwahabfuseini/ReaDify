import Image from "next/image";

const Buttons = ({
  handleToggleFavorite,
  isFavorite,
  handleToggleReading,
  isReading,
  handleToggleRead,
  isRead,
}: any) => {
  
  
  return (
    <div className="flex items-center flex-wrap gap-2 my-2">
      <button
        onClick={handleToggleFavorite}
        className={`${
          isFavorite ? "red-background font-semibold text-white" : ""
        } flex items-center gap-1 p-2 rounded-lg hover:ring-2  border-2`}
      >
        <Image
          src="/images/heart.png"
          alt="logo"
          width={18}
          height={18}
          priority
          quality={100}
          className=" object-contain"
          loading="eager"
        />
        <span className="text-sm">Favorite</span>
      </button>
      <button
        onClick={handleToggleReading}
        className={`${
          isReading ? "black-background font-semibold text-white" : ""
        } flex items-center gap-1 p-2 rounded-lg hover:ring-2  border-2`}
      >
        <Image
          src="/images/open-book.png"
          alt="logo"
          width={18}
          height={18}
          priority
          quality={100}
          className=" object-contain"
          loading="eager"
        />
        <span className="text-sm">Reading Now</span>
      </button>
      <button
        onClick={handleToggleRead}
        className={`${
          isRead ? "green-background font-semibold text-white" : ""
        } flex items-center gap-1 p-2 rounded-lg hover:ring-2  border-2`}
      >
        <Image
          src="/images/check.png"
          alt="logo"
          width={18}
          height={18}
          priority
          quality={100}
          className=" object-contain"
          loading="eager"
        />
        <span className="text-sm">Have read</span>
      </button>
    </div>
  );
};

export default Buttons;
