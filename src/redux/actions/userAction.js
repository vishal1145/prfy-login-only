import {
  loading,
  login,
  error,
  clearErrors,
  message,
  loadUserLoading,
  setIsAuthenticated,
  setIsFreshInstall,
} from "../features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { nativeConfirm } from "../../utils/utils";
import { getAllGroupedQueries } from "../features/querySlice";
import {
  getAllCategories,
  getAllUserCategories,
} from "../features/categorySlice";
import { showErrorMsg } from "../../utils";

// export const baseUrl =
// Platform.OS === "web" ? "http://3.95.190.57:3000" : "https://api.prfy.app";
export const baseUrl = "https://api.prfy.app";

// export const clientsBaseUrl = "https://prfy.herokuapp.com";
export const clientsBaseUrl = "https://ai.prfy.app";

export const getHeaders = async (type) => {
  const token = await AsyncStorage.getItem("access_token");
  return {
    headers: {
      "Content-Type": type,
      accesstoken: token,
      // cookie: `access_token=${token}`,
      // withCredentials: true,
    },
  };
};

// will send a verification code to check authencity.
export const sendOtp = async (userData, onSuccess) => {
  const config = await getHeaders("application/json");
  const res = await axios.post(`${baseUrl}/send-otp`, userData, config);
  if (res.data.success) {
    onSuccess && onSuccess();
  }
};

export const socialLoginAction =
  (credentials, onSuccess) => async (dispatch) => {
    try {
      // dispatch(loading(true));

      const { data } = await axios.post(`${baseUrl}/social-login`, {
        ...credentials,
      });
      await AsyncStorage.setItem("access_token", data.accesstoken);

      // dispatch(loading(false));
      let justSignedUp=false
      let verifiedUser = data.userInfo;
      if (!(data.success && data.userInfo.categories.length > 0)) {
        verifiedUser.justSignedUp = true;
        justSignedUp=true
      }

      await dispatch(login({ user: verifiedUser, emailSignature: {} }));

     await dispatch(setIsAuthenticated(true));
      onSuccess && onSuccess(justSignedUp);
    } catch (err) {
      console.log(err);
    }
  };

// Login
export const loginAction =
  (credentials, onSuccess, onUnverifiedMail) => async (dispatch) => {
    try {
      dispatch(loading(true));
      const config = await getHeaders("application/json");
      const { data } = await axios.post(
        `${baseUrl}/login`,
        credentials,
        config
      );

      delete data.password;
      await AsyncStorage.setItem("access_token", data.accesstoken);
      await dispatch(loadUser());

      dispatch(loading(false));

      if (data.success) {
        onSuccess && onSuccess();
      }
    } catch (err) {
      //console.log(err);
      if (err.response?.data?.msg === "Please verify email first") {
        dispatch(
          login({ user: { emailId: credentials.email }, emailSignature: {} })
        );
        sendOtp(credentials, onUnverifiedMail);
      } else {
        dispatch(error(showErrorMsg(err)));
      }

      dispatch(loading(false));

      // dispatch({ type: LOGIN_FAIL, payload: err.response?.data?.msg });
    }
  };

// Register
export const registerAction = (userData, onSuccess) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");
    const { data } = await axios.post(`${baseUrl}/register`, userData, config);
    delete data.user.password;
    dispatch(login({ user: data.user, emailSignature: {} }));
    sendOtp(userData, onSuccess);
    dispatch(loading(false));
  } catch (err) {
    //console.log(err);
    dispatch(loading(false));
    dispatch(error(showErrorMsg(err)));
  }
};

// Forgot Password
export const forgotPasswordAction = (email, onSuccess) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");

    const { data } = await axios.post(
      `${baseUrl}/forget-password`,
      { email },
      config
    );
    if (data.success) {
      onSuccess && onSuccess();
    }
    dispatch(login({ user: { email }, emailSignature: {} }));
    dispatch(loading(false));
  } catch (err) {
    //console.log(err);
    dispatch(loading(false));

    //  dispatch(error(showErrorMsg(err)));
    nativeConfirm("Error", err.response?.data?.msg);
  }
};

export const validateCodeAction =
  (Data, user, onSuccess) => async (dispatch) => {
    try {
      dispatch(loading(true));
      const config = await getHeaders("application/json");

      const { data } = await axios.post(`${baseUrl}/verify-otp`, Data, config);
      if (data.success) {
        await AsyncStorage.setItem("access_token", data.accesstoken);
        let verifiedUser = { ...user };
        verifiedUser.justSignedUp = true;
        onSuccess && onSuccess();
        await dispatch(login({ user: verifiedUser, emailSignature: {} }));
        dispatch(setIsAuthenticated(true));
      }
      dispatch(loading(false));
    } catch (err) {
      //console.log(err);
      dispatch(loading(false));

      dispatch(error(showErrorMsg(err)));
    }
  };

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserLoading(true));
    const config = await getHeaders("application/json");
  
    const { data } = await axios.get(`${baseUrl}/protected`, config);
    delete data?.userEmailSignature?.__v;
    const userInfo = {
      user: data?.userInfo,
      emailSignature: data?.userEmailSignature,
    };
    dispatch(login(userInfo));
    dispatch(setIsAuthenticated(true));
    dispatch(loadUserLoading(false));
    return userInfo;
  } catch (err) {
    //console.log(err?.message);
    dispatch(loadUserLoading(false));
    dispatch(setIsAuthenticated(false));
    // if(err?.message){
    //   dispatch(error(err.message));
    // }
    // dispatch(error(showErrorMsg(err)));
  }
};

