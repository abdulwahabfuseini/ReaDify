

// export type BookType = {
//   id: number;
//   title?: string;
//   subtitle?: string;
//   imageLinks?: string;
//   authors?: string[];
//   publishedDate?: string;
//   categories?: string[];
//   pageCount?: number;
//   description?: string;
//   previewLink?: string;
//   quantity?: number;
// }

export interface BookType {
  id: string;
  volumeInfo: {
    title?: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    categories?: string[];
    pageCount?: number;
    imageLinks?: {
      thumbnail: string;
    };
    description?: string;
    previewLink?: string;
  };
  quantity?: number;
}




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
