// import { Alert } from "react-native-web";
import axios from "axios";
import {
  getAllCategories,
  getAllUserCategories,
} from "../features/categorySlice";

import { getHeaders } from "./userAction";
const baseUrl = process.env.REACT_APP_ENDPOINT_URL || "http://3.95.190.57:3000";

// get all categories
export const getAllCategoriesAction = (onSuccess) => async (dispatch) => {
  try {
    const config = await getHeaders("application/json");
    const { data } = await axios.get(`${baseUrl}/getAllCategories`, config);

    dispatch(getAllCategories(data.categories));
    return data.categories;
  } catch (error) {
    // dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// add categories to user
export const addCategoriesToUserAction =
  (categories, onSuccess) => async (dispatch) => {
    try {
      const config = await getHeaders("application/json");
      const { data } = await axios.post(
        `${baseUrl}/updateUserCategories`,
        { categories },
        config
      );
      if (data.success) {
        await dispatch(getAllUserCategoriesAction());
        onSuccess();
      }
    } catch (error) {
      //console.log(error);
    }
  };

// get user categories 
export const getAllUserCategoriesAction = (onSuccess) => async (dispatch) => {
  try {
    const config = await getHeaders("application/json");
    const { data } = await axios.get(`${baseUrl}/categoryOnUserId`, config);

    if (data.success) {
      dispatch(getAllUserCategories(data?.userCategory));
    }
  } catch (error) {
    //console.log(error);
  }
};





