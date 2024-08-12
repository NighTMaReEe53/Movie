import { configureStore } from "@reduxjs/toolkit";
import Movie_Slice from "../SLICES/Movie_Slice";

export const STORE = configureStore({
  reducer: {
    Movie: Movie_Slice,
  },
});
