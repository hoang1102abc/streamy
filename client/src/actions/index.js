import streamsData from "../apis/streamsData";
import history from "../history";

export const signedIn = userId => {
  return {
    type: "SIGNED_IN",
    payload: userId
  };
};

export const signedOut = () => {
  return {
    type: "SIGNED_OUT"
  };
};

export const fetchStreams = () => async dispatch => {
  const response = await streamsData.get("streams.json");

  dispatch({ type: "FETCH_STREAMS", payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streamsData.get(`streams/${id}.json`);

  dispatch({ type: "FETCH_STREAM", payload: { [id]: response.data } });
};

export const editStream = (id, formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streamsData.patch(`streams/${id}.json`, formValues);

  dispatch({
    type: "EDIT_STREAM",
    payload: { [id]: { ...response.data, userId: userId } }
  });

  history.push("/");
};

export const deleteStream = id => async dispatch => {
  await streamsData.delete(`streams/${id}.json`);

  dispatch({ type: "DELETE_STREAM", payload: id });

  history.push("/");
};
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const newStream = { ...formValues, userId: userId };
  const response = await streamsData.post("streams.json", newStream);

  dispatch({
    type: "CREATE_STREAM",
    payload: { [response.data.name]: newStream }
  });

  history.push("/");
};
