export const showErrorMsg = (err) => {
  let errMsg = err.response?.data?.msg;
  if (!errMsg) errMsg = err.message;
  return errMsg;
};

