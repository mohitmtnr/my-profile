import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAsyncData } from "../async-fetch/fetchDataForAll";

export const projectAsyncThunk = createAsyncThunk(
  "fetch/projects",
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

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    insertProjects: (state) => {
      state.value -= 1;
    },
    updateProjects: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(projectAsyncThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { fetchProjects, insertProjects, updateProjects, deleteProjects } =
  projectsSlice.actions;

export default projectsSlice.reducer;
