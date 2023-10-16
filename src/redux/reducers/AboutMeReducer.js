import {
  getItems,
  putItems,
  updateItems,
} from "../action-creator/AboutMeActions";

const AboutmeReducer = (
  state = { loading: true, error: null, data: [] },
  action
) => {
  switch (action.type) {
    case getItems:
      if (action.payload) {
        return { loading: false, error: null, data: action.payload };
      }
    case putItems:
      return {};
    case updateItems:
      return {};
    default:
      return { loading: false, error: "error", data: null };
  }
};

export default AboutmeReducer;
