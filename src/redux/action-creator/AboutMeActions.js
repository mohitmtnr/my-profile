import { fetchAsyncData } from "../async-fetch/fetchDataForAll";
import RemoveElements from "../../developer/cards/RemoveElements";

export const getItems = "GET_ABOUTME";
export const putItems = "POST_ABOUTME";
export const updateItems = "UPDATE_ABOUTME";
export const deleteItems = "DELETE_ABOUTME";

export const GetItems = (tableName) => {
  return async (dispatch) => {
    const response = await fetchAsyncData(tableName);
    dispatch({ type: getItems, payload: response });
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
