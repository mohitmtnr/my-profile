import {
  getItems,
  putItems,
  updateItems,
  deleteItems,
} from "../action-creator/AboutMeActions";

const AboutmeReducer = (
  state = { loading: true, error: null, data: [] },
  action
) => {
  switch (action.type) {
    case getItems:
      if (action.payload) {
        state.data ? console.log(state.data) : console.log("loading");
        return { loading: false, error: null, data: action.payload };
      }
    case putItems:
      return {};
    case updateItems:
      return {};
    case deleteItems:
      let newArray = [];
      if (state.data) {
        let i;
        for (i = 0; i < state.data.length; i++) {
          if (action.payload !== state.data[i].id) newArray.push(state.data[i]);
        }
      }
      console.log(newArray);
      return { loading: false, error: null, data: newArray };
    default:
      return { loading: false, error: "error", data: null };
  }
};

export default AboutmeReducer;
