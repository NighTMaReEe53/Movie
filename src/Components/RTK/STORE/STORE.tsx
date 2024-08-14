import { configureStore } from "@reduxjs/toolkit";
import Movie_Slice from "../SLICES/Movie_Slice";
import Sidebar_Slice from "../SLICES/Sidebar_Slice";
import Favourite_Slice from "../SLICES/Favourite_Slice";

export const STORE = configureStore({
  reducer: {
    Movie: Movie_Slice,
    sidebar: Sidebar_Slice,
    favourite: Favourite_Slice,
  },
});
