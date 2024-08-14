import { createSlice } from "@reduxjs/toolkit";

const FAVOURITE_SLICE = createSlice({
  name: "FAVOURITE_SLICE",
  initialState: [],
  reducers: {
    ADD_MOVIE_Favourite: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state: any,
      action: {
        type: string;
        payload: {
          backdrop_path?: string | undefined;
          id?: number | undefined;
          name?: string | undefined;
          title?: string | undefined;
          vote_average?: number | undefined;
        };
      }
    ) => {
      const Find = state.find(
        (el: { id: number }) => el.id === action.payload.id
      );
      if (Find) {
        console.log("DONE");
      } else {
        state.push(action.payload);
      }
      window.localStorage.setItem("pageFavourite", JSON.stringify(state));
    },
  },
});

export const { ADD_MOVIE_Favourite } = FAVOURITE_SLICE.actions;

export default FAVOURITE_SLICE.reducer;
