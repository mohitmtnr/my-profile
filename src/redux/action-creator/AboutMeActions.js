import { fetchAsyncData } from "../async fetch/fetchDataForAll";

export const getItems = "GET_ABOUTME";
export const putItems = "POST_ABOUTME";
export const updateItems = "UPDATE_ABOUTME";
export const deleteItems = "DELETE_ABOUTME";

export const GetItems = (tableName) => {
  return async (dispatch, getState) => {
    const response = await fetchAsyncData(tableName);
    dispatch({ type: getItems, payload: response });
  };
};

export const DeleteItems = (id) => {
  return (dispatch) => {
    dispatch({ type: deleteItems, payload: id });
  };
};

export const UpdateItems = (name) => {
  return (dispatch) => {
    dispatch({ type: updateItems, payload: name });
  };
};

export const PutItems = (name) => {
  return (dispatch) => {
    dispatch({ type: putItems, payload: name });
  };
};
