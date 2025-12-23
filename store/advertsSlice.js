import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAdverts: [],
  favoriteAdverts: [],
};

const advertsSlice = createSlice({
  name: "adverts",
  initialState,
  reducers: {
    setAdverts: (state, action) => {
      state.allAdverts = action.payload;
    },
    setFavorites: (state, action) => {
      state.favoriteAdverts = action.payload;
    },
    toggleFavorite: (state, action) => {
      const { advert, isFavorite } = action.payload;
      if (isFavorite) {
        state.favoriteAdverts.push(advert);
      } else {
        state.favoriteAdverts = state.favoriteAdverts.filter(
          (favoriteAdvert) => favoriteAdvert.id !== advert.id
        );
      }
    },
  },
});

export const { setAdverts, setFavorites, toggleFavorite } =
  advertsSlice.actions;
export default advertsSlice.reducer;
