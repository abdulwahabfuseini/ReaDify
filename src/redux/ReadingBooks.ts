import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

interface ReadingBookType {
  id: number;
  title: string;
  imageLinks: string;
  quantity: number;
}

interface ReadingBookState {
  books: ReadingBookType[];
}

const initialState: ReadingBookState = {
  books: loadReadingBooksFromLocalStorage(),
};

const ReadingBooks = createSlice({
  name: "reading",
  initialState,
  reducers: {
    // =====  Add To Reading =====
    addToReading: (state, action: PayloadAction<ReadingBookType>) => {
      const newBook = action.payload;
      const existingBook = state.books.find((book) => book.id === newBook.id);

      if (existingBook) {
        existingBook.quantity;
      } else {
        state.books.push({
          ...newBook,
          quantity: 1,
        });
      }
      saveReadingBooksToLocalStorage(state.books);
    },

    // ====  Delete Reading ====
    deleteReading: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      saveReadingBooksToLocalStorage(state.books);
    },

    // ==== Clear Reading ====
    clearReading: (state) => {
      state.books = [];
      saveReadingBooksToLocalStorage(state.books);
    },
  },
});

// ==== Load Reading From LocalStorage ====
function loadReadingBooksFromLocalStorage(): ReadingBookType[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedReadingBooks = localStorage.getItem("reading");
  return storedReadingBooks ? JSON.parse(storedReadingBooks) : [];
}

// ===== Save Reading To LocalStorage ====
function saveReadingBooksToLocalStorage(reading: ReadingBookType[]) {
  localStorage.setItem("reading", JSON.stringify(reading));
}

export const ReadingBooksActions = ReadingBooks.actions;

export const selectReadingBooks = (state: RootState) => state.reading.books;

export default ReadingBooks.reducer;
