import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAsyncData } from "../async fetch/fetchDataForAll";

export const projectAsyncThunk = createAsyncThunk(
  "fetch/projects",
  async (tableName) => {
    console.log("I am inside thunk");
    const response = await fetchAsyncData(tableName);
    console.log(response);
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
    fetchProjects: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //   state.loading = false;
      //   state.error = null;
      //   state.data = action.payload;
    },
    insertProjects: (state) => {
      state.value -= 1;
    },
    updateProjects: (state, action) => {
      state.value += action.payload;
    },
    deleteProjects: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(projectAsyncThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { fetchProjects, insertProjects, updateProjects, deleteProjects } =
  projectsSlice.actions;

export default projectsSlice.reducer;
