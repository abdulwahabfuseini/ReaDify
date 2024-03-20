import { configureStore } from "@reduxjs/toolkit";
import FavoriteBooks from "./FavoriteBooks";
import { BookType } from "../contexts/Types";
import ReadingBooks from "./ReadingBooks";
import ReadBooks from "./ReadBooks";

export const store = configureStore({
  reducer: {
    favorite: FavoriteBooks,
    reading: ReadingBooks,
    read: ReadBooks
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveFavoriteBooksToLocalStorage(state.favorite.books);
  saveReadingBooksToLocalStorage(state.reading.books);
  saveReadBooksToLocalStorage(state.read.books);
});

function saveFavoriteBooksToLocalStorage(favorite: BookType[]) {
  localStorage.setItem("favorite", JSON.stringify(favorite));
}

function saveReadingBooksToLocalStorage(reading: BookType[]) {
  localStorage.setItem("reading", JSON.stringify(reading));
}

function saveReadBooksToLocalStorage(read: BookType[]) {
  localStorage.setItem("read", JSON.stringify(read));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
