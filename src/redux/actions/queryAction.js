// import { Alert } from "react-native-web";
import axios from "axios";
import { showErrorMsg } from "../../utils";
import {
  getAllGroupedQueries,
  getAllSuggestions,
  getAllKeywords,
  loading,
  userKeywords,
  getFilteredQueries,
  setMessage,
  setAfterPitch,
  getMailPreview,
} from "../features/querySlice";
import {} from "../features/querySlice";
import { baseUrl, clientsBaseUrl, getHeaders } from "./userAction";

export const getAllGroupedQueriesAction =
  (pageNo = 1, onSuccess, clear = false) =>
  async (dispatch) => {
    try {
      dispatch(loading(true));
      const config = await getHeaders("application/json");
      const { data } = await axios.get(
        `${baseUrl}/getMailExtracts?pageNo=${pageNo}&pageLength=20`,
        config
      );
      const { totalPage, items } = data;
      //console.log(pageNo, data);
      await dispatch(
        getAllGroupedQueries({ queries: items, totalPage, clear })
      );
      if (data.success) {
        onSuccess && onSuccess(pageNo);
      }
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
      // dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
export const getAllSuggestionsAction =
  (query, onSuccess) => async (dispatch) => {
    try {
      dispatch(loading(true));
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`${clientsBaseUrl}`, query, config);
   
      let sugg = data.map((item) => {
        let i = 0;
        return {
          query: item.summaries.replace(/\n/g, ""),
          summary: item.headlines.replace(/\n/g, ""),
          editorQuery: item.summaries.replace(/\n/g, (match) => {
            return i++ === 0 ? "" : "<br/>";
          }),
        };
      });

      dispatch(getAllSuggestions({ suggestions: sugg, id: query._id }));
      if (data.success) {
        onSuccess && onSuccess();
      }
      dispatch(loading(false));
      return sugg;
    } catch (error) {
      dispatch(loading(false));
      // dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
export const getAllKeywordsAction = (onSuccess) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");
    const { data } = await axios.get(
      `${baseUrl}/userKeywordMatchesMail`,
      config
    );
    dispatch(getAllKeywords(data.mailExtracts));
    if (data.success) {
      onSuccess && onSuccess();
    }
    dispatch(loading(false));
  } catch (error) {
    dispatch(loading(false));
    // dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
export const getAllUserKeywordAction = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");
    const { data } = await axios.get(`${baseUrl}/getKeywordsByUserId`, config);
    dispatch(userKeywords(data.userKeywords));
    dispatch(getAllKeywordsAction());

    let sugg = data.map((item) => {
      let i = 0;
      return {
        query: item.summaries.replace(/\n/g, ""),
        summary: item.headlines.replace(/\n/g, ""),
        editorQuery: item.summaries.replace(/\n/g, (match) => {
          return i++ === 0 ? "" : "<br/>";
        }),
      };
    });

    dispatch(getAllSuggestions(sugg));
    if (data.success) {
      onSuccess && onSuccess();
    }
    dispatch(loading(false));
  } catch (error) {
    dispatch(loading(false));
  }
};
export const setKeywordAction = (keyword, onSuccess) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");
    const { data } = await axios.post(`${baseUrl}/addKeyword`, keyword, config);
    dispatch(getAllUserKeywordAction());
    if (data.success) {
      onSuccess && onSuccess();
    }
    dispatch(setMessage(data.msg));
    dispatch(loading(false));
  } catch (error) {
    dispatch(loading(false));
  }
};
export const deleteKeywordAction = (id, onSuccess) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");
    const { data } = await axios.get(
      `${baseUrl}/deleteKeyword?id=${id}`,
      config
    );
    dispatch(getAllUserKeywordAction());
    dispatch(getAllKeywordsAction());
    if (data.success) {
      onSuccess && onSuccess();
    }
    dispatch(setMessage(data.msg));
    dispatch(loading(false));
  } catch (error) {
    dispatch(loading(false));
  }
};
export const sendPitchAction = (pitch, onSuccess) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");
    const { data } = await axios.post(`${baseUrl}/pitch`, pitch, config);

    //console.log(pitch);
    
    if (data.success) {
      onSuccess && onSuccess();
    }

    // dispatch(setMessage(data.msg))
    dispatch(loading(false));
  } catch (error) {
    dispatch(loading(false));
    dispatch(setMessage(showErrorMsg(error)));
  }
};
export const getFilteredQueriesAction =
  (category, onSuccess) => async (dispatch) => {
    try {
      dispatch(loading(true));
      const config = await getHeaders("application/json");
      const { data } = await axios.post(
        `${baseUrl}/mailDataOnUserCategory`,
        { userCategoryIds: category },
        config
      );
      dispatch(getFilteredQueries({queries:data.data,filteredIds:category}));
      if (data.success) {
        onSuccess && onSuccess();
      }
      dispatch(setMessage(data.msg));
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
    }
  };

export const deleteQueryAction = (id, onSuccess) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const config = await getHeaders("application/json");
    const { data } = await axios.get(`${baseUrl}/deleteQuery?id=${id}`, config);

    if (data.success) {
      onSuccess && onSuccess();
      dispatch(
        getAllGroupedQueriesAction(
          1,
          () => {
            setPageNumber(1)
            
          },
          true
        )
      );
    }
    dispatch(setMessage(data.msg))
    dispatch(loading(false));
  } catch (error) {
    dispatch(loading(false));
  }
};

export const setAfterPitchAction = (name) => async (dispatch) => {
  dispatch(setAfterPitch({ name: name }));
};

export const getMailPreviewAction = (body, onSuccess) => async (dispatch) => {
  try {
    debugger;
    const config = await getHeaders("application/json");
    const { data } = await axios.post(
      `${baseUrl}/emailSignaturePreview`,
      body,
      config
    );
    
    
    
    dispatch(getMailPreview(data))
    if (data.success) {
      onSuccess && onSuccess();
    }

    
  } catch (err) {
    dispatch(loading(false));
  }
};

export const clearQueryMessageAction = ()=>async (dispatch)=>{
  dispatch(setMessage(null))
}
