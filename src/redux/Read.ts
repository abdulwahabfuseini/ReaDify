import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

interface ReadType {
  id: number;
  title: string;
  imageLinks: string;
  quantity: number;
}

interface ReadState {
  books: ReadType[];
}

const initialState: ReadState = {
  books: loadReadFromLocalStorage(),
};

const ReadBook = createSlice({
  name: "read",
  initialState,
  reducers: {
    // =====  Add To Favorite ===== 
    addToFavorite: (state, action: PayloadAction<ReadType>) => {
      const newBook = action.payload;
      const existingBook = state.books.find(book => book.id === newBook.id);

      if (existingBook) {
        existingBook.quantity
      } else {
        state.books.push({
          ...newBook,
          quantity: 1,
        });
      }
      saveReadToLocalStorage(state.books);
    },

    // ====  Delete Favorite ==== 
    deleteFavorite: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      saveReadToLocalStorage(state.books);
    },

    // ==== Clear Favorite ==== 
    clearFavorites: (state) => {
      state.books = [];
      saveReadToLocalStorage(state.books);
    },
  },
});

// ==== Load Read From LocalStorage ==== 
function loadReadFromLocalStorage(): ReadType[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const storedRead = localStorage.getItem("read");
  return storedRead ? JSON.parse(storedRead) : [];
}

// ===== Save Read To LocalStorage ==== 
function saveReadToLocalStorage(read: ReadType[]) {
  localStorage.setItem("read", JSON.stringify(read));
}

export const ReadActions = ReadBook.actions;

export const selectReadBook = (state: RootState) => state.read.books;

export default ReadBook.reducer;