// Logout User
export const logoutAction = () => async (dispatch) => {
  const clearState = async () => {
    dispatch(login({ user: null, emailSignature: null }));
    dispatch(getAllGroupedQueries({ queries: [], clear: true, totalPage: 0 }));
    dispatch(getAllCategories([]));
    dispatch(getAllUserCategories([]));
    await AsyncStorage.removeItem("access_token");
    dispatch(setIsAuthenticated(false));
  };
  const config = await getHeaders("application/json");
  try {
    dispatch(loading(true));
    await axios.get(`${baseUrl}/logout`, config);
    clearState();

    dispatch(loading(false));
  } catch (err) {
    clearState();
    //console.log(err);
    dispatch(loading(false));
    // dispatch(error(showErrorMsg(err)));
  }
};

// Update Profile
export const updateProfileAction =
  (userData, onSuccess) => async (dispatch) => {
    try {
      dispatch(loading(true));
      const config = await getHeaders("multipart/form-data");
      const { data } = await axios.post(
        `${baseUrl}/update-user`,
        userData,
        config
      );
      dispatch(login({ user: data.updatedUser, emailSignature: {} }));
      dispatch(message("Profile Updated Successfully."));
      onSuccess && onSuccess();
      dispatch(loading(false));
    } catch (err) {
      //console.log(err);
      // if(err?.message){
      //   dispatch(error(err.message));
      // }
      dispatch(loading(false));
      dispatch(message(showErrorMsg(err)));
    }
  };

// Update Password
export const updatePasswordAction = (Data, onSuccess) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");
    await axios.post(`${baseUrl}/update-password`, Data, config);
    onSuccess && onSuccess();
    dispatch(loadUser());
    dispatch(loading(false));
  } catch (err) {
    dispatch(error(showErrorMsg(err)));
    // if(err?.message){
    //   dispatch(error(err.message));
    // }
    dispatch(loading(false));
  }
};

export const updateEmailSignatureAction =
  (Data, onSuccess) => async (dispatch) => {
    try {
      dispatch(loading(true));
      const config = await getHeaders("application/json");
      let endpoint = "insertSignature";
      if (Data.hasEmailSignature) endpoint = "updateSignature";
      const { data } = await axios.post(`${baseUrl}/${endpoint}`, Data, config);
      dispatch(loadUser());
      dispatch(message(data.msg));

      onSuccess && onSuccess();

      dispatch(loading(false));
    } catch (err) {
      dispatch(message(showErrorMsg(err)));
      // if(err?.message){
      //   dispatch(error(err.message));
      // }
      dispatch(loading(false));
    }
  };

export const getIsFreshInstall = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const freshInstall = await AsyncStorage.getItem("freshInstall");
    dispatch(setIsFreshInstall(freshInstall === "false" ? false : true));
    dispatch(loading(false));
  } catch (err) {
    dispatch(loading(false));
  }
};

// // Reset Password
// export const resetPassword = (token, passwords) => async (dispatch) => {
//   try {
//     dispatch({ type: RESET_PASSWORD_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `/api/v1/password/reset/${token}`,
//       passwords,
//       config
//     );

//     dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
//   } catch (err) {
//     dispatch({
//       type: RESET_PASSWORD_FAIL,
//       payload: err.response?.data?.msg,
//     });
//   }
// };

// // get All Users
// export const getAllUsers = () => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_USERS_REQUEST });
//     const { data } = await axios.get(`/api/v1/admin/users`);

//     dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
//   } catch (err) {
//     dispatch({ type: ALL_USERS_FAIL, payload: err.response?.data?.msg });
//   }
// };

// // get  User Details
// export const getUserDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_DETAILS_REQUEST });
//     const { data } = await axios.get(`/api/v1/admin/user/${id}`);

//     dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
//   } catch (err) {
//     dispatch({ type: USER_DETAILS_FAIL, payload: err.response?.data?.msg });
//   }
// };

// // Update User
// export const updateUser = (id, userData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_USER_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `/api/v1/admin/user/${id}`,
//       userData,
//       config
//     );

//     dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
//   } catch (err) {
//     dispatch({
//       type: UPDATE_USER_FAIL,
//       payload: err.response?.data?.msg,
//     });
//   }
// };

// // Delete User
// export const deleteUser = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_USER_REQUEST });

//     const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

//     dispatch({ type: DELETE_USER_SUCCESS, payload: data });
//   } catch (err) {
//     dispatch({
//       type: DELETE_USER_FAIL,
//       payload: err.response?.data?.msg,
//     });
//   }
// };

// Clearing errors
export const clearErrorsAction = () => async (dispatch) => {
  dispatch(clearErrors());
};

export const clearMessageAction = () => async (dispatch) => {
  dispatch(message(null));
};
