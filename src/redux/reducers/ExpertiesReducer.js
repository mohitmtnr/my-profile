import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { fetchAsyncData } from "../async-fetch/fetchDataForAll";
import { updateItems, insertItems } from "../action-creator/ExpertiesActions";

export const fetchAsyncExperties = createAsyncThunk(
  "fetch/experties",
  async (tableName) => {
    const response = await fetchAsyncData(tableName);
    return response;
  }
);

const initialState = {
  loading: true,
  error: null,
  data: [],
};

const ExpertiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(insertItems, (state, actions) => {})
    .addCase(updateItems, (state, actions) => {})
    .addCase(fetchAsyncExperties.fulfilled, (state, actions) => {
      state.loading = false;
      state.error = null;
      state.data = actions.payload;
    });
});

export default ExpertiesReducer;
