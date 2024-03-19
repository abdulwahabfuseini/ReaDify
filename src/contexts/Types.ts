export interface BookType {
  id: number;
  title: string;
  imageLinks: string;
  quantity: number;
}

export type BookProps = {
  id: number;
  title: string;
  subtitle?: string;
  imageLinks: string;
  authors?: string[];
  publishedDate?: string;
  categories?: string[];
  pageCount?: number;
  description: string;
  previewLink?: string;
};

export type BooksCardProps = {
  id: number;
  title: string;
  cover: string;
  desc: string;
};

export type FadeIn = {
  hidden: {
    x: number;
    y: number;
    opacity: number;
  };
  show: {
    x: number;
    y: number;
    opacity: number;
    transition: {
      type: string;
      delay: number;
      duration: number;
      ease: number[];
    };
  };
};
