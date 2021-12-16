import axios from 'axios';

const SET_LISTS = 'SET_LISTS'


const TOKEN = 'token';

const setAllLists = (data) => {
  return {
    type: SET_LISTS,
    payload : data
  }
}

export const getAllLists = () => {
  return async(dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const res = await axios.get(`/api/wishlist`, {
          headers: {
            authorization: token
          }
        });
        dispatch(setAllLists(res.data));
      }
    } catch (err) {
      console.error('err in getAllLists', err);
    }
  }
}

export default function(state = {}, action) {
  switch(action.type) {
    case SET_LISTS:
      return action.payload
    default:
      return state;
  }
}
