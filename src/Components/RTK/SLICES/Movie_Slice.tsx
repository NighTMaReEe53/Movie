import { createSlice } from "@reduxjs/toolkit";

const MOVIE_SLICE = createSlice({
  name: "MOVIESLICE",
  initialState: [],
  reducers: {
    ADD_MOVIE: (
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
      window.localStorage.setItem("pageMovie", JSON.stringify(state));
    },
  },
});

export const { ADD_MOVIE } = MOVIE_SLICE.actions;

export default MOVIE_SLICE.reducer;
