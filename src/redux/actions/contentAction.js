import axios from "axios";
import { showErrorMsg } from "../../utils";
import { contents, loading, message } from "../features/contentSlice";

import { getHeaders } from "./userAction";
const baseUrl = process.env.REACT_APP_ENDPOINT_URL || "http://3.95.190.57:3000";

export const getContentURL = (credentials, onSuccess) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");
    const { data } = await axios.get(`${baseUrl}/tnC-PP`, credentials, config);
    dispatch(contents(data.tnCAndPP));
    dispatch(loading(false));
    onSuccess && onSuccess();
  } catch (err) {
    dispatch(loading(false));
    dispatch(message(showErrorMsg(err)));
  }
};
