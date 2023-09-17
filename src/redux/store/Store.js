// import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import AboutMeReducer from "../reducers/AboutMeReducer";
import ExpertiesReducer from "../reducers/ExpertiesReducer";
import ProjectsReducer from "../slice-usage/ProjectsSlice";
import { combineReducers } from "@reduxjs/toolkit";

// import logger from "redux-logger";
// import thunk from "redux-thunk";

const rootReducer = combineReducers({
  aboutMe: AboutMeReducer,
  experties: ExpertiesReducer,
  projects: ProjectsReducer,
});

// const Store = createStore(AboutMeReducer, {}, applyMiddleware(thunk, logger));
const Store = configureStore({
  reducer: rootReducer,
});
export default Store;
