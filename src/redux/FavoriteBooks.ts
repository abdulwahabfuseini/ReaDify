import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { BookType } from "@/contexts/Types";

interface FavoriteBookState {
  books: BookType[];
}

const initialState: FavoriteBookState = {
  books: loadFavoriteBooksFromLocalStorage(),
};

const FavoriteBooks = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    // =====  Add To Favorite =====
    addToFavorite: (state, action: PayloadAction<BookType>) => {
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
      saveFavoriteBooksToLocalStorage(state.books);
    },

    // ====  Delete Favorite ====
    deleteFavorite: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      saveFavoriteBooksToLocalStorage(state.books);
    },

    // ==== Clear Favorite ====
    clearFavorite: (state) => {
      state.books = [];
      saveFavoriteBooksToLocalStorage(state.books);
    },
  },
});

// ==== Load Favorite From LocalStorage ====
function loadFavoriteBooksFromLocalStorage(): BookType[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedFavoriteBooks = localStorage.getItem("favorite");
  return storedFavoriteBooks ? JSON.parse(storedFavoriteBooks) : [];
}

// ===== Save Favorite To LocalStorage ====
function saveFavoriteBooksToLocalStorage(favorite: BookType[]) {
  localStorage.setItem("favorite", JSON.stringify(favorite));
}

export const FavoriteBooksActions = FavoriteBooks.actions;

export const selectFavoriteBooks = (state: RootState) => state.favorite.books;

export default FavoriteBooks.reducer;
